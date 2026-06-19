@echo off
echo.
echo  Setting up Homeverse...
echo.

echo  Installing root dependencies...
call npm install

echo  Installing server dependencies...
cd server
call npm install
cd ..

echo  Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo  All done! Start the app with:
echo.
echo      npm run dev
echo.
echo      Frontend - http://localhost:5173
echo      Backend  - http://localhost:3001
echo.
pause
