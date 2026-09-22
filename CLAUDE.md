# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a vocational school course repository for **Fachinformatiker für Daten- und Prozessanalyse (FIDP)**, producing HTML learning materials for Moodle. Content covers Lernfeld 11 — **LF11c: Prozesse analysieren und gestalten**:

| Folder | Content |
|---|---|
| `LF11/<NN>_<Thema>/Seiten/` | Student lesson pages, self-check solutions, and standalone Aufgaben, per chapter — see `LF11/README.md` for the chapter list |
| `LF11/<NN>_<Thema>/Fragen/` | Moodle XML quizzes for that chapter |
| `LF11/Tests/` | Assessments/tests |
| `LF11/Summary/` | Markdown summaries + generated PDFs |
| `Templates/` | Central CSS/JS/HTML templates |
| `MoodleQuestionGenerator/` | Git submodule for Moodle XML question generation |

## Critical Moodle Constraints

Moodle silently strips or blocks these constructs — never use them:

| Forbidden | Use instead |
|---|---|
| `<link rel="stylesheet" href="...">` | CSS as template literal inside `<script>` IIFE |
| `<style>...</style>` | CSS as template literal inside `<script>` IIFE |
| `<script src="...">` (external) | Inline JS in `<script>` block |

**Only `import()` (dynamic) is allowed for external scripts** — used exclusively for the chatbot:
```js
(async () => { const { MMBBSBOT } = await import('https://ai.mmbbs.de/mmbbs-bot.js'); })();
```

All CSS rules must use `!important` — without it, Moodle's own styles override them.

## Template Architecture

`Templates/css/vt-styles.css` and `Templates/js/defaults.js` are **source files for editors only** — never referenced via `<link>` or `<script src>`. Their content is embedded inline into every HTML page. The script `_update_templates.ps1` propagates changes from these sources into all HTML pages.

When creating a new page, **always start from the template**:

`Templates/html/template.html` — single unified template for LF11

**Das gilt auch bei umfangreicher Überarbeitung einer bestehenden Seite, nicht nur beim Neuanlegen:** `template.html` ist dabei die Referenz für Feature-Parität (z. B. Nav-Menü, Chatbot-Icon-Styling, aktuelle CSS-Klassen) — die bestehende Seite wird dafür **nicht** per Write neu erzeugt, sondern per Edit gezielt um das ergänzt, was ihr gegenüber dem Template fehlt.

**After creating or rewriting any HTML page** (even if you did not edit the CSS source), always run `_update_templates.ps1` to embed the current `vt-styles.css` content. **Never manually write or copy the CSS IIFE block** — it will diverge from the canonical source and may be incomplete.

After editing `Templates/css/vt-styles.css` or `Templates/js/defaults.js`, run `_update_templates.ps1` to synchronize all pages.

**Achtung – Seiten ohne JS-Marker:** `_update_templates.ps1` injiziert `defaults.js` nur in Dateien mit dem Marker-Kommentar `<!-- JAVASCRIPT – inline -->` (oder `defaults.js` im Kommentar) vor dem `<script>`-Block. Dateien ohne diesen Marker erhalten nur das CSS-Update — die JS-Funktionen (`toggleAccordion`, `expandAllAccordions`, …) werden **nicht** eingefügt. Bei Überarbeitung einer solchen Datei gegen `template.html` prüfen, ob Folgendes fehlt, und bei Bedarf manuell nachtragen:

- `window.toggleAccordion`, `window.expandAllAccordions`, `window.collapseAllAccordions` (nötig, sobald die Seite Akkordeons bekommt)
- Nav-Menü: sowohl das HTML (`.nav-menu` / `.nav-btn` / `.nav-menu-launcher`, siehe `template.html`) als auch das Wiring (`scrollToTop/Bottom/PageUp/PageDown`, `makeDraggable`, Klick-Handler in `DOMContentLoaded`) — Seiten ohne Marker haben oft nur die CSS-Klassen, aber nie das HTML+JS dazu bekommen
- Chatbot-Icon-Styling: die `#chat-icon`/`#chat-container`-Größen- und Positions-Regeln (60×60px, `fixed`, `border-radius: 50%`, …) aus `template.html`; fehlt dieser Block, rendert der Chatbot-Button mit den unkontrollierten mmbbs-bot.js-Standardwerten (zu groß / falsch positioniert)

Zwei Wege, das nachzutragen:

- die fehlenden Funktionen/Blöcke manuell aus `Templates/js/defaults.js` bzw. `template.html` in den bestehenden `<script>`-Block kopieren, **oder**
- den alten JS-Block durch das Template-Muster ersetzen (Marker-Kommentar + `<script>`) und `_update_templates.ps1` ausführen.

Erkennungsmerkmal alter Dateien: Sie haben keinen `JAVASCRIPT`-Marker-Kommentar, sondern `document.addEventListener("DOMContentLoaded", function () {` direkt im `<script>`-Block.

**Falle beim manuellen Nachtragen:** `_update_templates.ps1` erkennt seinen Sync-Marker per Regex, die nach dem **Teilstring** `defaults.js` oder `JAVASCRIPT – inline` **irgendwo** in einem `<!-- -->`-Kommentar sucht — nicht nach einer exakten Marker-Zeile. Ein eigener erklärender Kommentar wie `<!-- ... da diese Datei keinen defaults.js-Marker hat -->` matcht diese Regex versehentlich und lässt das Skript den direkt folgenden `<script>`-Block beim nächsten Lauf durch den kompletten generischen `defaults.js`-Inhalt überschreiben (inkl. einer zweiten Chatbot-Initialisierung → doppelter Chatbot). **Eigene Kommentare in solchen Dateien dürfen die Zeichenketten `defaults.js` und `JAVASCRIPT – inline` niemals enthalten** — auch nicht in einer Erklärung, warum der Marker fehlt.

### Edit vs. Write — Pflichtregeln für Dateioperationen

| Situation | Werkzeug | Verboten |
|---|---|---|
| Bestehende Datei ändern | **Edit** (gezielte Ersetzungen) | Write auf bestehende Datei |
| Neue Datei anlegen | Write (vom Template-Inhalt kopieren) | CSS-IIFE manuell schreiben |
| CSS/JS aktualisieren | `_update_templates.ps1` ausführen | Inline-CSS im Editor bearbeiten |

**Warum:** Das Write-Tool überschreibt die gesamte Datei. Ein Agent, der eine bestehende HTML-Seite per Write neu schreibt, muss das CSS-IIFE aus dem Gedächtnis rekonstruieren — dabei entstehen zwangsläufig unvollständige CSS-Blöcke (fehlende Klassen, keine `!important`-Regeln, falsche Länge).

### Qualitätscheckliste nach jeder HTML-Dateiänderung

Nach dem Erstellen oder Bearbeiten einer HTML-Datei diese Punkte prüfen (PowerShell):

```powershell
# 1. Div-Bilanz (muss 0 ergeben)
$f = Get-Content 'datei.html' -Raw
([regex]::Matches($f,'<div')).Count - ([regex]::Matches($f,'</div>')).Count

# 2. Kein zweiter CSS-Block (muss 0 ergeben)
Select-String -Path 'datei.html' -Pattern 'style\.innerHTML' | Measure-Object | Select -Exp Count

# 3. CSS-Block vollständig (muss ≥ 650 sein)
$f = Get-Content 'datei.html'
$s = ($f | Select-String "const styles = ``").LineNumber
$e = ($f | Select-String "``;" | Where { $_.LineNumber -gt $s } | Select -First 1).LineNumber
$e - $s

# 4. toggleAccordion definiert, wenn Akkordeons vorhanden (muss OK ausgeben)
$f = Get-Content 'datei.html' -Raw
$acc = ([regex]::Matches($f,'class="accordion"')).Count
$fn  = ([regex]::Matches($f,'toggleAccordion\s*=\s*function')).Count
if ($acc -gt 0 -and $fn -eq 0) { "FEHLER: $acc Akkordeons, aber toggleAccordion nicht definiert!" } else { "OK ($acc Akkordeons, $fn Definitionen)" }
```

Kurzform: Statt manueller Checks immer `_update_templates.ps1` nach jeder Dateiänderung ausführen — das repariert den CSS-Block automatisch. **Check 4 muss manuell geprüft werden**, da `_update_templates.ps1` nur Dateien mit JS-Marker aktualisiert.

## Moodle-Kursseiten-Banner (Kursübersicht, nicht Inhaltsseiten)

Für die optische Gliederung der Moodle-Kursübersicht (Abschnitte/Aktivitätenliste) gibt es drei separate Muster unter `Templates/html/`, die **nicht** in Inhaltsseiten verwendet werden, sondern direkt über die Moodle-Weboberfläche eingefügt werden:

| Datei | Einsatzort in Moodle | Wirkung |
|---|---|---|
| `section-banner-template.html` | Abschnitts-Beschreibung (Themenformat) oder Label ganz oben im Kapitel | Ein großer Banner pro Kapitel |
| `topic-banner-template.html` | Eigenes Label-Textfeld, direkt vor eine Aktivitäten-Gruppe (Aufgabe + Lösung) gezogen | Gliedert die Aktivitätenliste in Themenblöcke |
| `activity-description-template.html` | Aktivität bearbeiten → Beschreibung → Haken "Beschreibung auf Kursseite anzeigen" | Kleiner farbiger Teaser unter dem nativen Aktivitäts-Link (Assignment/Resource), da diese Zeilen sonst rein textuell bleiben |

Diese drei Muster folgen **anderen** Regeln als die Inhaltsseiten-CSS-IIFE oben: kein `<style>`-Block, keine CSS-Klassen (Moodles `clean_text` entfernt sie), nur inline `style=""` mit einfachen Werten (Hex-Farben, `px`, `solid`) — kein `linear-gradient()`/`box-shadow`, kein `<script>`/`<link>`/externes `<img src>`. Details und Platzhalter stehen im Kommentarkopf jeder Datei.

## File Naming Conventions

| File type | Pattern |
|---|---|
| Student | `FIDP_LF11_[NN]_[Thema].html` |
| Self-check solution | `FIDP_LF11_[NN]_[Thema]_Loesung.html` |
| Moodle solution | `FIDP_LF11_[NN]_[Thema]_moodle.html` |

Storage locations: student/lesson pages and standalone Aufgaben → `LF11/<NN>_<Thema>/Seiten/` (per chapter, see `LF11/README.md` for the chapter list), tests → `LF11/Tests/`, summaries → `LF11/Summary/md/` (Markdown source) + `LF11/Summary/pdf/` (generated PDF), Moodle XML quizzes → `LF11/<NN>_<Thema>/Fragen/` (per chapter, no template files).

Every lesson requires three files: student version, self-check solution, and Moodle submission solution. The solution file (`_Loesung.html`) is **for students to self-check after completing the tasks** — it contains only solutions to regular tasks, no repeated task text, structured with `<div class="teacher-solution">` blocks. The header uses `class="header loesung"` (red background) to visually distinguish it from task pages. **It does not contain the Moodle submission solution.** The Moodle submission solution (`_moodle.html`) is a separate file with only the expected answer and grading rubric for the `📤 Moodle-Abgabe` task — this file remains teacher-only.

## CSS Classes (available in every page via IIFE)

**Semantic content boxes:** `.intro`, `.task`, `.question`, `.tech-specs`, `.warning`, `.praxis-box`, `.teacher-solution`

**Components:** `.accordion` / `.accordion-header` / `.accordion-content`, `.phases` / `.phase`, `.comparison-table`, `.connector-grid`, `.demo-button`, `.interactive-demo`, `.svg-container`

**Navigation:** `.nav-menu`, `.nav-btn`, `.nav-menu-launcher`, `.nav-divider`

**Mini-Spiele:** `.vt-memory*`, `.vt-hangman*`, `.vt-sort*` (`.vt-sort-categories` = 2 Kategorien, `.vt-sort-categories-3` = 3 Kategorien) — siehe „Mini-Spiele" unten.

## JS Helper Functions (available globally in every page)

`window.copyToClipboard(code)`, `window.sendToChatbot(message)`, `window.simulateChatbotClick()`, `window.explainCode(code)`, `window.toggleAccordion(element)`, `window.expandAllAccordions()`, `window.collapseAllAccordions()`, `window.scrollToTop()`, `window.scrollToBottom()`, `window.scrollPageUp()`, `window.scrollPageDown()`, `window.makeDraggable(element)`

## Mini-Spiele (optional, als Ergänzung zu bestehendem Quiz/Interaktiv-Element)

Drei generische Spiel-Engines stehen global zur Verfügung (`Templates/js/defaults.js`), CSS dazu in `Templates/css/vt-styles.css`. Fertiges Markup + Beispielaufruf: `Templates/html/template.html`, Abschnitt „Mini-Spiel (optional)". Pro Lektion **höchstens einen** Spieltyp einsetzen; nicht benötigte Spiel-Blöcke (Markup + zugehöriges `<script>`) komplett entfernen.

| Funktion | Parameter | Erwartetes Markup (IDs) |
|---|---|---|
| `window.vtMemoryInit(pairs)` | `[{ pair: 'A', text: '...' }, { pair: 'A', text: '...' }, ...]` (6 Paare = 12 Karten empfohlen) | `vtmem-board`, `vtmem-moves`, `vtmem-matches`, `vtmem-timer`, `vtmem-message`, `vtmem-newgame` |
| `window.vtHangmanInit(words)` | `[{ word: 'BEGRIFF', hint: '...' }, ...]` (Wort in GROSSBUCHSTABEN, nur A–Z, keine Umlaute) | `vthang-canvas` (220×180), `vthang-score`, `vthang-wrong`, `vthang-words`, `vthang-hint-text`, `vthang-word`, `vthang-message`, `vthang-keyboard`, `vthang-newword` |
| `window.vtSortInit(terms, categoryIds)` | `terms = [{ term: '...', category: 'catId' }, ...]`, `categoryIds = ['catId', ...]` (2 oder 3 Kategorien) | `vtsort-pool`, `vtsort-score`, `vtsort-timer`, `vtsort-remaining`, `vtsort-message`, `vtsort-start`, je Kategorie `vtsort-cat-{catId}` (mit `data-category="{catId}"`) + `vtsort-dropped-{catId}` |

Aufruf jeweils in einem eigenen `<script>`-Tag **direkt nach dem Spiel-Markup** (nicht in `DOMContentLoaded`) — die Elemente müssen zum Zeitpunkt des Aufrufs bereits im DOM stehen. Bei mehreren Instanzen auf einer Seite (nicht empfohlen) sind die IDs fest verdrahtet und müssten manuell dedupliziert werden.

## Didactic Requirements for Every Lesson Page

Each page must include:
1. A **real-world Daten- und Prozessanalyse scenario** as context (Prozessanalyse, Datenmodellierung, Geschäftsprozessoptimierung im Unternehmen)
2. Tasks following the **6-step action model**: Informieren → Planen → Entscheiden → Ausführen → Kontrollieren → Bewerten
3. **Exactly one Arbeitsauftrag** (`.task` block, without `.moodle-upload`) per lesson — sub-tasks (a/b/c) within that block may use different social forms; never create two separate `.task` blocks
4. At least **one interactive element** (self-test with immediate feedback, interactive calculation, drag-and-drop, etc.) — vanilla JS only, no frameworks
5. At least **3–5 Kontrollfragen** per section
6. A **Moodle-Abgabe task** at the end, with class `.moodle-upload` and heading `📤 Moodle-Abgabe`
7. A separate **`_moodle.html`** file (not in the teacher version) with the expected answer and grading rubric for the Moodle-Abgabe task

## Leading Documentation

For any conflict between files, this priority order applies:
1. `.github/instructions/lernmaterialien.instructions.md` — leading source for all content rules, didactics, quality criteria
2. `CLAUDE.md` (this file) — authoritative for template architecture and CSS/JS update workflow
3. `LF11/README.md` — topic structure, file naming, progress
4. `FIDP_Lernfeld_11c_Rahmenlehrplan_Zusammenfassung.md` / `FIDP_LF11c_Pruefungskatalog_Zusammenfassung.md` — curricular content scope and exam-relevant focus for LF11c

Open tasks: `ToDo.md` (project root)

## MoodleQuestionGenerator Submodule

`MoodleQuestionGenerator/` is a git submodule. Its leading documents (in priority order):
1. `.github/instructions/questions.instructions.md`
2. `SKILL.md`
3. `moodle-xml-struktur-referenz.md`
4. `templates/README.md`

Generated files go into `MoodleQuestionGenerator/res/` (XML + HTML preview pairs).
