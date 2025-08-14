@echo off
REM Procedural World Builder - Windows Installation Script

echo 🌍 Setting up Procedural World Builder...
echo =========================================

REM Check Node.js installation
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

REM Setup environment files
echo ⚙️ Setting up environment files...

if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
    echo 📝 Created server\.env from template
)

if not exist "client\.env" (
    copy "client\.env.example" "client\.env"
    echo 📝 Created client\.env from template
)

REM Create shared directory
if not exist "shared" mkdir shared
echo 📁 Created shared directory for common types and utilities

echo.
echo 🎉 Installation completed successfully!
echo.
echo Next steps:
echo 1. Edit server\.env and add your API keys
echo 2. Run 'npm run dev' to start both client and server
echo 3. Open http://localhost:5173 in your browser
echo.
echo For more information, see README.md
echo.
pause
