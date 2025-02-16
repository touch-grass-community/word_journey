package services

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	datasource "world_journey_backend/data_source"
	"world_journey_backend/model"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type AuthenticationService struct {
	usersCollection *mongo.Collection
}

func NewAuthenticationService() *AuthenticationService {
	client := datasource.GetMongoClient()
	return &AuthenticationService{
		usersCollection: client.Database("database").Collection("users"),
	}
}

func (s *AuthenticationService) RegisterUser(newUser model.User, ctx context.Context) (result model.User, err error) {
	newUser.PasswordHash = hashPassword(newUser.PasswordHash)
	newUser.Id = bson.NewObjectID()
	newUser.Words = []model.LanguageWords{}

	inserted, err := s.usersCollection.InsertOne(context.TODO(), newUser)
	if err != nil {
		return model.User{}, err
	}
	fmt.Println("created", inserted)

	return newUser, nil
}

func hashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
}
