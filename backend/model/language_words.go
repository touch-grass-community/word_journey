package model

type LanguageWords struct {
	Language string `json:"language"`
	Entries  []Word `json:"entries"`
}
