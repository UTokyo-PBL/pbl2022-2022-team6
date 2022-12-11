package model

import (
	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/contracts"
)

type List struct {
	ID       string
	IconName string
	Name     string
	UserID   string
	Objects  []*Object
}

func ListFromAPI(userID string, a *api.List) (*List, error) {
	l := new(List)

	if a == nil {
		return nil, errors.New("list have not been parsed")
	}

	l.UserID = userID

	if a.Id == nil || *a.Id == "" {
		return nil, errors.New("id cannot be null")
	}
	l.ID = *a.Id

	if a.IconName == nil || *a.IconName == "" {
		l.IconName = contracts.DefaultIconName
	} else {
		l.IconName = *a.IconName
	}

	if a.Name == nil || *a.Name == "" {
		return nil, errors.New("name cannot be null")
	}
	l.Name = *a.Name

	if a.Objects == nil || len(*a.Objects) == 0 {
		return nil, errors.New("object cannot be null")
	}
	l.Objects = make([]*Object, 0, len(*a.Objects))
	for _, o := range *a.Objects {
		if o.Id == nil || *o.Id == "" {
			return nil, errors.New("id cannot be null")
		}
		l.Objects = append(l.Objects, &Object{
			ID: *o.Id,
		})
	}

	return l, nil
}

func ListFromDAO(l *daocore.List, los []*Object) *List {
	return &List{
		ID:       l.ID,
		IconName: l.IconName,
		Name:     l.Name,
		UserID:   l.UserID,
		Objects:  los,
	}
}

func (l *List) ListDAO() *daocore.List {
	return &daocore.List{
		ID:       l.ID,
		Name:     l.Name,
		UserID:   l.UserID,
		IconName: l.IconName,
	}
}

func (l *List) ListObjectsDAO() []*daocore.ListObject {
	los := make([]*daocore.ListObject, 0, len(l.Objects))
	for _, lo := range l.Objects {
		los = append(los, &daocore.ListObject{
			ListID:   l.ID,
			ObjectID: lo.ID,
		})
	}
	return los
}

func (l *List) API() *api.List {
	os := make([]api.Object, 0, len(l.Objects))
	for _, o := range l.Objects {
		os = append(os, *o.API())
	}

	return &api.List{
		IconName: &l.IconName,
		Id:       &l.ID,
		Name:     &l.Name,
		Objects:  &os,
	}
}
