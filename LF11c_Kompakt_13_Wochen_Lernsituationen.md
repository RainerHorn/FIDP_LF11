# LF 11c – Prozesse analysieren und gestalten
## Kompakter Unterrichtsplan für FIDP – 13 Wochen × 5 UStd. = 65 UStd.

**Rahmen:** Fachinformatiker/-in Daten- und Prozessanalyse, 3. Ausbildungsjahr  
**Abgrenzung:** ausschließlich LF 11c; LF 10c und LF 12c werden separat unterrichtet.  
**Didaktik:** handlungsorientiert nach SchuCu-BBS; jede Lernsituation dauert maximal zwei Wochen.  
**Schwerpunkte:** Geschäftsprozessanalyse, BPMN, UML, Prozessdaten, Optimierung, Wirtschaftlichkeit, technische Umsetzung und Evaluation.

---

## Übersicht

| LS | Dauer | Schwerpunkt | Zentrales Handlungsprodukt |
|---|---:|---|---|
| 1 | 2 Wochen | Geschäftsprozesse & BPMN | Prozesslandkarte + BPMN-Istprozess |
| 2 | 2 Wochen | Prozessdaten & Ursachenanalyse | Schwachstellenanalyse |
| 3 | 2 Wochen | UML-Aktivität & Sequenz | Aktivitäts- + Sequenzdiagramm |
| 4 | 2 Wochen | UML-Zustand & Klasse | Zustands- + Klassendiagramm |
| 5 | 2 Wochen | Digitalisierung & Sollprozess | Lösungsvarianten + BPMN-Sollprozess |
| 6 | 2 Wochen | Wirtschaftlichkeit & Prototyp | Entscheidungsvorlage + Prototyp |
| 7 | 1 Woche | Evaluation & Prüfungstraining | Prüfungssimulation + Reflexion |

---

# LS 1 – Einen Geschäftsprozess erfassen und darstellen
**Dauer:** Wochen 1–2  
**Situation:** Die EventRent GmbH bearbeitet Vermietungsanfragen über Telefon, E-Mail und Webformular. Die Geschäftsführung vermutet Medienbrüche und lange Bearbeitungszeiten.

### Informieren
**Material:** Organigramm, kurze Tätigkeitsbeschreibungen, E-Mail-Auszüge, Prozessbegriffe, BPMN-Kurzübersicht.  
**Aufgaben:**  
1. Identifizieren Sie Kern-, Unterstützungs- und Führungsprozesse.  
2. Bestimmen Sie Start, Ende, Beteiligte, Input und Output des Vermietungsprozesses.

### Planen
**Material:** Beispiel einer Prozesslandkarte, BPMN-Symbolblatt.  
**Aufgaben:**  
1. Legen Sie Prozessgrenzen und Verantwortlichkeiten fest.  
2. Planen Sie, welche Informationen in BPMN dargestellt werden müssen.

### Entscheiden
**Material:** zwei unterschiedlich detaillierte Beispielmodelle.  
**Aufgabe:** Entscheiden Sie, welche Modellierungstiefe für die Analyse geeignet ist, und begründen Sie Ihre Wahl.

### Durchführen
**Material:** Ausgangsbeschreibung des Ist-Prozesses, diagrams.net/PlantUML.  
**Aufgaben:**  
1. Erstellen Sie eine Prozesslandkarte.  
2. Modellieren Sie den Ist-Prozess in BPMN mit Pools/Lanes, Ereignissen, Aktivitäten und Gateways.

### Kontrollieren
**Material:** BPMN-Checkliste, bewusst fehlerhaftes Vergleichsdiagramm.  
**Aufgaben:**  
1. Prüfen Sie Ihr Modell im Peer-Review.  
2. Finden und korrigieren Sie mindestens fünf Fehler im Vergleichsdiagramm.

### Reflektieren
**Material:** Leitfragen zur Modellqualität.  
**Aufgabe:** Benennen Sie zwei Grenzen des BPMN-Modells und zwei Informationen, die für eine spätere technische Umsetzung noch fehlen.

---

# LS 2 – Prozessdaten auswerten und Ursachen finden
**Dauer:** Wochen 3–4  
**Situation:** Die Geschäftsleitung stellt Prozessdaten zu 500 Vermietungsvorgängen bereit.

### Informieren
**Material:** CSV/Tabellendaten, Merkblatt zu Durchlaufzeit, Bearbeitungszeit, Wartezeit, Fehlerquote, Mittelwert, Median, Pareto und Ishikawa.  
**Aufgaben:**  
1. Ordnen Sie geeignete Kennzahlen den vermuteten Problemen zu.  
2. Prüfen Sie, welche Daten für eine belastbare Analyse fehlen.

### Planen
**Material:** Analyseleitfaden und Beispiel-KPI-Tabelle.  
**Aufgabe:** Erstellen Sie einen Analyseplan mit Kennzahl, Datenquelle, Berechnung und erwarteter Aussage.

### Entscheiden
**Material:** Kurzbeschreibungen Pareto, 5-Why und Ishikawa.  
**Aufgabe:** Wählen Sie für zwei Auffälligkeiten jeweils ein geeignetes Analysewerkzeug aus und begründen Sie die Auswahl.

### Durchführen
**Material:** Tabellenkalkulation, SQL oder Python/pandas.  
**Aufgaben:**  
1. Berechnen und visualisieren Sie zentrale Prozesskennzahlen.  
2. Erstellen Sie für die wichtigste Schwachstelle eine Ursachenanalyse.

### Kontrollieren
**Material:** Referenzwerte und Plausibilitätsfragen.  
**Aufgabe:** Prüfen Sie, ob Ihre Schlussfolgerungen tatsächlich durch Daten gestützt werden oder nur Vermutungen darstellen.

### Reflektieren
**Material:** kurzer Fall „Mittelwert 220 min, Median 48 min“.  
**Aufgabe:** Erläutern Sie, warum einzelne Kennzahlen ohne Kontext zu Fehlentscheidungen führen können.

---

# LS 3 – Technische Abläufe und Kommunikation mit UML modellieren
**Dauer:** Wochen 5–6  
**Situation:** Der Vermietungsprozess soll teilweise digitalisiert werden. Dafür müssen technische Abläufe und Systemkommunikation beschrieben werden.

### Informieren
**Material:** UML-Kurzübersichten Aktivitäts- und Sequenzdiagramm, Gegenüberstellung BPMN ↔ UML.  
**Aufgaben:**  
1. Ordnen Sie typische Fragestellungen BPMN, Aktivitäts- oder Sequenzdiagramm zu.  
2. Identifizieren Sie Systeme und Akteure der geplanten Online-Reservierung.

### Planen
**Material:** unvollständige Ablaufbeschreibung und Systemschnittstellen.  
**Aufgabe:** Planen Sie, welche Aktionen, Entscheidungen, Nachrichten und Beteiligten dargestellt werden müssen.

### Entscheiden
**Material:** zwei alternative technische Abläufe.  
**Aufgabe:** Entscheiden Sie sich für einen Ablauf und begründen Sie ihn hinsichtlich Einfachheit und Fehleranfälligkeit.

### Durchführen
**Material:** diagrams.net/PlantUML.  
**Aufgaben:**  
1. Erstellen Sie ein UML-Aktivitätsdiagramm „Reservierung bearbeiten“.  
2. Erstellen Sie ein UML-Sequenzdiagramm für Webportal, Buchungssystem, Lagerverwaltung und E-Mail-Service.

### Kontrollieren
**Material:** fehlerhafte UML-Beispiele.  
**Aufgaben:**  
1. Prüfen Sie beide Diagramme auf Konsistenz.  
2. Korrigieren Sie typische Fehler bei Fork/Join, Guards, Nachrichten und Lebenslinien.

### Reflektieren
**Material:** Vergleichsfragen.  
**Aufgabe:** Erläutern Sie, welche Information BPMN zeigt, die im Sequenzdiagramm fehlt – und umgekehrt.

---

# LS 4 – Zustände und Geschäftsobjekte modellieren
**Dauer:** Wochen 7–8  
**Situation:** Für Reservierungen treten widersprüchliche Statuswerte auf. Gleichzeitig ist unklar, welche Geschäftsobjekte technisch benötigt werden.

### Informieren
**Material:** UML-Zustandsdiagramm und Klassendiagramm kompakt; Beispiele für Zustand, Transition, Guard, Assoziation und Multiplizität.  
**Aufgaben:**  
1. Ermitteln Sie mögliche Zustände einer Reservierung.  
2. Leiten Sie zentrale Geschäftsobjekte aus dem Prozess ab.

### Planen
**Material:** Statusliste und Objektliste mit Lücken.  
**Aufgabe:** Strukturieren Sie erlaubte Zustandswechsel sowie Beziehungen zwischen Kunde, Anfrage, Angebot, Reservierung, Artikel und Mietposition.

### Entscheiden
**Material:** alternative Modellvarianten.  
**Aufgabe:** Entscheiden Sie, welche Beziehungen als einfache Assoziation, Aggregation oder Komposition sinnvoll sind.

### Durchführen
**Material:** Modellierungswerkzeug.  
**Aufgaben:**  
1. Erstellen Sie ein UML-Zustandsdiagramm für „Reservierung“.  
2. Erstellen Sie ein fachliches Klassendiagramm mit Multiplizitäten.

### Kontrollieren
**Material:** Konsistenzcheck.  
**Aufgaben:**  
1. Prüfen Sie, ob jeder wichtige Prozessschritt zu einem zulässigen Zustandswechsel passt.  
2. Prüfen Sie, ob alle im Prozess verwendeten Geschäftsobjekte im Klassenmodell vorkommen.

### Reflektieren
**Material:** Fall „stornieren nach Ausgabe“.  
**Aufgabe:** Begründen Sie anhand Ihres Zustandsmodells, welche Zustandswechsel erlaubt oder verboten sein sollten.

---

# LS 5 – Prozesse digitalisieren und optimieren
**Dauer:** Wochen 9–10  
**Situation:** Die Geschäftsleitung erwartet drei tragfähige Digitalisierungsvorschläge und einen verbesserten Sollprozess.

### Informieren
**Material:** Medienbruch-Beispiele, API-Grundidee, KVP/PDCA, Lean-Grundbegriffe, Sollprozess-Beispiele.  
**Aufgaben:**  
1. Markieren Sie Medienbrüche und nicht wertschöpfende Schritte.  
2. Benennen Sie mögliche Automatisierungspotenziale.

### Planen
**Material:** Steckbrief für Lösungsvarianten.  
**Aufgabe:** Entwickeln Sie drei technische Varianten, z. B. Webformular-Erweiterung, Kundenportal mit API oder integriertes Vermietsystem.

### Entscheiden
**Material:** Kriterienliste Technik, Aufwand, Nutzen, Risiko.  
**Aufgabe:** Wählen Sie zwei Varianten für die vertiefte Betrachtung aus und begründen Sie die Vorauswahl.

### Durchführen
**Material:** BPMN-Werkzeug, Informationsfluss-Vorlage.  
**Aufgaben:**  
1. Erstellen Sie den BPMN-Sollprozess.  
2. Stellen Sie den Informationsfluss zwischen den beteiligten Systemen dar.

### Kontrollieren
**Material:** Ist-/Soll-Vergleich.  
**Aufgabe:** Prüfen Sie, ob die identifizierten Schwachstellen tatsächlich durch den Sollprozess reduziert werden.

### Reflektieren
**Material:** Leitfrage „Digitalisierung = Verbesserung?“.  
**Aufgabe:** Nennen Sie zwei Beispiele, bei denen Digitalisierung einen Prozess auch verschlechtern könnte.

---

# LS 6 – Lösung bewerten und prototypisch umsetzen
**Dauer:** Wochen 11–12  
**Situation:** Vor der Einführung verlangt die Geschäftsführung eine wirtschaftliche Entscheidung und einen Funktionsnachweis.

### Informieren
**Material:** Nutzwertanalyse, Kostenvergleich, Amortisation/Break-even, ökologische Kriterien; Anforderungen an einen Minimal-Prototyp.  
**Aufgaben:**  
1. Erarbeiten Sie sinnvolle Bewertungskriterien.  
2. Unterscheiden Sie quantitative und qualitative Kriterien.

### Planen
**Material:** Kostendaten, Bewertungsmatrix, technische Rahmenbedingungen.  
**Aufgabe:** Planen Sie Bewertung und prototypische Umsetzung eines ausgewählten Prozessabschnitts.

### Entscheiden
**Material:** Nutzwertmatrix.  
**Aufgabe:** Treffen Sie eine begründete Auswahl unter Einbezug von Technik, Wirtschaftlichkeit und Nachhaltigkeit.

### Durchführen
**Material:** Java, Python oder Workflow-Tool; vorhandene UML-/BPMN-Modelle.  
**Aufgaben:**  
1. Setzen Sie einen kleinen Prozessabschnitt prototypisch um.  
2. Dokumentieren Sie Ein-/Ausgaben, Statuswechsel und Schnittstellen.

### Kontrollieren
**Material:** Testfälle und Modell-Checkliste.  
**Aufgaben:**  
1. Testen Sie den Prototyp mit Normal- und Fehlerfällen.  
2. Prüfen Sie die Konsistenz zwischen Implementierung, BPMN und UML-Modellen.

### Reflektieren
**Material:** kurze Managementvorlage.  
**Aufgabe:** Formulieren Sie eine Entscheidungsempfehlung mit Nutzen, Kosten, Risiken und Grenzen.

---

# LS 7 – Prozessänderung evaluieren und Prüfungskompetenz sichern
**Dauer:** Woche 13  
**Situation:** Ein neuer Wartungsprozess wird als unabhängiger Prüfungsfall vorgelegt.

### Informieren
**Material:** neue Prozessbeschreibung, unvollständiges BPMN, Prozessdatentabelle, Kostendaten.  
**Aufgabe:** Erfassen Sie Problem, Prozessgrenzen und vorhandene Informationen.

### Planen
**Material:** 90-Minuten-Arbeitsplan.  
**Aufgabe:** Legen Sie Reihenfolge und Zeitbudget für Modellierung, Analyse, Optimierung und Wirtschaftlichkeit fest.

### Entscheiden
**Material:** zwei mögliche Optimierungsmaßnahmen.  
**Aufgabe:** Wählen Sie eine Maßnahme aus und begründen Sie diese.

### Durchführen
**Material:** AP2-nahe Aufgabenblätter.  
**Aufgaben:**  
1. Ergänzen/korrigieren Sie ein Prozess- oder UML-Diagramm.  
2. Berechnen Sie Kennzahlen und entwickeln Sie einen Sollprozess.

### Kontrollieren
**Material:** Erwartungshorizont / Checkliste.  
**Aufgabe:** Korrigieren Sie Ihre Lösung anhand fachlicher Kriterien, nicht nur anhand des Ergebnisses.

### Reflektieren
**Material:** Kompetenzmatrix.  
**Aufgabe:** Markieren Sie für BPMN, UML, Kennzahlen, Ursachenanalyse, Optimierung und Wirtschaftlichkeit jeweils **sicher / teilweise / unsicher** und formulieren Sie einen persönlichen Lernschwerpunkt.

---

## Curriculare Einordnung

LF 11c umfasst laut KMK **80 UStd.**; dieser Plan verdichtet die Kompetenzen auf **65 UStd.**. Inhaltlich bleibt der Fokus auf:

- Analyse und Darstellung von Geschäftsprozessen,
- Ableitung von Informationsflüssen,
- Auswertung von Prozessdaten,
- technische Planung von Digitalisierungslösungen,
- Bewertung von Lösungsvarianten,
- Implementierung,
- Dokumentation,
- Begleitung und Bewertung der Prozesstransformation.

UML wird als fachlich sinnvolle Konkretisierung eingesetzt. Schwerpunkt sind **Aktivitäts-, Sequenz- und Zustandsdiagramme**; das Klassendiagramm wird als Wiederaufnahme früherer Kenntnisse genutzt.

**Quellenbasis:** KMK-Rahmenlehrplan Fachinformatiker/-in; FIAusbV §29 „Durchführen einer Prozessanalyse“; IHK-AkA; niedersächsische SchuCu-BBS-Vorgaben; ergänzend offizielle LF-11c-Konkretisierungen anderer Länder.
