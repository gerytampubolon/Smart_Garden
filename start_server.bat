@echo off
cd C:\Users\%USERNAME%\Desktop\smart-garden-dashboard
start "" node server.js
timeout /t 5
start "" ngrok http 3000
exit
