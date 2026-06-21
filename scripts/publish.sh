#!/bin/bash

# Anim233 publish script
# Usage: ./scripts/publish.sh [patch|minor|major]

set -e

# Get version type from argument (default to patch)
VERSION_TYPE=${1:-patch}

echo "📦 Anim233 Publishing Script"
echo "=========================="
echo ""

# Check if logged in to npm
echo "Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to npm. Please run 'npm login' first."
    exit 1
fi
echo "✅ Logged in as $(npm whoami)"
echo ""

# Run tests
echo "Running tests..."
if npm test; then
    echo "✅ Tests passed"
else
    echo "❌ Tests failed"
    exit 1
fi
echo ""

# Run typecheck
echo "Running typecheck..."
if npm run typecheck; then
    echo "✅ Typecheck passed"
else
    echo "❌ Typecheck failed"
    exit 1
fi
echo ""

# Build project
echo "Building project..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

# Bump version
echo "Bumping version ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ Version bumped to $NEW_VERSION"
echo ""

# Create git tag
echo "Creating git tag v$NEW_VERSION..."
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Version $NEW_VERSION"
echo "✅ Git tag created"
echo ""

# Publish to npm
echo "Publishing to npm..."
echo "📝 Note: You may be prompted for 2FA code"
if npm publish; then
    echo "✅ Published to npm successfully!"
else
    echo "❌ Failed to publish to npm"
    exit 1
fi
echo ""

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main
git push origin "v$NEW_VERSION"
echo "✅ Pushed to GitHub"
echo ""

echo "🎉 Release v$NEW_VERSION complete!"
echo ""
echo "Next steps:"
echo "  - Check npm: https://www.npmjs.com/package/anim233-ts"
echo "  - Check GitHub: https://github.com/neko233-com/anim233-ts/releases"