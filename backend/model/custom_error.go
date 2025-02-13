package model

import "fmt"

// CustomError struct with Code and Message
type CustomError struct {
	Code    int
	Message string
}

// Implement the error interface
func (e *CustomError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Code, e.Message)
}

// Helper function to create a new CustomError, it is passed by ref to be more efficient
func NewCustomError(code int, message string) *CustomError {
	return &CustomError{Code: code, Message: message}
}
