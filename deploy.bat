@echo off
REM Deploy Week 4 React Router app to Metropolia (Windows)
REM Usage: deploy.bat

set USERNAME=elmomal
set SERVER=shell.metropolia.fi
set DEPLOY_PATH=~/public_html/wsk-routing

echo Building application...
call npm run build

echo.
echo Deploying to Metropolia...
echo Server: %SERVER%
echo Path: %DEPLOY_PATH%
echo.

REM Create a temporary SFTP batch file
(
  echo mkdir %DEPLOY_PATH%
  echo cd %DEPLOY_PATH%
  echo put dist\index.html
  echo put dist\assets\*
  echo bye
) > sftp_commands.txt

REM Execute SFTP with the commands
sftp -b sftp_commands.txt %USERNAME%@%SERVER%

REM Clean up temporary file
del sftp_commands.txt

echo.
echo Deployment complete!
echo App available at: https://users.metropolia.fi/~%USERNAME%/wsk-routing/
pause
