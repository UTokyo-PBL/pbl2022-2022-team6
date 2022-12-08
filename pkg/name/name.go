package name

import (
	"strings"

	"github.com/gertd/go-pluralize"
)

var wordConventions = map[string]string{
	"id": "ID",
	"Id": "ID",
}

func GoPublicName(s string) string {
	s = strings.ReplaceAll(s, "_", " ")
	ss := strings.Split(strings.Title(s), " ")
	for i := range ss {
		if v, ok := wordConventions[ss[i]]; ok {
			ss[i] = v
		}
	}
	return pluralize.NewClient().Singular(strings.Join(ss, ""))
}
