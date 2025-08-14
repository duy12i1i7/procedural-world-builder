#!/bin/bash

# Procedural World Builder - Installation Script
# This script sets up the complete development environment

echo "🌍 Setting up Procedural World Builder..."
echo "========================================="

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please upgrade to Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install root dependencies"
    exit 1
fi

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi
cd ..

# Setup environment files
echo "⚙️ Setting up environment files..."

if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    echo "📝 Created server/.env from template"
    echo "⚠️  Please edit server/.env and add your API keys:"
    echo "   - OPENAI_API_KEY: Your OpenAI API key"
    echo "   - AZURE_SPEECH_KEY: Your Azure Speech Services key (optional)"
fi

if [ ! -f "client/.env" ]; then
    cp client/.env.example client/.env
    echo "📝 Created client/.env from template"
fi

# Create shared directory
mkdir -p shared
echo "📁 Created shared directory for common types and utilities"

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env and add your API keys"
echo "2. Run 'npm run dev' to start both client and server"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "For more information, see README.md"
