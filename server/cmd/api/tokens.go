package main

import (
	"astrostation.server/internal/data"
	"astrostation.server/internal/validator"
	"errors"
	"fmt"
	"net/http"
	"strings"
)

func (app *application) refreshToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Vary", "Authorization")
	authorizationHeader := r.Header.Get("Authorization")
	if authorizationHeader == "" {
		r = app.contextSetUser(r, data.AnonymousUser)
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

	_, err := app.models.Users.GetForToken(data.ScopeRefresh, token)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.invalidAuthenticationTokenResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	fmt.Println(token)
}

func (app *application) checkTokenExpiry(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Vary", "Authorization")
	authorizationHeader := r.Header.Get("Authorization")
	if authorizationHeader == "" {
		r = app.contextSetUser(r, data.AnonymousUser)
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
}
