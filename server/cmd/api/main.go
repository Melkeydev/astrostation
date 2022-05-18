package main

import (
	"astrostation.server/internal/data"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"
)

type config struct {
	port int
	env  string
	db   struct {
		dsn          string
		maxOpenConns int
		maxIdleConns int
		maxIdleTime  string
	}
}

type application struct {
	config config
	logger *log.Logger
	models data.Models
}

func main() {
	var cfg config
	cfg.port = 4000
	cfg.env = "development"

	// host needs to be name of the docker container
	// TODO: add these into .env files and not push to git
	cfg.db.dsn = "host=localhost user=astro_admin password=password123 dbname=astrostation_db port=5432 sslmode=disable"
	cfg.db.maxOpenConns = 25
	cfg.db.maxIdleConns = 25
	cfg.db.maxIdleTime = "15m"

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	db, err := openDB(cfg)
	if err != nil {
		logger.Fatal(err)
	}

	app := &application{
		config: cfg,
		logger: logger,
		models: data.NewModels(db),
	}

	// we can write db functions like this
	//app.models.Info.Insert(...)

	defer db.Close()
	logger.Printf("database connection successful")

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	logger.Printf("Starting server on", srv.Addr)
	err = srv.ListenAndServe()
	logger.Fatal(err)
}
