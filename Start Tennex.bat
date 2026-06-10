@echo off
cd /d "C:\Users\alexe\tennex-express"

:: Kill any leftover server from a previous session
for /f "tokens=5" %%p in ('netstat -ano 2^>nul ^| findstr ":3000 " ^| findstr "LISTENING"') do (
  taskkill /f /pid %%p >nul 2>&1
)

:: Start the dev server in a minimized window
start /min "Tennex Dev Server" cmd /k "npm run dev"

:: Wait for it to be ready, then open the browser
timeout /t 5 /nobreak > nul
start http://127.0.0.1:3000
