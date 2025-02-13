package controllers

import (
	"encoding/json"
	"fmt"
	"language_learning_server/model"
	"language_learning_server/services"
	"log"
	"net/http"
)

var (
	WordsService services.WordsService = *services.NewWordsService()
)

func PostNewWord(w http.ResponseWriter, r *http.Request) {
	result, err := WordsService.PostNewWord(r.Context())
	if err != nil {
		customErr, isCustomError := err.(*model.CustomError)
		if isCustomError {
			http.Error(w, customErr.Message, customErr.Code)
		} else {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
		fmt.Println(err)
		return
	}

	jsonData, err := json.Marshal(result)
	if err != nil {
		log.Fatal(("ERROR: " + err.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(jsonData))
}

func GetRandomWords(w http.ResponseWriter, r *http.Request) {
	WordsService.GetRandomWords(r.Context())
}

func checkMethod(w http.ResponseWriter, r *http.Request, method string) bool {
	if r.Method != method {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return false
	}
	return true
}

/*
PATH paramenters:
vars := mux.Vars(r)
	lobbyID := vars["lobbyId"]

Query parameters:

Body parameters:
*/
