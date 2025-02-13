package middlewares

import "net/http"

func MethodCheckMiddleware(expectedMethod string, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != expectedMethod {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			return
		}
		next(w, r)
	}
}
