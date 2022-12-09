package model

import (
	"errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"

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
	u := new(User)

	if a.Id == nil || a.Id.String() == "" {
		return nil, errors.New("id cannot be null")
	}
	u.ID = a.Id.String()

	if a.FirstName == nil || *a.FirstName == "" {
		return nil, errors.New("first name cannot be null")
	}
	u.FirstName = *a.FirstName

	if a.MiddleName == nil {
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

func UserFromDAO(d *daocore.User) *User {
	return &User{
		ID:         d.ID,
		FirstName:  d.FirstName,
		MiddleName: d.MiddleName,
		LastName:   d.LastName,
		Username:   d.Username,
		Email:      d.Email,
		Password:   d.Password,
		Language:   d.Language,
	}
}

func (u *User) IsValidPassword(pw string) bool {
	return u.Password == encrypto.Encrypto(pw)
}

func (u *User) ToDAO() *daocore.User {
	return &daocore.User{
		ID:         u.ID,
		Email:      u.Email,
		Password:   u.Password,
		FirstName:  u.FirstName,
		MiddleName: u.MiddleName,
		LastName:   u.LastName,
		Username:   u.Username,
		Language:   u.Language,
	}
}
