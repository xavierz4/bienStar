@echo off
echo ==========================================
echo       INICIANDO SISTEMA FENIX (MVP)
echo ==========================================
echo.

echo 1. Iniciando Web Admin (Next.js 15)...
start "Fenix Web Admin" cmd /k "cd apps\web-admin && npm run dev"

echo 2. Iniciando Mobile App (Expo 52)...
echo    (Presiona 'a' para Android o 'w' para Web en la nueva ventana)
start "Fenix Mobile App" cmd /k "cd apps\mobile-app && npm start"

echo.
echo ==========================================
echo    SISTEMA CORRIENDO EN SEGUNDO PLANO
echo ==========================================
echo - Web Admin: http://localhost:3000
echo - Mobile App: Esperando en ventana de Metro Bundler
echo.
pause
