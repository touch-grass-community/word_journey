package controllers

import (
	"net/http"
	"world_journey_backend/model"
	"world_journey_backend/services"
)

var (
	AuthenticationService services.AuthenticationService = *services.NewAuthenticationService()
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	var user model.User

	if errBody := decodeAndValidateBody(r, &user); errBody != nil {
		respondWithError(w, http.StatusBadRequest, errBody.Error())
		return
	}
	user, err := AuthenticationService.RegisterUser(user, r.Context())
	if err != nil {
		handleServiceError(w, err)
		return
	}

	respondWithJSON(w, http.StatusOK, user)
}
