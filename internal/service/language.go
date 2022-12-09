package service

import (
	"context"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
)

func Languages(ctx context.Context, repo repository.Interface) ([]string, error) {
	return repo.ListLanguages(ctx)
}
