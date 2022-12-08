package handler

import (
	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
)

type Server struct {
	repo repository.Interface
}

func New(repo repository.Interface) api.ServerInterface {
	return &Server{
		repo: repo,
	}
}
