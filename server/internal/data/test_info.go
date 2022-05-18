package data

import (
	"database/sql"
	//"github.com/lib/pq"
	"time"
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
	return nil, nil
}

func (I InfoModel) Update(info *Info) error {
	return nil
}

func (I InfoModel) Delete(id int64) error {
	return nil
}

type Info struct {
	ID          int64     `json:"id"`
	CreatedAt   time.Time `json:"-"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Version     int32     `json:"version"`
}
