package comparer

import (
	"math"

	"github.com/google/go-cmp/cmp"
)

const tolerance = .0001

var FloatComparer = cmp.Comparer(func(x, y float64) bool {
	diff := math.Abs(x - y)
	mean := math.Abs(x+y) / 2.0
	return diff <= tolerance*mean
})
