package translation

import (
	"context"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
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

func (c *Client) Translate(ctx context.Context, text, from, to string) (string, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	form := url.Values{}
	form.Add("text", text)
	form.Add("source_lang", from)
	form.Add("target_lang", to)

	payload := strings.NewReader(form.Encode())

	req, err := http.NewRequest(http.MethodPost, c.address, payload)
	if err != nil {
		return "", errors.Wrap(err, "Translate failed to prepare request")
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := new(http.Client)
	resp, err := client.Do(req)
	if err != nil {
		return "", errors.Wrap(err, "Translate failed to call translation API")
	}
	defer resp.Body.Close()

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", errors.Wrap(err, "Translate failed to read response body")
	}

	log.Println("resp", string(b))

	return string(b), nil
}
