param(
    [switch]$SkipBuild,
    [switch]$BuildOnly,
    [switch]$InvalidateOnly
)

$ErrorActionPreference = "Stop"
$bucket = "crmbus-site"
$distributionId = "E3JJH1E11RK83G"
$outDir = Join-Path $PSScriptRoot "out"

Write-Host ""
Write-Host "=== CRMBUS Deploy ===" -ForegroundColor Cyan
Write-Host ""

# --- Build ---
if (-not $SkipBuild -and -not $InvalidateOnly) {
    Write-Host "[1/3] Building site..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "Build complete." -ForegroundColor Green
    Write-Host ""

    if ($BuildOnly) {
        Write-Host "Done (build only)." -ForegroundColor Green
        exit 0
    }
} else {
    Write-Host "[1/3] Skipping build." -ForegroundColor DarkGray
}

# --- Upload to S3 ---
if (-not $InvalidateOnly) {
    Write-Host "[2/3] Uploading to S3..." -ForegroundColor Yellow
    aws s3 sync $outDir "s3://$bucket/" --delete
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Upload failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "Upload complete." -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[2/3] Skipping upload." -ForegroundColor DarkGray
}

# --- Invalidate CloudFront cache ---
Write-Host "[3/3] Invalidating CloudFront cache..." -ForegroundColor Yellow
aws cloudfront create-invalidation --distribution-id $distributionId --paths "/*" | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Invalidation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Cache invalidated." -ForegroundColor Green

Write-Host ""
Write-Host "=== Deployed! ===" -ForegroundColor Cyan
Write-Host "Site: https://www.crmbus.com" -ForegroundColor White
Write-Host ""
