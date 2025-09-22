@echo off
echo Pushing changes to repository...
echo.

REM Read PAT from external file
setlocal enabledelayedexpansion
set "PAT="
for /f "usebackq delims=" %%a in ("N:\Homepage\Website\auth.txt") do (
    set "PAT=%%a"
)

set GIT_REPO_URL=https://zoller-bot:%PAT%@github.com/OnGodBruno/Zoller-Website.git

REM Add all changes to staging
git add .

REM Check if there are any changes to commit
git diff-index --quiet HEAD --
if errorlevel 1 (
    REM Commit with timestamp
    git commit -m "Auto-commit: %date% %time%"
    
    REM Push to remote repository
    git push %GIT_REPO_URL% HEAD:main
    
    echo.
    echo Changes pushed successfully!
) else (
    echo No changes to commit.
)

echo.
pause