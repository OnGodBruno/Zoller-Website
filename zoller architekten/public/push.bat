@echo off
echo Pushing changes to repository...
echo.

REM Add all changes to staging
git add .

REM Check if there are any changes to commit
git diff-index --quiet HEAD --
if errorlevel 1 (
    REM Commit with timestamp
    git commit -m "Auto-commit: %date% %time%"
    
    REM Push to remote repository
    git push
    
    echo.
    echo Changes pushed successfully!
) else (
    echo No changes to commit.
)

echo.
pause