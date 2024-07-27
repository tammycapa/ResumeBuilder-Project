@echo off

REM Delete executable if existing in order to prevent test from duplicating
if exist resume_builder rmdir /s /q resume_builder

REM Run unit tests and save results in a text file
echo.
echo ========== Running unit tests... ==========
echo.

npx jest _tests_\main.test.js --coverage

REM Check if tests passed
if %errorlevel% equ 0 (
  echo.
  echo Unit test complete. ALL tests PASSED.
) else (
  echo.
  echo Unit test complete. SOME tests FAILED.
  exit /b 1
)

REM Package application
echo.
echo ========== Packaging application... ==========
echo.

npx electron-packager . resume-builder --platform=win32 --arch=x64 --out=resume_builder --overwrite

if %errorlevel% equ 0 (
  echo.
  echo Executable file 'resume-builder.exe' successfully created!
) else (
  echo.
  echo Error creating executable file.
  exit /b 1
)
