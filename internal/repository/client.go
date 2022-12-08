package repository

import "database/sql"

type Interface interface {
}

type Client struct {
	db *sql.DB
}

func New(db *sql.DB) Interface {
	return &Client{
		db: db,
	}
}
