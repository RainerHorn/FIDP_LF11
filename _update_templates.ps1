<#
.SYNOPSIS
    Propagiert Templates/css/vt-styles.css und Templates/js/defaults.js
    in alle HTML-Lernseiten unter LF*/Seiten/ und Templates/html/.

.DESCRIPTION
    CSS-Update:
      Jede HTML-Seite mit einem IIFE-CSS-Block (const styles = `...`)
      bekommt den aktuellen Inhalt von vt-styles.css eingebettet.
      Quelle der Wahrheit: Templates/css/vt-styles.css

    JS-Update:
      Nur Seiten, die mit dem neuen Template (CSS-INJECTION-Kommentar)
      erstellt wurden, erhalten auch ein JS-Update aus defaults.js.
      Ältere Seiten (LF6, LF1) mit eigenem JS werden nur beim CSS angefasst.

.PARAMETER DryRun
    Zeigt welche Dateien geändert würden, ohne etwas zu schreiben.

.EXAMPLE
    .\_update_templates.ps1
    .\_update_templates.ps1 -DryRun
#>

[CmdletBinding()]
param(
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ─── Pfade ────────────────────────────────────────────────────────────────────
$root      = $PSScriptRoot
$cssSource = Join-Path $root 'Templates\css\vt-styles.css'
$jsSource  = Join-Path $root 'Templates\js\defaults.js'

foreach ($src in $cssSource, $jsSource) {
    if (-not (Test-Path $src)) {
        Write-Error "Quelldatei nicht gefunden: $src"
        exit 1
    }
}

# ─── Quellinhalte lesen ───────────────────────────────────────────────────────
$cssContent = [System.IO.File]::ReadAllText($cssSource, [System.Text.Encoding]::UTF8).TrimEnd()
$jsContent  = [System.IO.File]::ReadAllText($jsSource,  [System.Text.Encoding]::UTF8).TrimEnd()

# ─── Zieldateien ──────────────────────────────────────────────────────────────
$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter '*.html' | Where-Object {
    # Matcht sowohl die alte flache Ablage (LF11\Seiten\...) als auch die
    # neue Kapitelstruktur (LF11\<NN>_<Thema>\Seiten\...).
    $_.FullName -match '\\LF\d+\\(?:[^\\]+\\)?Seiten\\|\\Templates\\html\\'
}

# ─── Zähler ───────────────────────────────────────────────────────────────────
$cntCss     = 0
$cntJs      = 0
$cntUnchanged = 0
$noIife     = [System.Collections.Generic.List[string]]::new()

Write-Host "=== _update_templates.ps1 ===" -ForegroundColor Cyan
if ($DryRun) { Write-Host "(DRY-RUN – keine Dateien werden geändert)" -ForegroundColor Yellow }
Write-Host "CSS-Quelle: $cssSource"
Write-Host "JS-Quelle:  $jsSource"
Write-Host "Seiten:     $($htmlFiles.Count) HTML-Dateien gefunden"
Write-Host ""

# ─── Hilfsfunktion: String-IndexOf ohne Regex ────────────────────────────────
function Replace-BetweenMarkers {
    param(
        [string]$Text,
        [string]$OpenMarker,   # z.B. "const styles = ``"
        [string]$CloseMarker,  # z.B. "``"
        [string]$NewContent,
        [string]$Indent = ''
    )
    $startOuter = $Text.IndexOf($OpenMarker)
    if ($startOuter -lt 0) { return $null }           # Marker nicht gefunden
    $startInner = $startOuter + $OpenMarker.Length
    $endInner   = $Text.IndexOf($CloseMarker, $startInner)
    if ($endInner -lt 0) { return $null }             # Schließender Marker fehlt

    $before  = $Text.Substring(0, $startInner)
    $after   = $Text.Substring($endInner)
    return $before + "`n" + $NewContent + "`n" + $Indent + $after
}

# ─── Jede Seite verarbeiten ──────────────────────────────────────────────────
foreach ($f in ($htmlFiles | Sort-Object FullName)) {

    $html    = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $newHtml = $html
    $cssHit  = $false
    $jsHit   = $false

    # --- 1. CSS-Update (alle Seiten mit IIFE-Pattern) ---
    # Marker: "const styles = `"   Schließer: "` " (Backtick direkt nach CSS)
    # Wir suchen den ERSTEN Treffer, damit chatStyles-Block unberührt bleibt.
    $cssOpen  = 'const styles = `'
    $backtick = '`'

    $posOpen = $newHtml.IndexOf($cssOpen)
    if ($posOpen -ge 0) {
        $posContent = $posOpen + $cssOpen.Length
        $posClose   = $newHtml.IndexOf($backtick, $posContent)
        if ($posClose -ge 0) {
            $indent  = '            '   # 12 Leerzeichen (Einrückung vor schließendem Backtick)
            $before  = $newHtml.Substring(0, $posContent)
            $after   = $newHtml.Substring($posClose)
            $newHtml = $before + "`n" + $cssContent + "`n" + $indent + $after
            $cssHit  = $true
        }
    } else {
        $noIife.Add($f.Name) | Out-Null
    }

    # --- 2. JS-Update (nur Seiten mit Template-Marker) ---
    # Marker: HTML-Kommentar mit "JAVASCRIPT" + nachfolgendes <script>-Tag
    $jsMarker = 'JAVASCRIPT'
    # Regex-Match für den spezifischen Template-Marker (enthält "defaults.js" oder "JAVASCRIPT – inline")
    # Vermeidet false positives bei anderen JS-Kommentaren im HTML-Body.
    $jsMarkerMatch = [System.Text.RegularExpressions.Regex]::Match(
        $newHtml,
        '<!--[\s\S]{0,300}?(?:defaults\.js|JAVASCRIPT\s*[–-]\s*inline)[\s\S]{0,300}?-->',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
    if ($jsMarkerMatch.Success) {
        # Finde das erste <script> NACH dem Marker-Kommentar
        $afterMarker = $jsMarkerMatch.Index + $jsMarkerMatch.Length
        $scriptOpen  = $newHtml.IndexOf('<script>', $afterMarker)
        if ($scriptOpen -ge 0) {
            $scriptClose = $newHtml.IndexOf('</script>', $scriptOpen + 8)
            if ($scriptClose -ge 0) {
                $innerStart = $scriptOpen + '<script>'.Length
                $before  = $newHtml.Substring(0, $innerStart)
                $after   = $newHtml.Substring($scriptClose)
                $newHtml = $before + "`n        " + $jsContent + "`n    " + $after
                $jsHit   = $true
            }
        }
    }

    # --- Auswertung ---
    if ($newHtml -ne $html) {
        $detail = if ($cssHit -and $jsHit) { 'CSS+JS' } elseif ($cssHit) { 'CSS   ' } else { 'JS    ' }
        $prefix = if ($DryRun) { '[DRY]' } else { '[OK] ' }
        Write-Host "$prefix $detail  $($f.Name)" -ForegroundColor Green
        if (-not $DryRun) {
            [System.IO.File]::WriteAllText($f.FullName, $newHtml, [System.Text.Encoding]::UTF8)
        }
        if ($cssHit) { $cntCss++ }
        if ($jsHit)  { $cntJs++  }
    } else {
        Write-Host "[--]        $($f.Name)" -ForegroundColor DarkGray
        $cntUnchanged++
    }
}

# ─── Zusammenfassung ─────────────────────────────────────────────────────────
Write-Host ""
Write-Host "=== Zusammenfassung ===" -ForegroundColor Cyan
Write-Host "CSS aktualisiert : $cntCss Seiten"
Write-Host "JS aktualisiert  : $cntJs Seiten"
Write-Host "Unverändert      : $cntUnchanged Seiten"
if ($noIife.Count -gt 0) {
    Write-Host ""
    Write-Host "Kein IIFE-CSS-Block gefunden (kein CSS-Update moglich):" -ForegroundColor Yellow
    foreach ($name in ($noIife | Sort-Object)) {
        Write-Host "  - $name" -ForegroundColor DarkYellow
    }
    Write-Host "  → Diese Seiten verwenden ggf. ein anderes CSS-Einbettungsformat."
}
Write-Host ""
if ($DryRun) {
    Write-Host "DRY-RUN abgeschlossen. Zum tatsachlichen Update ohne -DryRun ausfuhren." -ForegroundColor Yellow
} else {
    Write-Host "Update abgeschlossen." -ForegroundColor Green
}
