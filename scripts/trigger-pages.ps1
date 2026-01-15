Set-Location -Path "C:\Users\ahsaa\Downloads\365\calendar-app-mobile"
Write-Host "Staging workflow file..."
git add .github/workflows/deploy-pages.yml
if ((git status --porcelain) -ne '') {
  git commit -m 'ci: add Pages deployment workflow to deploy gh-pages branch'
} else {
  Write-Host "No changes to commit"
}
Write-Host "Pushing main..."
git push origin main
Write-Host "Done"