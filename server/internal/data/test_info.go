package data

import (
	"time"
)

type Info struct {
	ID          int64     `json:"id"`
	CreatedAt   time.Time `json:"-"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Version     int32     `json:"version"`
}
