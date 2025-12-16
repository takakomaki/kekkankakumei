param(
    [Parameter(Mandatory = $false)]
    [string]$Path = ".",

    [Parameter(Mandatory = $false)]
    [string]$OutputFile = ".\\memory\\repo_tree.md",

    [Parameter(Mandatory = $false)]
    [switch]$ExcludeGit = $true
)

$ErrorActionPreference = "Stop"

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = $utf8NoBom
$OutputEncoding = $utf8NoBom

$resolved = (Resolve-Path -LiteralPath $Path).Path
$bt = [char]96

$treeScript = Join-Path $PSScriptRoot "tree_utf8.ps1"
if (-not (Test-Path -LiteralPath $treeScript)) {
    throw "Missing script: $treeScript"
}

# Generate tree lines in-memory (do not create TREE_UTF8.txt here)
$treeLines = & $treeScript -Path $resolved -OutputFile "" -ExcludeGit:$ExcludeGit
$treeText = ($treeLines -join [Environment]::NewLine).TrimEnd([char]13, [char]10)

$outDir = Split-Path -Parent $OutputFile
if (-not [string]::IsNullOrWhiteSpace($outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# リポジトリ構造ツリー（UTF-8 / 文字化けなし）") | Out-Null
$lines.Add("") | Out-Null
$lines.Add("このファイルは " + $bt + $resolved + $bt + " のフォルダ・ファイル構造をツリー化したものです。") | Out-Null
$lines.Add("") | Out-Null
$lines.Add("## 生成方法") | Out-Null
$lines.Add("") | Out-Null
$lines.Add('```powershell') | Out-Null
$lines.Add("pwsh -NoProfile -File .\\tools\\generate_repo_tree_md.ps1 -Path . -OutputFile .\\memory\\repo_tree.md -ExcludeGit") | Out-Null
$lines.Add('```') | Out-Null
$lines.Add("") | Out-Null
$lines.Add('## ツリー（`.git` 除外）') | Out-Null
$lines.Add("") | Out-Null
$lines.Add('```text') | Out-Null
$lines.Add($treeText) | Out-Null
$lines.Add('```') | Out-Null
$lines.Add("") | Out-Null

$md = ($lines -join [Environment]::NewLine)
Set-Content -LiteralPath $OutputFile -Value $md -Encoding utf8NoBOM
Write-Host ("Wrote: " + $OutputFile)


