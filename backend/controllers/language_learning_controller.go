package controllers

import (
	"net/http"
	"world_journey_backend/model"
	"world_journey_backend/services"
)

var (
	LanguageLearningService services.LanguageLearningService = *services.NewLanguageLearningService()
)

func PostNewWord(w http.ResponseWriter, r *http.Request) {
	var word model.Word
	params, errParams := retrieveQueryParams(r, "userId", "language")
	errBody := decodeAndValidateBody(r, &word)

	if errParams != nil || errBody != nil {
		respondWithError(w, http.StatusBadRequest, errParams.Error()+errBody.Error())
		return
	}

	userId := params[0]
	language := params[1]

	if err := LanguageLearningService.PostNewWord(userId, language, word, r.Context()); err != nil {
		handleServiceError(w, err)
		return
	}

	respondWithJSON(w, http.StatusOK, word)
}

func GetRandomWords(w http.ResponseWriter, r *http.Request) {
	params, errParams := retrieveQueryParams(r, "userId", "language")

	if errParams != nil {
		respondWithError(w, http.StatusBadRequest, errParams.Error())
		return
	}

	userId := params[0]
	language := params[1]

	word, err := LanguageLearningService.GetRandomWords(userId, language, r.Context())
	if err != nil {
		handleServiceError(w, err)
		return
	}

	respondWithJSON(w, http.StatusOK, word)
}

func GetAllWords(w http.ResponseWriter, r *http.Request) {
	params, errParams := retrieveQueryParams(r, "userId", "language")
	if errParams != nil {
		respondWithError(w, http.StatusBadRequest, errParams.Error())
		return
	}

	userId := params[0]
	language := params[1]

	word, err := LanguageLearningService.GetAllWords(userId, language, r.Context())
	if err != nil {
		handleServiceError(w, err)
		return
	}

	respondWithJSON(w, http.StatusOK, word)
}

/*
PATH paramenters:
vars := mux.Vars(r)
id := vars["id"] // Gets the {id} parameter from the URL

Query parameters:
queryParam := r.URL.Query().Get("lang") // Example: ?lang=en

Body parameters:
var word Word
err := json.NewDecoder(r.Body).Decode(&word)
if err != nil {
    http.Error(w, "Invalid JSON", http.StatusBadRequest)
    return
}
*/
