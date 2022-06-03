package main

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"astrostation.server/internal/data"
	"astrostation.server/internal/validator"
)

func (app *application) refreshToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Vary", "Authorization")
	authorizationHeader := r.Header.Get("Authorization")
	if authorizationHeader == "" {
		app.contextSetUser(r, data.AnonymousUser)
		return
	}

	headerParts := strings.Split(authorizationHeader, " ")
	if len(headerParts) != 2 || headerParts[0] != "Bearer" {
		app.customResponse(w, r, "custom one")
		app.invalidAuthenticationTokenResponse(w, r)
		return
	}
	refreshToken := headerParts[1]
	v := validator.New()
	if data.ValidateTokenPlaintext(v, refreshToken); !v.Valid() {
		app.customResponse(w, r, "custom two")
		app.invalidAuthenticationTokenResponse(w, r)
		return
	}

	user, err := app.models.Users.GetForToken(data.ScopeRefresh, refreshToken)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.customResponse(w, r, "custom three")
			app.invalidAuthenticationTokenResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	_, err = app.models.Users.ConfirmToken(data.ScopeRefresh, refreshToken)
	if err != nil {
		app.customResponse(w, r, "custom four")
		app.refreshTokenExpiredResponse(w, r)
		return
	}

	err = app.models.Tokens.DeleteTokenForUser(user.ID, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	token, err := app.models.Tokens.New(user.ID, 2*time.Minute, data.ScopeAuthentication)
	if err != nil {
		app.customResponse(w, r, "custom four")
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"token": token}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) checkTokenExpire(w http.ResponseWriter, r *http.Request) {
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
