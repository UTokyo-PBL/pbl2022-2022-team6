package types

func Bool2Int(b bool) int {
	switch b {
	case false:
		return 0
	case true:
		return 1
	default:
		panic("unknown error")
	}
}
