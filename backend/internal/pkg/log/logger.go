package log

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/sirupsen/logrus"
)

const (
	defaultStackLevel = 2

	fileSplitString = "server"
)

// Logger is the interface for logging
type Logger interface {
	Debug(ctx context.Context, format string, args ...interface{})
	Info(ctx context.Context, format string, args ...interface{})
	Warning(ctx context.Context, format string, args ...interface{})
	Error(ctx context.Context, format string, args ...interface{})
	Panic(ctx context.Context, format string, args ...interface{})

	SetLevel(level Level) error
	Close() error
}

// Level is the log level. It represents the amount of output the logging should output.
type Level string

func (l Level) String() string {
	return string(l)
}

const (
	LevelUnknown = "unknown"
	LevelPanic   = "panic"
	LevelFatal   = "fatal"
	LevelError   = "error"
	LevelWarn    = "warn"
	LevelInfo    = "info"
	LevelDebug   = "debug"
)

var levels = map[string]Level{
	"panic":   LevelPanic,
	"fatal":   LevelFatal,
	"error":   LevelError,
	"warning": LevelWarn,
	"warn":    LevelWarn,
	"info":    LevelInfo,
	"debug":   LevelDebug,
}

// ParseLevel returns the corresponding level from a string. If no match was found, it returns LevelUnknown
func ParseLevel(level string) (Level, error) {
	lvl, err := logrus.ParseLevel(level)
	if err != nil {
		return LevelUnknown, err
	}
	return Level(lvl), err
}

type logger struct {
	l          *logrus.Logger
	stackLevel int
	logfile    *os.File
}

// New returns a new logger with default stack level. logger.Close should be deferred after creating a new logger.
func New(level Level, dir, name string) (*logger, error) {
	return NewWithStackLevel(level, defaultStackLevel, dir, name)
}

// New returns a new logger with given stack level. logger.Close should be deferred after creating a new logger.
func NewWithStackLevel(level Level, stackLevel int, dir, name string) (*logger, error) {
	return new(level, stackLevel, dir, name)
}

func new(level Level, stackLevel int, dir, name string) (*logger, error) {
	err := os.MkdirAll(dir, 0755)
	if err != nil {
		return nil, err
	}

	logfile, err := os.OpenFile(filepath.Join(dir, name+".log"), os.O_APPEND|os.O_CREATE|os.O_RDWR, 0666)
	if err != nil {
		return nil, err
	}

	l := logger{
		l:          logrus.New(),
		stackLevel: stackLevel,
		logfile:    logfile,
	}

	l.SetOutput(io.MultiWriter(os.Stdout, logfile))
	l.SetFormatter(&logrus.JSONFormatter{})
	err = l.SetLevel(level)
	if err != nil {
		return nil, err
	}

	return &l, err
}

// Close closes the log file used by the logger
func (l *logger) Close() error {
	return l.logfile.Close()
}

func (l *logger) log(ctx context.Context, level Level, format string, args ...interface{}) {
	msg := format
	if len(args) > 0 {
		msg = fmt.Sprintf(format, args...)
	}

	_, file, line, ok := runtime.Caller(l.stackLevel)
	var entry *logrus.Entry
	if ok {
		splits := strings.Split(file, fileSplitString)
		if len(splits) == 2 {
			entry = l.l.WithField("location", fmt.Sprintf("%s:%d", splits[1], line))
		} else {
			entry = l.l.WithField("location", fmt.Sprintf("%s:%d", file, line))
		}
	}

	switch level {
	case LevelDebug:
		entry.Debug(msg)
	case LevelInfo:
		entry.Info(msg)
	case LevelWarn:
		entry.Warn(msg)
	case LevelError:
		entry.Error(msg)
	case LevelPanic:
		entry.Panic(msg)
	default:
		entry.Debug(msg)
	}
}

func (l *logger) Debug(ctx context.Context, format string, args ...interface{}) {
	l.log(ctx, LevelDebug, format, args...)
}

func (l *logger) Info(ctx context.Context, format string, args ...interface{}) {
	l.log(ctx, LevelInfo, format, args...)
}

func (l *logger) Warning(ctx context.Context, format string, args ...interface{}) {
	l.log(ctx, LevelWarn, format, args...)
}

func (l *logger) Error(ctx context.Context, format string, args ...interface{}) {
	l.log(ctx, LevelError, format, args...)
}

func (l *logger) Panic(ctx context.Context, format string, args ...interface{}) {
	l.log(ctx, LevelPanic, format, args...)
}

func (l *logger) SetWriter(w io.Writer) {
	l.l.Out = w
}

func (l *logger) SetLevel(logLevel Level) error {
	level, err := logrus.ParseLevel(logLevel.String())
	if err != nil {
		return err
	}
	l.l.SetLevel(level)
	return nil
}

func (l *logger) SetOutput(w io.Writer) {
	l.l.SetOutput(w)
}

func (l *logger) SetFormatter(f *logrus.JSONFormatter) {
	l.l.SetFormatter(f)
}
