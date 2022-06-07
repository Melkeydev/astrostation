package main

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"astrostation.server/internal/data"
	"astrostation.server/internal/validator"
)

func (app *application) refreshTokenHandler(w http.ResponseWriter, r *http.Request) {
	//We get the token from a post request
	var input struct {
		Token string `json:"token"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	v := validator.New()
	if data.ValidateTokenPlaintext(v, input.Token); !v.Valid() {
		app.invalidAuthenticationTokenResponse(w, r)
		return
	}

	user, err := app.models.Users.GetForToken(data.ScopeRefresh, input.Token)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.invalidAuthenticationTokenResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	_, err = app.models.Users.ConfirmToken(data.ScopeRefresh, input.Token)
	if err != nil {
		app.refreshTokenExpiredResponse(w, r)
		return
	}

	err = app.models.Tokens.DeleteTokenForUser(user.ID, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	token, err := app.models.Tokens.New(user.ID, 10*time.Minute, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"token": token}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) checkTokenExpireHandler(w http.ResponseWriter, r *http.Request) {
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

	valid, err := app.models.Users.ConfirmToken(data.ScopeAuthentication, token)
	if err != nil {
		app.tokenExpiredResponse(w, r)
		return
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"success": valid}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
