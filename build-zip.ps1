Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = (Resolve-Path "dist").Path
$zipPath = Join-Path (Get-Location).Path "arovia-website-cloudflare.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
    Write-Host "Removed existing zip archive."
}

Write-Host "Compressing contents of dist/ into $zipPath ..."
[System.IO.Compression.ZipFile]::CreateFromDirectory($sourceDir, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$zipItem = Get-Item $zipPath
$sizeMB = [math]::Round($zipItem.Length / 1MB, 2)
Write-Host "Created arovia-website-cloudflare.zip successfully! Size: $sizeMB MB ($($zipItem.Length) bytes)"
