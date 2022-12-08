package encrypto

import (
	"crypto/sha256"
	"fmt"
)

func Encrypto(pw string) string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(pw)))
}
