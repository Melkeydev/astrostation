package main

import (
	"astrostation.server/internal/data"
	"astrostation.server/internal/validator"
	"fmt"
	"net/http"
	"time"
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
		Title       string `json:"title"`
		Description string `json:"description"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// We use a validator to check the inputs
	// TODO: potentially look at making this into a separate func
	v := validator.New()


	// Title checks
	v.Check(input.Title != "", "title", "must be provided")
	v.Check(len(input.Title) <= 200, "title", "must not be more than 200 characters")

	// Description checks
	v.Check(input.Description != "", "description", "must be provided")
	v.Check(len(input.Title) <= 200, "title", "must not be more than 500 characters")

	if !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
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
