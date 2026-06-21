#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Run tests
echo "Running tests..."
npm test

# Run typecheck
echo "Running typecheck..."
npm run typecheck

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo ""
    echo "To publish to npm:"
    echo "  npm login"
    echo "  npm publish"
    echo ""
    echo "To create a GitHub release:"
    echo "  gh release create v0.1.0 --title 'v0.1.0' --notes 'Initial release'"
else
    echo "Build failed!"
    exit 1
fi