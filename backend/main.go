package main

import (
	"language_learning_server/controllers"
	datasource "language_learning_server/data_source"
	"language_learning_server/middlewares"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	// check .env file exists and contains required data
	datasource.InitMongo()

	muxRouter := mux.NewRouter()

	muxRouter.HandleFunc("/api/postNewWord", middlewares.MethodCheckMiddleware(http.MethodPost, controllers.PostNewWord))
	muxRouter.HandleFunc("/api/getRandomWords", middlewares.MethodCheckMiddleware(http.MethodPost, controllers.GetRandomWords)) //TODO check method type
	http.ListenAndServe(":8080", muxRouter)
}
