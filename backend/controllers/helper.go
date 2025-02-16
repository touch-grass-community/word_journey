package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"world_journey_backend/model"

	"github.com/go-playground/validator/v10"
)

var (
	validate = validator.New(validator.WithRequiredStructEnabled())
)

func handleServiceError(w http.ResponseWriter, err error) {
	if customErr, ok := err.(*model.CustomError); ok {
		respondWithError(w, customErr.Code, customErr.Message)
	} else {
		log.Println("Internal Error:", err)
		respondWithError(w, http.StatusInternalServerError, "Internal Server Error")
	}
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(payload)
}

// Unified error response
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func decodeAndValidateBody(r *http.Request, v interface{}) error {
	if err := json.NewDecoder(r.Body).Decode(v); err != nil {
		return errors.New("invalid request body")
	}
	return validate.Struct(v)
}

func retrieveQueryParams(r *http.Request, params ...string) ([]string, error) {
	values := make([]string, len(params))
	for i, param := range params {
		value := r.URL.Query().Get(param)
		if value == "" {
			fmt.Println("missing query parameter: ", param)
			return nil, fmt.Errorf("missing query parameter: %s", param)
		}
		values[i] = value
	}

	return values, nil
}
