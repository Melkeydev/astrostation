package main

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
)


func (app *application) routes() *httprouter.Router {
	router := httprouter.New()

	// Add custom handling to overwrite existing ones
	router.NotFound = http.HandlerFunc(app.notFoundResponse)
	router.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowedResponse)

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthcheckHandler)
	router.HandlerFunc(http.MethodGet, "/v1/test_info/:id", app.showInfoHandler)
	router.HandlerFunc(http.MethodPost, "/v1/test_info", app.createInfoHandler)
	router.HandlerFunc(http.MethodPatch, "/v1/test_info/:id", app.updateInfoHandler)
	router.HandlerFunc(http.MethodDelete, "/v1/test_info/:id", app.deleteInfoHandler)

	return router
}
