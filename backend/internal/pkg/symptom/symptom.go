package symptom

const (
	TypeSneeze = "SNEEZE"
)

var (
	AllSymptoms = []string{
		TypeSneeze,
	}
)

func ValidSymptom(givenSymptom string) bool {
	for _, s := range AllSymptoms {
		if givenSymptom == s {
			return true
		}
	}
	return false
}
