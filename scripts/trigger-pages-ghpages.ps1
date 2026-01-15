Set-Location -Path "C:\Users\ahsaa\Downloads\365\calendar-app-mobile\.gh-pages-temp"
Write-Host "Creating empty commit to trigger Pages workflow..."
git commit --allow-empty -m "ci: trigger pages deploy"
Write-Host "Pushing gh-pages..."
git push origin gh-pages
Write-Host "Done"