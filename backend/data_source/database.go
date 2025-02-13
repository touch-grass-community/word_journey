package datasource

import (
	"context"
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var (
	clientInstance *mongo.Client
	clientOnce     sync.Once
)

// InitMongo initializes the MongoDB client
func InitMongo() {
	clientOnce.Do(func() {
		// Load environment variables
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found")
		}

		uri := os.Getenv("MONGODB_URI")
		if uri == "" {
			log.Fatal("Set your 'MONGODB_URI' environment variable.")
		}

		var err error
		clientInstance, err = mongo.Connect(options.Client().ApplyURI(uri))
		if err != nil {
			log.Fatalf("Failed to connect to MongoDB: %v", err)
		}

		log.Println("Connected to MongoDB")

		// Handle application shutdown
		go func() {
			<-context.Background().Done()
			if err := clientInstance.Disconnect(context.Background()); err != nil {
				log.Fatalf("Error disconnecting MongoDB: %v", err)
			}
		}()
	})
}

// GetMongoClient returns the initialized MongoDB client
func GetMongoClient() *mongo.Client {
	if clientInstance == nil {
		InitMongo()
	}
	return clientInstance
}
