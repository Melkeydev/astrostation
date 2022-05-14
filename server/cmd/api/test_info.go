package main

import (
	"astrostation.server/internal/data"
	"fmt"
	"net/http"
	"time"
	"encoding/json"
)

func (app *application) healthcheckHandler(w http.ResponseWriter, r *http.Request) {
	enveloped_data := envelope{
		"status": "available",
		"system_info": map[string]string{
			"env": app.config.env,
		},
	}

	err := app.writeJSON(w, http.StatusOK, enveloped_data, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) createInfoHandler(w http.ResponseWriter, r *http.Request) {
	// Anonymous struct is our target decode destination
	var input struct {
		Title       string `json:"id"`
		Description string `json:"description"`
	}

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		app.errorResponse(w, r, http.StatusBadRequest, err.Error())
		return
	}

	fmt.Fprintf(w, "%+v\n", input)
}

func (app *application) showInfoHandler(w http.ResponseWriter, r *http.Request) {
	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)
	}

	info := data.Info{
		ID:          id,
		CreatedAt:   time.Now(),
		Title:       "Info Title",
		Description: "Info Description",
		Version:     1,
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"info": info}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
