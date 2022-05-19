package data

import (
	"database/sql"
	//"github.com/lib/pq"
	"errors"
	"time"
)

var (
	ErrRecordNotFound = errors.New("record not found")
)

type InfoModel struct {
	DB *sql.DB
}

func (I InfoModel) Insert(info *Info) error {
	// Initiate the query to execute
	query :=
		`
		INSERT INTO info (title, description)
		VALUES ($1, $2)
		RETURNING id, created_at, version
		`

	// pass the in the values to populate the query with
	args := []interface{}{info.Title, info.Description}

	// Execute the single query and we place the id, CreatedAt and version into the info struct
	return I.DB.QueryRow(query, args...).Scan(&info.ID, &info.CreatedAt, &info.Version)
}

func (I InfoModel) Get(id int64) (*Info, error) {
	if id < 1 {
		return nil, ErrRecordNotFound
	}

	query :=
		`
		SELECT id, created_at, title, description, version
		FROM info
		WHERE id = $1
		`

	// Declare a Info struct to hold returned value
	var info Info

	// We use QueryRow because we will return only one value
	err := I.DB.QueryRow(query, id).Scan(
		&info.ID,
		&info.CreatedAt,
		&info.Title,
		&info.Description,
		&info.Version,
	)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound 
		default:
			return nil, err
		}
	}

	return &info, nil
}

func (I InfoModel) Update(info *Info) error {
	query := 
		`
		UPDATE info
		SET title = $1, description = $2, version = version + 1
		WHERE id = $3
		RETURNING version
		`
	args := []interface{}{
		info.Title,
		info.Description,
		info.ID,
	}

	return I.DB.QueryRow(query, args...).Scan(&info.Version)
}

func (I InfoModel) Delete(id int64) error {
	if id < 1 {
		return ErrRecordNotFound 
	}

	query := 
		`
		DELETE from info
		where id = $1
		`
	result, err := I.DB.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrRecordNotFound 
	}

	return nil
}

type Info struct {
	ID          int64     `json:"id"`
	CreatedAt   time.Time `json:"-"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Version     int32     `json:"version"`
}
