package data

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"errors"
	"time"

	"astrostation.server/internal/validator"
	"golang.org/x/crypto/bcrypt"
)

type UsersModel struct {
	DB *sql.DB
}

// This will be passed into our User struct
// brcrypt returns the value in a hash
type password struct {
	plaintext *string
	hash      []byte
}

var AnonymousUser = &User{}

func (u *User) IsAnonymous() bool {
	return u == AnonymousUser
}

// NOTE: password needs to be a hashed type from bcrypt
type User struct {
	ID        int64     `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  password  `json:"-"`
	Version   int       `json:"-"`
}

func (p *password) Set(plaintextPassword string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(plaintextPassword), 12)
	if err != nil {
		return err
	}

	p.plaintext = &plaintextPassword
	p.hash = hash

	return nil
}

func (p *password) Matches(plaintextPassword string) (bool, error) {
	err := bcrypt.CompareHashAndPassword(p.hash, []byte(plaintextPassword))
	if err != nil {
		switch {
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return false, nil
		default:
			return false, err
		}
	}

	return true, nil
}

// We need to add some backend validation to password and name, email
func ValidateEmail(v *validator.Validator, email string) {
	v.Check(email != "", "email", "must be provided")
	v.Check(validator.Matches(email, validator.EmailRX), "email", "must be a valid email address")
}

// TODO: Add numerical values as a must
func ValidatePassword(v *validator.Validator, plainPassword string) {
	v.Check(plainPassword != "", "password", "must be provided")
	v.Check(len(plainPassword) >= 8, "password", "must be longer than 8 bytes")
	v.Check(len(plainPassword) <= 64, "password", "must be shorter than 64 bytes")
}

func ValidateName(v *validator.Validator, name string) {
	v.Check(name != "", "name", "must be provided")
	v.Check(len(name) <= 500, "name", "must be shorter than 500 bytes")
}

// This function will validate all our needed criteria for our user
func ValidateUser(v *validator.Validator, user *User) {
	// Validate Email
	ValidateEmail(v, user.Email)

	// Valite Name
	ValidateName(v, user.Name)

	// Validate the password
	if user.Password.plaintext != nil {
		ValidatePassword(v, *user.Password.plaintext)
	}

	// NOTE: this might not be the best way to handle unhashed passwords in backend validation
	if user.Password.hash == nil {
		panic("Password did not hash")
	}
}

/*
RAW QUERIES
This communicate directly with our DB and our internal system
*/

func (u UsersModel) Insert(user *User) error {
	// Create raw query
	query :=
		`
			INSERT into users (name, email, password_hash)
			VALUES ($1, $2, $3)
			RETURNING id, created_at, version
		`

	args := []interface{}{user.Name, user.Email, user.Password.hash}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := u.DB.QueryRowContext(ctx, query, args...).Scan(&user.ID, &user.CreatedAt, &user.Version)
	if err != nil {
		switch {
		case err.Error() == `Duplicate key value violates unique constraing "user_email_key"`:
			return errors.New("duplicate email")
		default:
			return err
		}
	}
	return nil
}

func (u UsersModel) GetUser(email string) (*User, error) {
	query :=
		`
	SELECT id, created_at, name, email, password_hash, version
	FROM users
	WHERE email = $1
	`

	var user User

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := u.DB.QueryRowContext(ctx, query, email).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.Name,
		&user.Email,
		&user.Password.hash,
		&user.Version,
	)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}

	return &user, nil
}

func (u UsersModel) Update(user *User) error {
	query := `
	UPDATE users
	SET name = $1, email = $2, password_hash = $3, version = version + 1
	WHERE id = $4 AND version = $5
	RETURNING version
	`

	args := []interface{}{
		user.Name,
		user.Email,
		user.Password.hash,
		user.ID,
		user.Version,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := u.DB.QueryRowContext(ctx, query, args...).Scan(&user.Version)

	if err != nil {
		switch {
		case err.Error() == `duplicate key value violates unique constraint "users_email_key"`:
			return errors.New("duplicate email")
		case errors.Is(err, sql.ErrNoRows):
			return errors.New("edit Conflict")
		default:
			return err
		}
	}
	return nil
}

// tokenPlaintext is stored in LocalStore OR cookie
func (m UsersModel) GetForToken(tokenScope, tokenPlaintext string) (*User, error) {
	// Calculate the SHA-256 hash of the plaintext token provided by the client.
	// Remember that this returns a byte *array* with length 32, not a slice.
	tokenHash := sha256.Sum256([]byte(tokenPlaintext))
	// Set up the SQL query.
	query := `
	SELECT users.id, users.created_at, users.name, users.email, users.password_hash, users.version
	FROM users
	INNER JOIN tokens
	ON users.id = tokens.user_id
	WHERE tokens.hash = $1
	AND tokens.scope = $2
	AND tokens.expiry > $3`
	// Create a slice containing the query arguments. Notice how we use the [:] operator
	// to get a slice containing the token hash, rather than passing in the array (which
	// is not supported by the pq driver), and that we pass the current time as the
	// value to check against the token expiry.
	args := []interface{}{tokenHash[:], tokenScope, time.Now()}
	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	// Execute the query, scanning the return values into a User struct. If no matching
	// record is found we return an ErrRecordNotFound error.
	err := m.DB.QueryRowContext(ctx, query, args...).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.Name,
		&user.Email,
		&user.Password.hash,
		&user.Version,
	)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}
	// Return the matching user.
	return &user, nil
}

func (m UsersModel) ConfirmToken(tokenScope, tokenPlaintext string) (bool, error) {
	tokenHash := sha256.Sum256([]byte(tokenPlaintext))

	query := `
	SELECT user_id
	FROM tokens 
	WHERE hash = $1
	AND scope = $2
	AND expiry > $3`

	args := []interface{}{tokenHash[:], tokenScope, time.Now()}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var token struct {
		id int64
	}

	err := m.DB.QueryRowContext(ctx, query, args...).Scan(
		&token.id,
	)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return false, ErrRecordNotFound
		default:
			return false, err
		}
	}

	return true, nil
}
