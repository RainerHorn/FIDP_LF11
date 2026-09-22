# LF11c – Themenstruktur, Ablage, Fortschritt

Kapitelgliederung nach dem aktuellen Wochenplan aus [`todo.md`](../todo.md)
(Original-Woche aus dem Unterrichtskonzept jeweils in Klammern).

## Ordnerstruktur pro Kapitel

Jedes Kapitel hat einen eigenen Ordner `LF11/<NN>_<Thema>/` mit:
- `Seiten/` – Lernerseiten, Lösungsseiten, Moodle-Abgabe-Lösungen, Aufgaben (`FIDP_LF11c_a<N>.html`, siehe Skill `aufgaben`)
- `Fragen/` – Moodle-XML-Quizze zu diesem Kapitel

Kapitelübergreifend, weiterhin flach unter `LF11/`:
- `Tests/` – Assessments/Lernkontrollen
- `Summary/md/` + `Summary/pdf/` – Markdown-Quellen und generierte PDF-Zusammenfassungen

## Kapitel

| Nr. | Ordner | Thema | Status |
|---|---|---|---|
| 01 | `01_UML-Aktivitaetsdiagramm` | UML-Aktivitätsdiagramm *(Original: Woche 4)* | offen |
| 02 | `02_UML-Sequenzdiagramm` | UML-Sequenzdiagramm *(Original: Woche 5)* | offen |
| 03 | `03_UML-Zustandsdiagramm` | UML-Zustandsdiagramm *(Original: Woche 6)* | offen |
| 04 | `04_Mathematische-Grundlagen-I-Statistik` | Mathematische Grundlagen I: Beschreibende Statistik *(neu, Vorbereitung auf Original-Woche 3)* | offen |
| 05 | `05_Mathematische-Grundlagen-II-Kennzahlen` | Mathematische Grundlagen II: Kennzahlen & Diagrammauswertung *(neu, Vorbereitung auf Original-Woche 3)* | offen |
| 06 | `06_Geschaeftsprozesse-verstehen` | Geschäftsprozesse verstehen *(Original: Woche 1)* | offen |
| 07 | `07_BPMN-Modellierung` | Geschäftsprozesse mit BPMN modellieren *(Original: Woche 2)* | offen |
| 08 | `08_Prozessanalyse-Prozessdaten` | Prozesse analysieren und Prozessdaten auswerten *(Original: Woche 3)* | offen |
| 09 | `09_UML-Klassendiagramm-Informationsmodell` | UML-Klassendiagramm & Informationsmodell + Vernetzung *(Original: Woche 7)* | offen |
| 10 | `10_Informationsfluss-Digitalisierungsloesungen` | Informationsfluss und Digitalisierungslösungen *(Original: Woche 8)* | offen |
| 11 | `11_Prozessoptimierung-Wirtschaftlichkeit` | Prozessoptimierung und Wirtschaftlichkeit *(Original: Woche 9 + 10, verdichtet)* | offen |
| 12 | `12_Digitalisierungsloesung-Prototyp` | Digitalisierungslösung prototypisch implementieren *(Original: Woche 11)* | offen |
| 13 | `13_Transformation-Dokumentation-Evaluation` | Transformation, Dokumentation, Evaluation & AP2-nahe Prüfungssimulation *(Original: Woche 12 + 13, verdichtet)* | offen |
| 14 | `14_Ishikawa-Diagramm` | Ursache-Wirkungs-Analyse mit dem Ishikawa-Diagramm *(neu, Vertiefung zu Kapitel 08)* | offen |

Details zu Inhalten und Handlungsprodukten je Kapitel: siehe [`todo.md`](../todo.md).

## Dateibenennung

Siehe `CLAUDE.md` (Root) für die vollständige Namenskonvention. Kurzfassung:

| Dateityp | Muster | Ablage |
|---|---|---|
| Lernerseite | `FIDP_LF11_[NN]_[Thema].html` | `LF11/<NN>_<Thema>/Seiten/` |
| Selbstkontroll-Lösung | `FIDP_LF11_[NN]_[Thema]_Loesung.html` | `LF11/<NN>_<Thema>/Seiten/` |
| Moodle-Abgabe-Lösung (Lerneinheit) | `FIDP_LF11_[NN]_[Thema]_moodle.html` | `LF11/<NN>_<Thema>/Seiten/` |
| Einzelaufgabe (Skill `aufgaben`) | `FIDP_LF11c_a<N>.html` | `LF11/<NN>_<Thema>/Seiten/` |
| Musterlösung zur Einzelaufgabe | `FIDP_LF11c_a<N>_moodle.html` | `LF11/<NN>_<Thema>/Seiten/` |
| Materialseite (Skill `material`) | `FIDP_LF11c_m<N>.html` | `LF11/<NN>_<Thema>/Seiten/` |
| Moodle-XML-Quiz | siehe `MoodleQuestionGenerator` | `LF11/<NN>_<Thema>/Fragen/` |
