---
applyTo: "**/Seiten/**/*.html, **/Tests/**/*.html"
---

# Copilot Instructions – FIDP Lernmaterialien (LF11)

## Zweck
Diese Datei steuert die Erstellung und Bearbeitung von HTML-Lernmaterialien für **LF11c: Prozesse analysieren und gestalten** im Moodle-Kurs für Fachinformatiker für Daten- und Prozessanalyse (FIDP).  
Sie gilt workspace-weit und ist die **führende Instruktionsquelle** für alle Lernmaterial-Anfragen.

> **Architektur-Referenz:** Für alle Fragen zur Template-Konsolidierung, CSS/JS-Update-Workflow und Dateistruktur gilt **`CLAUDE.md`** im Workspace-Root als führendes Dokument. Offene Aufgaben stehen in **`ToDo.md`** im Workspace-Root.

**Lernfeld-spezifische Informationen** (Themenstruktur, Dateinamenskonvention, Fortschritt) stehen in [`LF11/README.md`](../../LF11/README.md).

**Fachlich-curriculare Referenzen** (für Inhalt, Umfang und Prüfungsrelevanz jeder Lerneinheit maßgeblich):
- [`FIDP_Lernfeld_11c_Rahmenlehrplan_Zusammenfassung.md`](../../FIDP_Lernfeld_11c_Rahmenlehrplan_Zusammenfassung.md) – Rahmenlehrplan-Zusammenfassung für LF11c: verbindliche Kompetenzen und Inhalte
- [`FIDP_LF11c_Pruefungskatalog_Zusammenfassung.md`](../../FIDP_LF11c_Pruefungskatalog_Zusammenfassung.md) – Prüfungskatalog-Zusammenfassung: prüfungsrelevante Schwerpunkte für LF11c

Beim Erstellen oder Bearbeiten von Materialien **immer zuerst** die README sowie die beiden fachlich-curricularen Referenzen lesen (Themenstruktur, verbindliche Inhalte, Prüfungsrelevanz).

---

## 1. Template-Verwendung (PFLICHT)

**IMMER** das einheitliche Template als Basis verwenden:

`Templates/html/template.html` – gilt für LF11

### ⚠️ Moodle-Pflichtregeln für CSS und JavaScript

Moodle entfernt oder blockiert folgende Konstrukte **vollständig und stillschweigend**:

| Konstrukt | Moodle-Verhalten | Korrekte Alternative |
|---|---|---|
| `<link rel="stylesheet" href="...">` | **Wird entfernt** | CSS als Template-Literal im `<script>`-IIFE |
| `<style>...</style>` | **Wird entfernt** | CSS als Template-Literal im `<script>`-IIFE |
| `<script src="...">` (extern) | **Wird blockiert** | JS inline im `<script>`-Block |
| `<script>`-Inline-Block | ✅ Erlaubt | Standardmethode für CSS + JS |
| `import(...)` (dynamisch) | ✅ Erlaubt | **Einzige** Methode für externe Module (Chatbot) |

**`Templates/css/vt-styles.css` und `Templates/js/defaults.js` sind Quelldateien, keine deployten Assets.**  
Sie dienen Editor-Komfort (Syntax-Highlighting, Kommentare) und werden **niemals per `<link>` oder `<script src>` eingebunden**.  
Das Script `_update_templates.ps1` überträgt Änderungen aus diesen Quelldateien in den IIFE-Block aller HTML-Seiten.

- Neue Seiten immer aus `Templates/html/template.html` ableiten.
- Nach Änderungen an CSS oder JS immer `_update_templates.ps1` ausführen, um alle Seiten zu synchronisieren.

**Vollständige Liste verfügbarer CSS-Klassen:**

*Layout & Struktur:*
- `.container`, `.header`, `.content`, `.section`

*Semantische Inhaltsboxen:*
- `.intro` – Einführungstexte (grauer Hintergrund)
- `.task` – Aufgabenblöcke (grüner Hintergrund)
- `.question` – Frageblöcke (gelber Hintergrund)
- `.tech-specs` – Technische Spezifikationen (blauer Hintergrund)
- `.warning` – Warnhinweise (roter Hintergrund)
- `.praxis-box` – Praxishinweise (grüner Hintergrund)
- `.teacher-solution` – Musterlösungen in Lösungsseiten (roter Hintergrund)
- `.header.loesung` – Roter Seitenkopf für Lösungsseiten (Klasse an `.header` div anhängen)

*Komponenten:*
- `.accordion` – Auf-/Zuklappbare Abschnitte
- `.phases` / `.phase` – Grid-Layout für Phasenübersichten mit Hover-Effekt
- `.comparison-table` – Responsive Vergleichstabellen
- `.connector-grid` – Steckverbinder-Raster
- `.demo-button` / `.interactive-demo` – Demo- und Interaktionselemente
- `.svg-container` – SVG-Einbettungen

*Navigation:*
- `.nav-menu`, `.nav-btn`, `.nav-menu-launcher`, `.nav-divider`

---

## 2. Handlungsorientierter Unterricht (PFLICHT)

Alle Lernmaterialien folgen den Prinzipien der **SchuCu-BBS Leitlinie 2024**.

### 2a) Vollständige Handlung – 6-Stufen-Modell
1. **Informieren** – Situation erfassen, Problemstellung verstehen
2. **Planen** – Lösungsweg entwickeln, Arbeitsschritte festlegen
3. **Entscheiden** – Beste Lösung auswählen, Begründung liefern
4. **Ausführen** – Praktische Umsetzung der geplanten Lösung
5. **Kontrollieren** – Ergebnis überprüfen, Qualität bewerten
6. **Bewerten** – Reflexion des Lernprozesses, Verbesserungsvorschläge

### 2b) Situationsbezug
- Realitätsnahe Arbeitsaufträge aus der Daten- und Prozessanalyse
- Praxisrelevante Problemstellungen (Geschäftsprozessmodellierung, Datenmodellierung, Prozessoptimierung im Unternehmen usw.)
- Berufstypische Handlungssituationen des **Fachinformatikers für Daten- und Prozessanalyse**

### 2c) Kompetenzorientierung
- **Fachkompetenz**: Technisches Wissen und Fertigkeiten
- **Methodenkompetenz**: Problemlösungsstrategien
- **Sozialkompetenz**: Teamarbeit und Kommunikation
- **Personalkompetenz**: Selbstständigkeit und Verantwortungsbewusstsein

---

## 3. Inhaltliche Gestaltung

### Aufgabentypen
- **Situative Aufgaben**: Reale Szenarien aus Prozessanalyse-Projekten in Unternehmen
- **Projektaufgaben**: Komplexe, mehrstufige Problemstellungen
- **Fallstudien**: Analyse von Geschäftsprozessen und Datenmodellen
- **Theoretische Vertiefung**: Fachliche Grundlagen und Konzepte

### Sozialformen (IMMER variieren)
- **Einzelarbeit** – Individuelle Reflexion, persönliche Lernprozesse
- **Tandemarbeit** – Partnerarbeit für Diskussion und Meinungsaustausch
- **Gruppenarbeit** – Teamaufgaben (3–4 Personen) für komplexe Problemstellungen
- **Plenum** – Klassengespräche, Präsentationen, gemeinsame Reflexion
- **Think-Pair-Share** – Erst einzeln, dann Partner, dann Plenum
- **Expertenmethode** – Spezialisierung und Wissensvermittlung
- **Rollenspiele** – Kundengespräche, Beratungssituationen
- **Stationenlernen** – Verschiedene Aspekte an unterschiedlichen Arbeitsplätzen

### Berufsbezogene Kontexte (IMMER verwenden)
- Geschäftsprozessanalyse und -modellierung (z. B. BPMN), Prozessoptimierung
- Datenmodellierung und Datenbankdesign im Unternehmenskontext
- Anforderungsanalyse, Kennzahlenauswertung, Qualitätsmanagement

### Anzahl der Arbeitsaufträge pro Lerneinheit

> **Regel**: Pro Lerneinheit gibt es **genau einen Arbeitsauftrag** (`.task`-Block ohne `.moodle-upload`) plus die Pflicht-Moodle-Abgabe am Ende.  
> Mehrere separate Arbeitsaufträge sind **nicht zulässig**. Sollen verschiedene Sozialformen oder Phasen abgedeckt werden, werden diese als benannte Teilaufgaben (a, b, c …) **innerhalb des einen Arbeitsauftrags** gegliedert.

> **Zeitbudget**: Der Arbeitsauftrag (alle Teilaufgaben a/b/c … zusammengerechnet) ist auf **ca. 30 Minuten** Bearbeitungszeit auszulegen. Bei der Erstellung/Überarbeitung die angegebenen Zeitrahmen der Teilaufgaben aufsummieren und prüfen, ob die Summe in diese Größenordnung passt – bei deutlicher Überschreitung Teilaufgaben kürzen, zusammenlegen oder als optionale Vertiefung (Akkordeon) auslagern statt in den zeitgebundenen Arbeitsauftrag zu packen. Die separate Moodle-Abgabe (§8) hat ihr eigenes, ebenfalls ca. 30-minütiges Zeitbudget und zählt nicht mit.

### Kein Vorgriff auf spätere Kapitel (Sequenzprinzip)

Jede Lerneinheit darf **ausschließlich Wissen voraussetzen und anwenden, das in diesem oder einem früheren Kapitel bereits eingeführt wurde**.

**Verboten:**
- Begriffe, Verfahren oder Konzepte aus späteren Kapiteln verwenden, erklären oder voraussetzen – auch nicht „zur Veranschaulichung" oder als „Ausblick in der Aufgabe"
- Aufgaben stellen, die ohne das Wissen eines späteren Kapitels nicht lösbar sind

**Erlaubt:**
- Einen neutralen **Ausblick** als Ankündigung am Ende einer Lerneinheit: „Wie diese Binärdarstellung für die Subnetz-Berechnung genutzt wird, lernen Sie in Kapitel X."
- Vorwissen aus früheren Kapiteln gezielt aktivieren

**Warum:** Lernende können Aufgaben nur dann sinnvoll bearbeiten, wenn sie das benötigte Konzeptwissen bereits besitzen. Ein Vorgriff erzeugt Verwirrung und vermittelt das Gefühl, den Stoff nicht zu verstehen – obwohl das Thema noch gar nicht dran war.

**Prüfung vor jeder Lerneinheit:** Kann ich alle Aufgaben und Erklärungen dieser Seite verstehen, wenn ich nur die vorangegangenen Kapitel kenne? Falls nicht → Inhalt entfernen oder in das richtige Kapitel verschieben.

**Konkretes Beispiel:** Eine Lerneinheit zur Ist-Prozessaufnahme darf grundlegende Notationselemente (z. B. Start-/Endereignis, Aktivität) verwenden – aber keine Soll-Prozessoptimierung oder Kennzahlenanalyse voraussetzen, wenn diese erst in einem späteren Kapitel eingeführt werden.

---

### Rechenaufgaben – Rechenweg ist Pflicht

Bei **jeder Aufgabe mit numerischer Berechnung** (Zahlensystem-Umrechnung, Pegelberechnung, IP-Adressierung, Bit-Operationen, Leistungsrechnung, …) muss der **Rechenweg explizit eingefordert werden** – sowohl in der Aufgabenstellung als auch in der Lösung.

**Formulierungsbeispiele für die Aufgabe:**
- „Zeigen Sie den vollständigen Rechenweg (z. B. Subtraktionsverfahren Schritt für Schritt)."
- „Notieren Sie alle Zwischenschritte."
- „Stellen Sie jeden Rechenschritt dar."

**Warum:**  
Nur wer den Weg zeigt, beweist, dass er das Verfahren beherrscht – und nicht zufällig das richtige Ergebnis hingeschrieben hat. Alleinige Ergebnisse werden in der Moodle-Abgabe **nicht** als Vollpunkte gewertet.

**Regeln für die Lösungsseite (`_Loesung.html`):**  
Musterlösungen von Rechenaufgaben müssen **alle Zwischenschritte** enthalten, nicht nur das Ergebnis.

**Regeln für die Moodle-Abgabe (`_moodle.html`):**  
Das Bewertungsraster weist Punkte **explizit** für Ergebnis und Rechenweg getrennt aus (z. B. „1 P Rechenweg nachvollziehbar, 1 P Ergebnis korrekt").

### HTML-Grundstruktur einer Lerneinheit
```html
<div class="section">
    <h2>Berufsbezogener Kontext</h2>
    <!-- Realistisches Szenario aus der Daten- und Prozessanalyse -->

    <h2>Situationsbeschreibung</h2>
    <!-- Detaillierte Beschreibung der Arbeitssituation -->

    <!-- NUR EIN Arbeitsauftrag pro Lerneinheit (ohne Moodle-Abgabe) -->
    <div class="task">
        <h3>Arbeitsauftrag</h3>
        <p><strong>Sozialform:</strong> [Einzelarbeit / Tandemarbeit / Gruppenarbeit (3–4 Personen) / Plenum]</p>
        <p><strong>Methode:</strong> [z. B. Think-Pair-Share, Expertenmethode, Rollenspiel]</p>
        <!-- Konkrete Handlungsaufforderung.
             Mehrere Teilaufgaben als a), b), c) möglich – aber alles in DIESEM einen Block. -->
    </div>

    <div class="question">
        <h3>Kontrollfragen</h3>
        <!-- Mindestens 3–5 Fragen pro Abschnitt -->
    </div>

    <div class="tech-specs">
        <h3>Technische Hinweise</h3>
        <!-- Relevante Fachinfos und Spezifikationen -->
    </div>
</div>
```

---

## 4. Sprache und Stil

- **Direkte Ansprache**: „Sie" verwenden (förmlich)
- **Klare Arbeitsaufträge**: Handlungsverben nutzen (analysieren, entwickeln, bewerten, planen)
- **Fachsprache**: Korrekte Verwendung von Fachbegriffen der Daten- und Prozessanalyse
- **Verständlichkeit**: Komplexe Sachverhalte strukturiert erklären

---

## 5. Chatbot-Integration

Der integrierte Chatbot wird per **dynamischem `import()`** geladen – dies ist die **einzige erlaubte Methode** für externe Skripte in Moodle.

```js
// Am Ende des <script>-Blocks (inline, kein <script src>):
(async () => {
    const { MMBBSBOT } = await import('https://ai.mmbbs.de/mmbbs-bot.js');
})();
```

- **Funktion**: Lernunterstützung – keine fertigen Lösungen
- **Rolle**: Fachexperte für Daten- und Prozessanalyse
- **Verhalten**: Erklärungen, Denkanstöße, keine Komplettlösungen
- Titel, Host und Fachbereich-Konfiguration sind als Quelldatei in `Templates/js/defaults.js` hinterlegt und werden per `_update_templates.ps1` inline in jede Seite übertragen

**Verfügbare JS-Hilfsfunktionen** (aus `defaults.js`, inline in jeder Seite):

| Funktion | Zweck |
|---|---|
| `window.copyToClipboard(code)` | Code in Zwischenablage kopieren |
| `window.sendToChatbot(message)` | Nachricht an Chatbot senden |
| `window.simulateChatbotClick()` | Chatbot-Button simulieren |
| `window.explainCode(code)` | Code-Erklärung über Chatbot anfordern |
| `window.toggleAccordion(element)` | Accordion auf-/zuklappen |
| `window.expandAllAccordions()` | Alle Accordions öffnen |
| `window.collapseAllAccordions()` | Alle Accordions schließen |
| `window.scrollToTop()` / `scrollToBottom()` | Seite scrollen |
| `window.scrollPageUp()` / `scrollPageDown()` | Seitenweise scrollen |
| `window.makeDraggable(element)` | Element draggable machen |

---

## 6. Dateibenennung und Organisation

**Namenskonvention für HTML-Dateien:**
- Format: `FIDP_LF11_[NN]_[Thema].html`  
- Lernerseitige Datei: `FIDP_LF11_01_Prozessaufnahme.html`  
- Lösungsseite: `FIDP_LF11_01_Prozessaufnahme_Loesung.html`
- Keine Leerzeichen; Umlaute beibehalten oder durch ae/oe/ue ersetzen

**Ablageorte:**
- Lernerseiten → `LF11/Seiten/`
- Tests/Quizze → `LF11/Tests/`
- Zusammenfassungen → `LF11/Summary/`

### 6a) Schülerversion, Lösungsseite und Moodle-Abgabe-Lösung (PFLICHT)

Zu **jeder Lerneinheit** müssen **drei Dateien** erstellt werden:

| Datei | Muster | Zielgruppe | Inhalt |
|---|---|---|---|
| Schülerversion | `FIDP_LF11_[NN]_[Thema].html` | Schüler | Vollständige Lerneinheit mit Aufgaben, interaktiven Elementen und Moodle-Abgabe |
| Lösungsseite | `FIDP_LF11_[NN]_[Thema]_Loesung.html` | Schüler (nach Bearbeitung) | **Nur Lösungen zu den regulären Aufgaben** – kein wiederholter Aufgabentext; **keine** Musterlösung der Moodle-Abgabe |
| Moodle-Lösung | `FIDP_LF11_[NN]_[Thema]_moodle.html` | Lehrkraft | **Ausschließlich Musterlösung der Moodle-Abgabe** (Erwartungshorizont, Bewertungsraster) |

> **Konzept:** Die Lösungsseite dient der **Selbstüberprüfung** durch die Schüler*innen nach eigener Bearbeitung. Sie ist durch einen roten Seitenkopf (`.header.loesung`) klar von den Aufgabenseiten unterscheidbar. Der Badge `✅ Lösung – zur eigenen Überprüfung · Erst nach Bearbeitung öffnen` ersetzt die frühere "Lehrerversion"-Kennzeichnung.

**Regeln für die Lösungsseite (`_Loesung`):**
- **Kein Copy-Paste** des Aufgaben- oder Erklärungstexts aus der Schülerversion
- Nur `<div class="teacher-solution">`-Blöcke mit den erwarteten Antworten/Musterlösungen der regulären Aufgaben
- Kurze Überschrift pro Aufgabe reicht als Referenz (z. B. „Lösung zu Aufgabe 3")
- Ggf. Hinweise zu Bewertungskriterien und typischen Schülerfehlern
- Am Seitenanfang: `✅ <strong>Lösung</strong> – zur eigenen Überprüfung · Erst nach Bearbeitung öffnen`
- Header-Div: `class="header loesung"` (roter Hintergrund via `.header.loesung` CSS)
- **Enthält NICHT** die Musterlösung der Moodle-Abgabe → diese steht in `_moodle.html`

**Regeln für die Moodle-Abgabe-Lösung (`_moodle`):**
- Enthält **ausschließlich** die Musterlösung zur `📤 Moodle-Abgabe`
- Struktur: Aufgabenstellung (kurze Wiederholung) + Erwartungshorizont + Bewertungsraster
- Am Seitenanfang: **„📤 Moodle-Abgabe – Musterlösung"** als Überschrift + `🔒 NUR FÜR LEHRKRÄFTE` Badge
- CSS-Klasse `.teacher-solution` für den Inhalt
- Dateiname: `FIDP_LF11_[NN]_[Thema]_moodle.html`
- Ablagepfad: wie Schüler- und Lösungsseite in `LF11/Seiten/`

**HTML-Grundstruktur der Lösungsseite:**
```html
<div class="warning" style="text-align:center; font-size:1.1rem; background:#fef2f2; border:2px solid #dc2626; padding:1rem; margin:0.5rem;">
    ✅ <strong>Lösung</strong> – zur eigenen Überprüfung · Erst nach Bearbeitung öffnen
</div>
<div class="header loesung">
    <h1>[Thema der Lerneinheit]</h1>
</div>
<div class="content">
    <div class="teacher-solution">
        <h3>Lösung: [Aufgabentitel]</h3>
        <!-- Musterlösung, Erwartungshorizont, Bewertungshinweise -->
    </div>
    <!-- Weitere teacher-solution-Blöcke für jede Aufgabe -->
</div>
```

---

## 7. Interaktives Lernen und Ausprobieren (PFLICHT)

Jede Lerneinheit MUSS mindestens **ein interaktives Element** enthalten, das aktives Ausprobieren ermöglicht.

### Erlaubte interaktive Elemente
- **Selbsttests mit Sofort-Feedback** – Multiple-Choice oder Wahr/Falsch per reinem JavaScript (kein externes Framework)
- **Aufklappbare Lösungshinweise** – `<details>`/`<summary>` für schrittweise Hilfe
- **Interaktive Berechnungen** – Eingabefelder + JS-Berechnung (Pegel, Entfernungen, Leistungen …)
- **Drag-and-Drop-Zuordnungen** – Bauteile, Signalwege, Steckverbinder zuordnen
- **Simulierte Entscheidungsbäume** – „Was passiert, wenn …?"-Szenarien mit Verzweigungen
- **Code-to-Clipboard / Explain-Code** – Chatbot-gestützte Erklärung eines Technik-Snippets

### HTML-Beispiel: Selbsttest mit Sofort-Feedback
```html
<div class="task" id="interaktiv-test">
    <h3>&#x1F9EA; Ausprobieren</h3>
    <p>Welcher Pegel entspricht einer Halbierung der Leistung?</p>
    <button onclick="checkAnswer('a')">a) –3 dB</button>
    <button onclick="checkAnswer('b')">b) –6 dB</button>
    <button onclick="checkAnswer('c')">c) –10 dB</button>
    <p id="feedback" style="margin-top:1rem;font-weight:bold;"></p>
    <script>
        function checkAnswer(choice) {
            const fb = document.getElementById('feedback');
            fb.textContent = choice === 'a'
                ? '✅ Richtig! –3 dB entspricht der Halbierung der Leistung.'
                : '❌ Nicht ganz – denken Sie an die logarithmische Definition.';
            fb.style.color = choice === 'a' ? '#2e7d32' : '#c0392b';
        }
    </script>
</div>
```

### Regeln für interaktive Elemente
- **Kein externes Framework** (kein Vue, React, Angular) – nur Vanilla-JS
- Feedback immer direkt sichtbar (kein Alert/Popup)
- Farben aus dem bestehenden Design nutzen (`#2e7d32` Erfolg, `#c0392b` Fehler)
- Interaktion muss auch ohne Chatbot funktionieren
- **Die Lösung darf nirgends im sichtbaren Fließtext der Seite stehen** – weder im Einstiegstext/Szenario direkt vor der Frage, noch in einer Bildunterschrift, Tabelle oder einem Akkordeon davor/danach. Die Antwort darf ausschließlich über das JS-Feedback nach dem Beantwortungsversuch sichtbar werden, sonst ist der Selbsttest wirkungslos. Vor dem Einfügen eines interaktiven Elements den umgebenden Text (Absatz davor/danach, Tabellen, Akkordeons auf derselben Seite) daraufhin prüfen, ob die Antwort dort versehentlich schon steht.

---

## 8. Moodle-Abgabe-Aufgabe (PFLICHT, am Ende jeder Lerneinheit)

Den **Abschluss jeder Lerneinheit** bildet eine klar gekennzeichnete **Moodle-Abgabe-Aufgabe**.

> **Wichtig:** Die Musterlösung der Moodle-Abgabe steht **nicht** in der Lösungsseite (`_Loesung.html`), sondern in einer eigenen Datei `*_moodle.html` (→ §6a).

### Kennzeichnung
- Überschrift: **„📤 Moodle-Abgabe"** (exakt so, mit Emoji)
- CSS-Klasse: `.moodle-upload` (zusätzlich zu `.task`)
- Hinweistext: „Diese Aufgabe geben Sie in Moodle ab."

### HTML-Struktur der Abgabe-Aufgabe
```html
<div class="task moodle-upload" style="border-left: 4px solid #1565c0; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);">
    <h3>📤 Moodle-Abgabe</h3>
    <p><strong>⚠️ Diese Aufgabe geben Sie in Moodle ab.</strong></p>
    <p><strong>Sozialform:</strong> [Einzelarbeit / Gruppenarbeit]</p>
    <hr style="border-color:#1565c0; margin: 0.8rem 0;">
    <!-- Aufgabenstellung -->
    <p>[Konkrete Aufgabenstellung, die das Gelernte der gesamten Lerneinheit zusammenfasst]</p>
    <p><strong>Abgabeformat:</strong> [z. B. PDF, Word-Dokument, Foto der Skizze, …]</p>
    <p><strong>Abgabefrist:</strong> Gemäß Angabe im Moodle-Kurs</p>
</div>
```

### Anforderungen an die Abgabe-Aufgabe
- **Abschlusscharakter**: fasst das Kernthema der Lerneinheit zusammen oder wendet es in einem neuen Kontext an
- **Realitätsbezug**: Aufgabenstellung aus einem berufstypischen Daten- und Prozessanalyse-Szenario
- **Klares Abgabeformat** angeben (PDF, Foto, Textdatei …)
- **Keine Mehrfachnennung**: pro Lerneinheit genau eine Abgabe-Aufgabe – immer am Ende
- Die Aufgabe muss **ohne den Chatbot lösbar** sein
- **Zeitbudget**: ca. 30 Minuten Bearbeitungszeit (unabhängig vom Zeitbudget des Arbeitsauftrags, §„Anzahl der Arbeitsaufträge pro Lerneinheit"). Umfang und Anzahl der Teilfragen entsprechend begrenzen.

---

## 9. Qualitätskriterien

Jede Lerneinheit MUSS enthalten:
- [ ] Berufsbezogenen Kontext (konkretes Prozessanalyse-Szenario spezifizieren)
- [ ] Realitätsbezogene Ausgangssituation
- [ ] **Genau einen Arbeitsauftrag** (`.task` ohne `.moodle-upload`) mit Sozialform und Methode – Teilaufgaben a/b/c innerhalb des einen Blocks sind erlaubt; Zeitrahmen aller Teilaufgaben zusammengerechnet ca. 30 Minuten
- [ ] Alle 6 Stufen der vollständigen Handlung
- [ ] Mindestens 3–5 Kontrollfragen pro Abschnitt
- [ ] Mindestens 2 verschiedene Unterrichtsmethoden pro Lerneinheit (umsetzbar durch Teilaufgaben oder interaktive Elemente)
- [ ] Mindestens ein interaktives Element (§7), dessen Lösung nirgends im umgebenden Fließtext/Tabellen/Akkordeons vorweggenommen wird
- [ ] Kein Vorgriff auf spätere Kapitel: alle Aufgaben und Erklärungen lösbar mit dem Wissen der bisherigen Kapitel (§3 „Sequenzprinzip")
- [ ] Bei allen Berechnungsaufgaben: Rechenweg explizit eingefordert, in Loesung vollständig ausgeführt, im Moodle-Raster getrennt bewertet (§3 „Rechenaufgaben")
- [ ] Fachlich korrekte Inhalte
- [ ] Angemessene Schwierigkeit für die Zielgruppe
- [ ] Reflexionselemente
- [ ] Responsive HTML-Struktur (Template-Basis)
- [ ] Moodle-Abgabe-Aufgabe am Ende (§8, Klasse `.moodle-upload`), Zeitbudget ca. 30 Minuten
- [ ] Lösungsseite (`_Loesung.html`) vorhanden – nur Lösungen regulärer Aufgaben, roter Header (`.header.loesung`), kein wiederholter Inhalt, **keine** Moodle-Abgabe-Lösung (§6a)
- [ ] Moodle-Abgabe-Lösung (`_moodle.html`) vorhanden – nur Musterlösung + Bewertungsraster der Moodle-Abgabe (§6a, §8)
- [ ] PDF-Zusammenfassung für abgeschlossenes Kapitel erstellt und abgelegt (§12)

---

## 10. Tests und Lernkontrollen

- **Testformat**: Multiple Choice, Kurzantworten, Fallstudien
- **Testlänge**: 15–20 Fragen pro Test
- **Bewertung**: Punktesystem mit sofortigem Feedback
- **Dateiname**: `[NN]_test_[thema].html` (in `LF11/Tests/`)
- **Intervall**: Systematische Lernkontrolle alle 2–3 Doppelstunden

---

## 12. Zusammenfassungen als PDF (PFLICHT pro Kapitel)

Zu **jedem abgeschlossenen Kapitel/Themenblock** ist eine inhaltliche **Zusammenfassung als PDF** zu erstellen.

### Ablage und Benennung
- Ablageort: `LF11/Summary/pdf/`
- Dateiname: `[NN]_zusammenfassung_[thema].pdf`
- Beispiel: `01_zusammenfassung_prozessaufnahme.pdf`
- Markdown-Quelldatei: `LF11/Summary/md/[NN]_zusammenfassung_[thema].md`

### Inhalt der Zusammenfassung
Die PDF fasst das Kapitel kompakt zusammen und enthält:
1. **Lernziele** – Was sollen die Schüler nach diesem Kapitel können?
2. **Kernbegriffe** – Fachbegriffe mit kurzer Definition
3. **Wichtigste Konzepte** – Kompakte Erklärungen (kein vollständiger Unterrichtstext)
4. **Formeln / Merksätze** – Falls vorhanden, hervorgehoben
5. **Praxisbezug** – Ein prägnantes Anwendungsbeispiel aus der Daten- und Prozessanalyse

### Erstellung
- Quelldatei als Markdown (`*.md`) pflegen → daraus PDF erzeugen (z. B. per Pandoc)
- Die PDF ist für Schüler als Download im Moodle-Kurs bereitzustellen

---

## 11. Technische Anforderungen

- **HTML5-Standard** einhalten
- **Responsive Design** für mobile Nutzung (`@media (max-width: 768px)` in vt-styles.css vorhanden)
- **Moodle-Kompatibilität**: kein `<link>`, kein `<style>`, kein `<script src>` – CSS und JS ausschließlich inline; einzige Ausnahme: dynamisches `import()` für den Chatbot
- **Barrierefreiheit** berücksichtigen (alt-Texte, Kontraste)
- **Kein jQuery**, kein sonstiges externes Framework
- **CSS/JS-Synchronisation**: Nach Änderungen an `Templates/css/vt-styles.css` oder `Templates/js/defaults.js` immer `_update_templates.ps1` ausführen

---

## Kurzübersicht: Arbeitsablauf

1. Passendes Template aus `Templates/html/` auswählen
2. Inhalt gemäß handlungsorientierter Didaktik strukturieren (6-Stufen-Modell)
3. Sozialformen und Methoden variieren (min. 2 pro Lerneinheit)
4. Mindestens ein interaktives Lern-/Ausprobier-Element einbauen (§7)
5. Moodle-Abgabe-Aufgabe am Ende der Seite einfügen (§8, Klasse `.moodle-upload`)
6. **Lösungsseite** (`_Loesung.html`) mit Musterlösungen der regulären Aufgaben erstellen – roter Header, **ohne** Moodle-Abgabe-Lösung (§6a)
6a. **Moodle-Abgabe-Lösung** (`_moodle.html`) als separate Datei erstellen – enthält nur Erwartungshorizont + Bewertungsraster der Moodle-Abgabe (§6a, §8)
7. Qualitätscheckliste (§9) prüfen
8. Dateien unter `LF11/Seiten/` oder `LF11/Tests/` ablegen
9. Nach Abschluss eines Kapitels: **PDF-Zusammenfassung** erstellen und in `LF11/Summary/pdf/` ablegen (§12)
10. In Moodle-Kurs einbinden
