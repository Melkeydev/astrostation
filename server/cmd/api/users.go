package main

import (
	"errors"
	"astrostation.server/internal/data"
	"astrostation.server/internal/validator"
	"net/http"
)

// NOTE: This is going to handler our actual functions
// Log in as a user
// Update the user

func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	// An anonymous struct to hold the request data
	var input struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	user := &data.User{
		Name:  input.Name,
		Email: input.Email,
	}

	// Salt and create the password
	err = user.Password.Set(input.Password)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	// Initiate a validator to pass in our inputs
	v := validator.New()

	if data.ValidateUser(v, user); !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	err = app.models.Users.Insert(user)
	if err != nil {
		switch {
		case errors.Is(err, errors.New("duplicate email")):
			// TODO: fix this error handling
			v.AddError("email", "a user with this email is already registered")
			app.failedValidationResponse(w, r, v.Errors)
		default:
			app.serverErrorResponse(w, r, err)

		}
		return
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"user": user}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

// TODO: add way better handling for client side as well
func (app *application) logInUserHandler(w http.ResponseWriter, r *http.Request) {
	// An anonymous struct to hold the request data
	// The user will send a us a request to log in with an email and a password
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// Validator for client input
	v := validator.New()

	if data.ValidateEmail(v, input.Email); !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	user, err := app.models.Users.GetUser(input.Email)
	if err != nil {
		// Definitely going to change this lol
		app.errorResponse(w, r, http.StatusUnauthorized, "unauthorized get user")	
		return
	}

	matched, err := user.Password.Matches(input.Password)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	// If passwords do not match
	if !matched {
		// Change this to not say password
		app.errorResponse(w, r, http.StatusUnauthorized, "cannot process request")	
		return
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"user": user}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
