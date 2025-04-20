package main

import (
	"log"
	"os"

	"github.com/mark3labs/mcp-go/server"
)

func main() {
	err := run()
	if err != nil {
		log.Printf("Error running the server: %+v", err)
		os.Exit(1)
	}
}

func run() error {
	s := server.NewMCPServer(
		"demo",
		"1.0.0",
		server.WithResourceCapabilities(true, true),
		server.WithLogging(),
		server.WithRecovery(),
	)

	// tools := mcp.NewTool("calculate")

	if err := server.ServeStdio(s); err != nil {
		return err
	}
	return nil
}
