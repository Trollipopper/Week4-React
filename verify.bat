@echo off
REM Verify Week 4 React Router app is ready for deployment
REM Usage: verify.bat

echo.
echo ========================================
echo React Router App - Deployment Verification
echo ========================================
echo.

REM Check if npm is installed
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm not found. Please install Node.js
  pause
  exit /b 1
)
echo [OK] npm is installed

REM Check if dist folder exists
echo.
echo Checking dist folder...
if not exist "dist\" (
  echo [ERROR] dist folder not found. Run: npm run build
  pause
  exit /b 1
)
echo [OK] dist folder exists

REM Check if required files exist
echo.
echo Checking build files...
if not exist "dist\index.html" (
  echo [ERROR] dist/index.html not found
  pause
  exit /b 1
)
echo [OK] dist/index.html exists

if not exist "dist\assets\*.js" (
  echo [ERROR] JavaScript bundle not found
  pause
  exit /b 1
)
echo [OK] JavaScript bundle exists

if not exist "dist\assets\*.css" (
  echo [ERROR] CSS stylesheet not found
  pause
  exit /b 1
)
echo [OK] CSS stylesheet exists

REM Check if deploy script exists
echo.
echo Checking deployment scripts...
if not exist "deploy.bat" (
  echo [ERROR] deploy.bat not found
  pause
  exit /b 1
)
echo [OK] deploy.bat exists

REM Check git status
echo.
echo Checking git status...
git status >nul 2>&1
if errorlevel 1 (
  echo [WARNING] Not in a git repository
) else (
  echo [OK] Git repository found
  git log --oneline -1
)

echo.
echo ========================================
echo All checks passed!
echo.
echo You can now deploy using:
echo   .\deploy.bat
echo.
echo Or manually via SFTP:
echo   sftp elmomal@shell.metropolia.fi
echo ========================================
echo.
pause
