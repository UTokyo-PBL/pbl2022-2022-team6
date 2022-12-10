package model

import (
	"errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/contracts"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/encrypto"
)

type User struct {
	ID                 string
	FirstName          string
	MiddleName         string
	LastName           string
	Username           string
	Email              string
	Password           string
	Language           string
	ProfileImage       string
	PreferredLanguages []string
}

func UserFromAPI(u *api.User) (*User, error) {
	user := new(User)

	if u.Id == nil || *u.Id == "" {
		return nil, errors.New("id cannot be null")
	}
	user.ID = *u.Id

	if u.FirstName == nil || *u.FirstName == "" {
		return nil, errors.New("first name cannot be null")
	}
	user.FirstName = *u.FirstName

	if u.MiddleName == nil {
		user.MiddleName = ""
	} else {
		user.MiddleName = *u.MiddleName
	}

	if u.LastName == nil || *u.LastName == "" {
		return nil, errors.New("last name cannot be null")
	}
	user.LastName = *u.LastName

	if u.Username == nil || *u.Username == "" {
		return nil, errors.New("username cannot be null")
	}
	user.Username = *u.Username

	if u.Email == nil || *u.Email == "" {
		return nil, errors.New("email cannot be null")
	}
	user.Email = *u.Email

	if u.Password == nil || *u.Password == "" {
		return nil, errors.New("password cannot be null")
	}
	user.Password = encrypto.Encrypto(*u.Password)

	if u.Language == nil || *u.Language == "" {
		return nil, errors.New("language cannot be null")
	}
	user.Language = *u.Language

	if u.ProfileImage == nil {
		user.ProfileImage = contracts.AnonymousImageURL
	} else {
		user.ProfileImage = *u.ProfileImage
	}

	if u.PreferredLanguages == nil {
		user.PreferredLanguages = *u.PreferredLanguages
	}

	return user, nil
}

func UserFromDAO(u *daocore.User, ps []*daocore.UserPreferredLanguage) *User {
	user := &User{
		ID:                 u.ID,
		FirstName:          u.FirstName,
		MiddleName:         u.MiddleName,
		LastName:           u.LastName,
		Username:           u.Username,
		Email:              u.Email,
		Password:           u.Password,
		Language:           u.Language,
		ProfileImage:       u.ProfileImage,
		PreferredLanguages: make([]string, 0, len(ps)),
	}
	for _, p := range ps {
		user.PreferredLanguages = append(user.PreferredLanguages, p.Language)
	}
	return user
}

func (u *User) IsValidPassword(pw string) bool {
	return u.Password == encrypto.Encrypto(pw)
}

func (u *User) UserDAO() *daocore.User {
	return &daocore.User{
		ID:           u.ID,
		Email:        u.Email,
		Password:     u.Password,
		FirstName:    u.FirstName,
		MiddleName:   u.MiddleName,
		LastName:     u.LastName,
		Username:     u.Username,
		Language:     u.Language,
		ProfileImage: u.ProfileImage,
	}
}

func (u *User) UserPreferredLanguagesDAO() []*daocore.UserPreferredLanguage {
	ps := make([]*daocore.UserPreferredLanguage, 0, len(u.PreferredLanguages))
	for _, p := range u.PreferredLanguages {
		ps = append(ps, &daocore.UserPreferredLanguage{
			UserID:   u.ID,
			Language: p,
		})
	}
	return ps
}

func (u *User) API() *api.User {
	return &api.User{
		Email:              &u.Email,
		FirstName:          &u.FirstName,
		Id:                 &u.ID,
		Language:           &u.Language,
		LastName:           &u.LastName,
		MiddleName:         &u.MiddleName,
		Password:           &u.Password,
		PreferredLanguages: &u.PreferredLanguages,
		ProfileImage:       &u.ProfileImage,
		Username:           &u.Username,
	}
}
