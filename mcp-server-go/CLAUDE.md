# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Build: `go build`
- Run: `go run main.go`
- Install dependencies: `go mod download`
- Update dependencies: `go mod tidy`

## Test Commands
- Run all tests: `go test ./...`
- Run specific test: `go test -run TestName ./path/to/package`
- Run tests with verbose output: `go test -v ./...`
- Run tests with coverage: `go test -cover ./...`

## Code Style Guidelines
- Format code with: `gofmt -s -w .` or `go fmt ./...`
- Imports: Group standard library, third-party, and local imports separated by blank lines
- Error handling: Use explicit error checking (`if err != nil`) and return errors with context
- Types: Use explicit type declarations and interfaces when appropriate
- Naming: Use camelCase for unexported and PascalCase for exported identifiers
- Use context.Context for cancellation and timeouts
- Follow Go's error handling pattern with meaningful error messages