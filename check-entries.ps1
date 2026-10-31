Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead('arovia-website-cloudflare.zip')
foreach ($e in $z.Entries) {
    if ($e.FullName -like "*style.css*" -or $e.FullName -like "*main.js*") {
        Write-Host "Entry: [$($e.FullName)]"
    }
}
$z.Dispose()
