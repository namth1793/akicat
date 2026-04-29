@echo off
echo ====================================
echo   AKICAT - Starting servers
echo ====================================
echo.
echo Backend : http://localhost:5018
echo Frontend: http://localhost:5174
echo.

start "AKICAT Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 2 /nobreak >nul
start "AKICAT Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

timeout /t 3 /nobreak >nul
start "" "http://localhost:5174"
