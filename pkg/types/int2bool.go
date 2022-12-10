package types

import (
	"fmt"
)

func Int2Bool(i int) bool {
	switch i {
	case 0:
		return false
	case 1:
		return true
	default:
		err := fmt.Errorf("Int2Bool: int %d cannot convert into bool", i)
		panic(err)
	}
}
