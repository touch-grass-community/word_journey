package model

type Word struct {
	Native      []string `json:"native" validate:"required,min=1"`
	Translation string   `json:"translation" validate:"required"`
	Type_       string   `json:"type" validate:"required"`
	Note        string   `json:"note,omitempty"`
	Example     string   `json:"example,omitempty"`
}
