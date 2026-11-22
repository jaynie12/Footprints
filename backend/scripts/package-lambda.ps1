$ErrorActionPreference = 'Stop'

$backendRoot = Split-Path -Parent $PSScriptRoot
$distPath = Join-Path $backendRoot 'dist'
$archivePath = Join-Path $backendRoot 'lambda.zip'

if (-not (Test-Path -LiteralPath $distPath -PathType Container)) {
    throw "Build output was not found: $distPath"
}

Compress-Archive -Path (Join-Path $distPath '*') -DestinationPath $archivePath -Force
