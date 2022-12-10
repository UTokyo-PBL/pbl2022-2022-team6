package service

import (
	"context"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/failures"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
)

func Languages(ctx context.Context, repo repository.Interface) ([]string, error) {
	ls, err := repo.ListLanguages(ctx)
	if err != nil {
		err = errors.Wrap(err, "Languages failed to repo.ListLanguages")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}
	return ls, nil
}
