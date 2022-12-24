package translation

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/pkg/errors"
	"io/ioutil"
	"net/http"
	"time"
)

type Interface interface {
	Translate(ctx context.Context, text, from, to string) (string, error)
}

type FakeClient struct {
	address string
}

func NewFake(address string) Interface {
	return &FakeClient{address: address}
}

func (c *FakeClient) Translate(ctx context.Context, text, from, to string) (string, error) {
	return map[string]string{
		"en": "cat",
		"zh": "猫",
		"es": "cat",
		"ja": "猫",
	}[to], nil
}

type Client struct {
	address string
}

func New(address string) Interface {
	return &Client{address: address}
}

type Payload struct {
	Text string `json:"text"`
	From string `json:"source_lang"`
	To   string `json:"target_lang"`
}

func (c *Client) Translate(ctx context.Context, text, from, to string) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	payload := &Payload{
		Text: text,
		From: from,
		To:   to,
	}

	b, err := json.Marshal(payload)
	if err != nil {
		return "", errors.Wrap(err, "Translate failed to marshal")
	}

	req, err := http.NewRequest(http.MethodPost, c.address, bytes.NewBuffer(b))
	if err != nil {
		return "", errors.Wrap(err, "Translate failed to prepare request")
	}

	req.Header.Set("Content-Type", "application/json")

	client := new(http.Client)
	resp, err := client.Do(req)
	if err != nil {
		return "", errors.Wrap(err, "Translate failed to call translation API")
	}
	defer resp.Body.Close()

	b, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", errors.Wrap(err, "Translate failed to read response body")
	}

	return string(b), nil
}
