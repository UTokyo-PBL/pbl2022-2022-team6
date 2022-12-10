package handler

import (
	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/httpclient/detection"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/httpclient/translation"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
)

type Server struct {
	repo        repository.Interface
	detection   detection.Interface
	translation translation.Interface
}

func New(
	repo repository.Interface,
	detection detection.Interface,
	translation translation.Interface,
) api.ServerInterface {
	return &Server{
		repo:        repo,
		detection:   detection,
		translation: translation,
	}
}
