package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
)

func main() {
	err := run()
	if err != nil {
		os.Exit(1)
	}
	// if err != nil {
	// 	log.Printf("Error running the server: %+v", err)
	// 	os.Exit(1)
	// }
}

func run() error {
	s := server.NewMCPServer(
		"demo",
		"1.0.0",
		// server.WithResourceCapabilities(true, true),
		server.WithLogging(),
		server.WithRecovery(),
	)

	// fmt.Println(s)

	// tools := mcp.NewTool("calculate")

	tool := mcp.NewTool(
		"echo",
		mcp.WithDescription("echo tool"),
		mcp.WithNumber("count", mcp.Required(), mcp.Description("count of echo")),
		mcp.WithString("message", mcp.Required(), mcp.Description("message to echo")),
	)

	f := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		message := request.Params.Arguments["message"].(string)
		count := request.Params.Arguments["count"].(float64)

		return mcp.NewToolResultText(strings.Repeat(message, int(count))), nil
	}

	s.AddTool(tool, f)

	// fmt.Println("Starting server...")

	err := server.ServeStdio(s)
	if err != nil && !errors.Is(err, context.Canceled) {
		return fmt.Errorf("failed to serve: %w", err)
	}
	return nil
}
