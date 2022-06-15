package main

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"astrostation.server/internal/data"
	"astrostation.server/internal/validator"
)

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
			v.AddError("email", "a user with this email is already registered")
			app.failedValidationResponse(w, r, v.Errors)
		default:
			app.serverErrorResponse(w, r, err)

		}
		return
	}

	refreshToken, err := app.models.Tokens.New(user.ID, 24*time.Hour, data.ScopeRefresh)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	token, err := app.models.Tokens.New(user.ID, 10*time.Minute, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"token": token, "refreshToken": refreshToken}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

// When a user logs in they will need a token right away
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

	data.ValidateEmail(v, input.Email)
	data.ValidatePassword(v, input.Password)

	// If something does not pass our validation checks
	if !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	user, err := app.models.Users.GetUser(input.Email)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.invalidCredentialsResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	matched, err := user.Password.Matches(input.Password)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	// If passwords do not match
	if !matched {
		app.invalidCredentialsResponse(w, r)
		return
	}

	//NOTE: maybe delete old tokens?
	err = app.models.Tokens.DeleteTokenForUser(user.ID, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	// This is where we will now send back a token
	token, err := app.models.Tokens.New(user.ID, 10*time.Minute, data.ScopeAuthentication)
	if err != nil {
		// If there is any error from our DB communication
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.models.Tokens.DeleteTokenForUser(user.ID, data.ScopeRefresh)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	// This is where we will now send back a token
	refreshToken, err := app.models.Tokens.New(user.ID, 24*time.Hour, data.ScopeRefresh)
	if err != nil {
		// If there is any error from our DB communication
		app.serverErrorResponse(w, r, err)
		return
	}

	// NOTE: This right now sends back the token and refresh token in a payload that is then stored within
	// local storage

	// TODO: Is move this to a Cookie
	expiration := time.Now().Add(24 * time.Hour)
	cookie := http.Cookie{
		Name: "token", 
		Value: token.Plaintext,
		Expires: expiration,
		HttpOnly: true,
		// TODO: this needs to be turned on for Prod
		//SameSite: http.SameSiteNoneMode,
		// TODO: this needs to be secure for prod
		Secure:false,
	}
	fmt.Println("Cookie after logging in", cookie)
	http.SetCookie(w, &cookie)

	w.WriteHeader(200)

	err = app.writeJSON(w, http.StatusCreated, envelope{"token": token, "refreshToken": refreshToken}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) logoutHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Vary", "Authorization")
	authorizationHeader := r.Header.Get("Authorization")
	if authorizationHeader == "" {
		app.contextSetUser(r, data.AnonymousUser)
		return
	}

	headerParts := strings.Split(authorizationHeader, " ")
	if len(headerParts) != 2 || headerParts[0] != "Bearer" {
		app.invalidAuthenticationTokenResponse(w, r)
		return
	}

	token := headerParts[1]
	v := validator.New()

	if data.ValidateTokenPlaintext(v, token); !v.Valid() {
		app.invalidAuthenticationTokenResponse(w, r)
		return
	}

	user, err := app.models.Users.GetForToken(data.ScopeAuthentication, token)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.invalidAuthenticationTokenResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.models.Tokens.DeleteTokenForUser(user.ID, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	err = app.models.Tokens.DeleteTokenForUser(user.ID, data.ScopeRefresh)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"success": true}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
