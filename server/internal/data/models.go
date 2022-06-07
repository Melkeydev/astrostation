package data

// This file is used as a wrapper for all the different connections we can have

import (
	"database/sql"
)

// We can have multiple models in here
type Models struct {
	Users  UsersModel
	Info   InfoModel
	Tokens TokenModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Users:  UsersModel{DB: db},
		Info:   InfoModel{DB: db},
		Tokens: TokenModel{DB: db},
	}
}
