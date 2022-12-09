package model

import (
	"errors"

	"github.com/google/uuid"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/encrypto"
)

type User struct {
	ID         string
	FirstName  string
	MiddleName string
	LastName   string
	Username   string
	Email      string
	Password   string
	Language   string
}

func UserFromAPI(a *api.User) (*User, error) {
	u := &User{ID: uuid.NewString()}

	if a.FirstName == nil || *a.FirstName == "" {
		return nil, errors.New("first name cannot be null")
	}
	u.FirstName = *a.FirstName

	if a.MiddleName == nil || *a.MiddleName == "" {
		return nil, errors.New("middle name cannot be null")
	}
	u.MiddleName = *a.MiddleName

	if a.LastName == nil || *a.LastName == "" {
		return nil, errors.New("last name cannot be null")
	}
	u.LastName = *a.LastName

	if a.Username == nil || *a.Username == "" {
		return nil, errors.New("username cannot be null")
	}
	u.Username = *a.Username

	if a.Email == nil || *a.Email == "" {
		return nil, errors.New("email cannot be null")
	}
	u.Email = *a.Email

	if a.Password == nil || *a.Password == "" {
		return nil, errors.New("password cannot be null")
	}
	u.Password = encrypto.Encrypto(*a.Password)

	if a.Language == nil || *a.Language == "" {
		return nil, errors.New("language cannot be null")
	}
	u.Language = *a.Language

	return u, nil
}

func (u *User) IsValidPassword(pw string) bool {
	return u.Password == encrypto.Encrypto(pw)
}
