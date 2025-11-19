# PowerShell script to push project to GitHub
# Make sure Git is installed before running this script

Write-Host "Initializing Git repository..." -ForegroundColor Green

# Initialize git repository
git init

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Green
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: Portfolio website with all updates"

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Green
git remote add origin https://github.com/bandisriakshaya/Bandi-Sri-Akshaya-Portfolio.git

# Set main branch
git branch -M main

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Done! Project pushed to GitHub successfully." -ForegroundColor Green


