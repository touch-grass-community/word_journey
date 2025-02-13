package services

import (
	"context"
	"fmt"
	datasource "language_learning_server/data_source"
	"language_learning_server/model"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type WordsService struct {
	collection *mongo.Collection
}

func NewWordsService() *WordsService {
	client := datasource.GetMongoClient()
	return &WordsService{
		collection: client.Database("database").Collection("words"),
	}
}

func (s *WordsService) PostNewWord(ctx context.Context) (result *bson.M, err error) {
	newWord := bson.M{
		"native":      "ciao",
		"translation": "hello",
	}
	insertResult, err := s.collection.InsertOne(ctx, newWord)
	if err != nil {
		return nil, model.NewCustomError(500, "Database error :"+err.Error())
	}

	res := bson.M{
		"inserted_id": insertResult.InsertedID,
	}
	fmt.Println("Inserted", res)
	return &res, nil
}

func (s *WordsService) GetRandomWords(ctx context.Context) (result *bson.M, err error) {
	var res bson.M
	dbErr := s.collection.FindOne(ctx, bson.D{{"title", "example"}}).Decode(&res)
	if dbErr == mongo.ErrNoDocuments {
		return nil, model.NewCustomError(404, "Could not find word in database")
	}
	if dbErr != nil {
		return nil, dbErr
	}
	return &res, nil
}
