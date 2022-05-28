package data

import (
	"astrostation.server/internal/validator"
	"context"
	"database/sql"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"time"
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


// NOTE: This is where I stopped streaming last week
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
	SET name = $1, email = $2, password_hash = $3, activated = $4, version = version + 1
	WHERE id = $5 AND version = $6
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
