#!/bin/bash
# Homeverse — One-click setup for Mac/Linux
echo ""
echo "🏠  Setting up Homeverse..."
echo ""

echo "📦  Installing root dependencies..."
npm install

echo "📦  Installing server dependencies..."
cd server && npm install && cd ..

echo "📦  Installing client dependencies..."
cd client && npm install && cd ..

echo ""
echo "✅  All done! Start the app with:"
echo ""
echo "    npm run dev"
echo ""
echo "    Frontend → http://localhost:5173"
echo "    Backend  → http://localhost:3001"
echo ""
