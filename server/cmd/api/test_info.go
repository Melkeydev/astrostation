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

	info := &data.Info{
		Title:       input.Title,
		Description: input.Description,
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

	// Call the DB
	err = app.models.Info.Insert(info)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/test_info/%d", info.ID))

	err = app.writeJSON(w, http.StatusCreated, envelope{"info":info}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
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
