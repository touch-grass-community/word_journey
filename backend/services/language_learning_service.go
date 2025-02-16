package services

import (
	"context"
	"errors"
	"fmt"
	"math/rand/v2"
	datasource "world_journey_backend/data_source"
	"world_journey_backend/model"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type LanguageLearningService struct {
	usersCollection *mongo.Collection
}

func NewLanguageLearningService() *LanguageLearningService {
	client := datasource.GetMongoClient()
	return &LanguageLearningService{
		usersCollection: client.Database("database").Collection("users"),
	}
}

func (s *LanguageLearningService) PostNewWord(userId string, language string, newWord model.Word, ctx context.Context) (err error) {
	oid, err := bson.ObjectIDFromHex(userId)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": oid, "words.language": language}
	update := bson.M{
		"$push": bson.M{"words.$.entries": newWord},
	}

	result, err := s.usersCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	// If the language section doesn't exist, create it
	if result.MatchedCount == 0 {
		update = bson.M{
			"$push": bson.M{
				"words": bson.M{
					"language": language,
					"entries":  []model.Word{newWord},
				},
			},
		}
		_, err = s.usersCollection.UpdateOne(ctx, bson.M{"_id": oid}, update)
	}
	if err != nil {
		return err
	}

	return nil
}

func (s *LanguageLearningService) GetRandomWords(userId string, language string, ctx context.Context) (result []model.Word, err error) {
	return getWords(s, userId, language, ctx, true)
}

func (s *LanguageLearningService) GetAllWords(userId string, language string, ctx context.Context) (result []model.Word, err error) {
	return getWords(s, userId, language, ctx, false)
}

func getWords(s *LanguageLearningService, userId string, language string, ctx context.Context, random bool) (result []model.Word, err error) {
	oid, err := bson.ObjectIDFromHex(userId)
	if err != nil {
		return nil, err
	}

	var user struct {
		Words []model.LanguageWords `bson:"words"`
	}

	err = s.usersCollection.FindOne(ctx, bson.M{"_id": oid}).Decode(&user)
	if err != nil {
		return nil, err
	}

	for _, lang := range user.Words {
		fmt.Println("comparing ", lang.Language, language)
		if lang.Language == language {
			entries := lang.Entries
			if random && len(entries) > 5 {
				// Shuffle and return `count` random words
				rand.Shuffle(len(entries), func(i, j int) {
					entries[i], entries[j] = entries[j], entries[i]
				})
				return entries[:5], nil
			}
			fmt.Println("found lang ", lang)
			return entries, nil
		}
	}

	return nil, errors.New("language not found")
}
