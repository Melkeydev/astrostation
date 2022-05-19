package main

import (
	"astrostation.server/internal/data"
	"astrostation.server/internal/validator"
	"errors"
	"fmt"
	"net/http"
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

	err = app.writeJSON(w, http.StatusCreated, envelope{"info": info}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) showInfoHandler(w http.ResponseWriter, r *http.Request) {
	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	info, err := app.models.Info.Get(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"info": info}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) updateInfoHandler(w http.ResponseWriter, r *http.Request) {
	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	info, err := app.models.Info.Get(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	// Decalre an struct to hold the data from our Get call
	// We use pointers because they return nil values and can alllow us to do partial updates
	var input struct {
		Title       *string `json:"title"`
		Description *string `json:"description"`
	}

	err = app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	if input.Title != nil {
		info.Title = *input.Title
	}

	if input.Description != nil {
		info.Description = *input.Description
	}

	v := validator.New()

	// Title checks
	v.Check(info.Title != "", "title", "must be provided")
	v.Check(len(info.Title) <= 200, "title", "must not be more than 200 characters")

	// Description checks
	v.Check(info.Description != "", "description", "must be provided")
	v.Check(len(info.Title) <= 200, "title", "must not be more than 500 characters")

	if !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	err = app.models.Info.Update(info)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"info": info}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) deleteInfoHandler(w http.ResponseWriter, r *http.Request) {
	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	err = app.models.Info.Delete(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"message": "test_info successfully deleted"}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
