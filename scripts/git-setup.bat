@echo off
setlocal enabledelayedexpansion

echo 🚀 Setting up Git repository for Procedural World Builder...

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Initialize git repository if not already initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
) else (
    echo ✅ Git repository already initialized
)

REM Add all files
echo 📁 Adding files to Git...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "feat: initial commit - Procedural World Builder for Educational Videos

- Complete full-stack application with React + Three.js frontend
- Node.js + Express backend with AI integration
- OpenAI GPT-4 for automatic scene generation
- Azure Speech Services for text-to-speech
- Real-time 3D rendering with Three.js
- Camera animation system with timeline controls
- Comprehensive documentation and setup guides"

echo ✅ Initial commit created successfully!

echo.
echo 🌐 Next steps to push to GitHub:
echo 1. Create a new repository on GitHub: https://github.com/new
echo 2. Copy the repository URL (HTTPS or SSH)
echo 3. Run the following commands:
echo.
echo    git remote add origin ^<your-repository-url^>
echo    git branch -M main
echo    git push -u origin main
echo.
echo 📋 Example:
echo    git remote add origin https://github.com/yourusername/procedural-world-builder.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 🎉 Your project will be live on GitHub!
echo.
echo 📚 Don't forget to:
echo    - Add your API keys to GitHub Secrets for CI/CD
echo    - Update the README with your repository URL
echo    - Enable GitHub Pages if you want to host the demo
echo.
echo 🔐 Security reminder:
echo    - Never commit .env files with real API keys
echo    - Use .env.example files for sharing configuration templates
echo    - Add sensitive files to .gitignore
echo.

pause
