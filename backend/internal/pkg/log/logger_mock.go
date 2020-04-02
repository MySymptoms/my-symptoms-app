package log

import (
	"context"
	"fmt"
)

type Mock struct{}

func (l *Mock) Debug(ctx context.Context, format string, args ...interface{}) {
	fmt.Printf(format, args...)
}
func (l *Mock) Info(ctx context.Context, format string, args ...interface{}) {
	fmt.Printf(format, args...)

}
func (l *Mock) Warning(ctx context.Context, format string, args ...interface{}) {
	fmt.Printf(format, args...)

}
func (l *Mock) Error(ctx context.Context, format string, args ...interface{}) {
	fmt.Printf(format, args...)

}
func (l *Mock) Panic(ctx context.Context, format string, args ...interface{}) {
	fmt.Printf(format, args...)

}
func (l *Mock) SetLevel(level Level) error {
	return nil
}
func (l Mock) Close() error {
	return nil
}
