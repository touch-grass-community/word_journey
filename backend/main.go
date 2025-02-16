package main

import (
	"log"
	"net/http"
	datasource "world_journey_backend/data_source"
)

func main() {
	// check .env file exists and contains required data
	datasource.InitMongo()

	log.Printf("Server started")
	router := newRouter()
	log.Fatal(http.ListenAndServe(":8080", router))
}
