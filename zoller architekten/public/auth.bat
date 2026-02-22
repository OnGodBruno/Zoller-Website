@echo off

cd /d //server/files/Homepage/Website/Zoller-Website

git add .

git diff-index --quiet HEAD --

if errorlevel 1 (

	git commit -m "Auto-commit: %date% %time%"
    
	git push origin master
    
	echo Changes pushed successfully!
) else (
    
	echo No changes to commit.
)

pause