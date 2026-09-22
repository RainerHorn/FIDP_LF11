# ToDo – LF11c: Prozesse analysieren und gestalten

Angepasste Wochenplanung auf Basis von [`LF11c_Unterrichtskonzept_FIDP_13_Wochen_65_Stunden.md`](LF11c_Unterrichtskonzept_FIDP_13_Wochen_65_Stunden.md), umsortiert nach Vorgabe:
- Woche 1–3: ausschließlich UML
- Woche 4–5: mathematische Grundlagen (Basis für die spätere Prozessdatenanalyse)
- Woche 6–13: restliche Themen des Unterrichtskonzepts, sinnvoll verteilt und teilweise verzahnt

Die ursprüngliche Zuordnung (Original-Woche aus dem Unterrichtskonzept) steht jeweils in Klammern.

---

## Woche 1 – UML-Aktivitätsdiagramm *(Original: Woche 4)*
- [ ] UML-Aktivitätsdiagramm einführen (Startknoten, Endknoten, Aktion, Kontrollfluss, Entscheidung, Zusammenführung, Fork, Join, Guard, Swimlane) – ohne BPMN-Vergleich, da BPMN erst in Woche 7 eingeführt wird
- [ ] Handlungsprodukt: UML-Aktivitätsdiagramm „Reservierung bearbeiten“

## Woche 2 – UML-Sequenzdiagramm *(Original: Woche 5)*
- [ ] Akteur, Objekt/System, Lebenslinie, Aktivierung, synchrone Nachricht, Rückgabe, `alt`, `opt`, `loop`
- [ ] Handlungsprodukt: Sequenzdiagramm „Online-Reservierung“

## Woche 3 – UML-Zustandsdiagramm *(Original: Woche 6)*
- [ ] Initial State, Final State, Zustand, Transition, Event, Guard, Action
- [ ] Praxisaufgabe: zulässige/unzulässige Zustandswechsel der Reservierung prüfen
- [ ] Handlungsprodukt: Zustandsdiagramm „Reservierung“

---

## Woche 4 – Mathematische Grundlagen I: Beschreibende Statistik *(neu, Vorbereitung auf Original-Woche 3)*
- [ ] Häufigkeit, Minimum/Maximum, Mittelwert, Median, Spannweite, Quantile
- [ ] Übungsbeispiele mit Prozessdaten (Durchlaufzeiten, Bearbeitungszeiten)
- [ ] Handlungsprodukt: Kurzauswertung einer Beispiel-Datentabelle

## Woche 5 – Mathematische Grundlagen II: Kennzahlen & Diagrammauswertung *(neu, Vorbereitung auf Original-Woche 3)*
- [ ] Prozentrechnung, Prozesskennzahlen (Durchlaufzeit, Bearbeitungszeit, Wartezeit, Fehlerquote, Nacharbeitsquote, Kosten je Vorgang, Termintreue)
- [ ] Diagrammtypen lesen/erstellen (Balken, Linie), Grundidee Pareto-Analyse
- [ ] Handlungsprodukt: Kennzahlenblatt als Grundlage für die spätere Prozessanalyse

---

## Woche 6 – Geschäftsprozesse verstehen *(Original: Woche 1)*
- [ ] Geschäftsprozess vs. Arbeitsprozess, Kern-/Unterstützungs-/Führungsprozesse, Prozessgrenzen, Prozessbeteiligte, Input/Output
- [ ] Handlungssituation: Prozesse der EventRent GmbH aus Organigramm, Tätigkeitsbeschreibungen, E-Mails rekonstruieren
- [ ] Handlungsprodukt: Prozesslandkarte EventRent GmbH

## Woche 7 – Geschäftsprozesse mit BPMN modellieren *(Original: Woche 2)*
- [ ] BPMN-Grundelemente: Start-/Endereignis, Aktivität, Gateway, Sequenzfluss, Nachrichtenfluss, Pool, Lane, Zwischenereignis, XOR, AND, optional OR
- [ ] Handlungsprodukt: BPMN-Istprozess (Qualitätscheck: Anfang/Ende eindeutig, Verantwortlichkeiten, Gateways, Nachrichtenfluss)

## Woche 8 – Prozesse analysieren und Prozessdaten auswerten *(Original: Woche 3)*
- [ ] Aufbau auf Woche 4–5 (Statistik/Kennzahlen) direkt auf den BPMN-Istprozess aus Woche 7 anwenden
- [ ] Analysewerkzeuge: Pareto-Analyse, 5-Why, Ishikawa-Diagramm, Ursache-Wirkungs-Analyse
- [ ] Handlungsprodukt: Schwachstellenbericht mit Datenbelegen

## Woche 9 – UML-Klassendiagramm & Informationsmodell + Vernetzung *(Original: Woche 7)*
- [ ] Geschäftsobjekte aus dem Prozess ableiten (Kunde, Anfrage, Angebot, Reservierung, Artikel, Mietposition, Mitarbeiter, Rückgabe), Attribute/Beziehungen/Multiplizitäten, ggf. Vererbung
- [ ] Vernetzung prüfen: BPMN ↔ Aktivitätsdiagramm ↔ Sequenzdiagramm ↔ Zustandsdiagramm ↔ Klassendiagramm
- [ ] Handlungsprodukt: fachliches UML-Klassendiagramm

## Woche 10 – Informationsfluss und Digitalisierungslösungen *(Original: Woche 8)*
- [ ] Informationsobjekte, Quelle/Ziel, Schnittstellen, Medienbrüche, API-Grundidee, Datenformate
- [ ] Lösungsvarianten entwickeln (A: bestehendes System + Webformular, B: Kundenportal mit API, C: neues ERP-/Vermietsystem)
- [ ] Handlungsprodukt: Informationsflussmodell + drei technische Lösungsvarianten

## Woche 11 – Prozessoptimierung und Wirtschaftlichkeit *(Original: Woche 9 + 10, verdichtet)*
- [ ] Optimierungsmethoden (KVP, Kaizen, Lean, PDCA) und Optimierungsfragen (Entfall, Automatisierung, Parallelisierung, Medienbruch-Beseitigung)
- [ ] Bewertung: Nutzwertanalyse, einfache Wirtschaftlichkeitsrechnung (Kostenvergleich/Amortisation/ROI-Grundidee), ökologische Aspekte
- [ ] Handlungsprodukte: BPMN-Sollprozess + Änderungsliste Ist→Soll, Entscheidungsvorlage für die Geschäftsführung

## Woche 12 – Digitalisierungslösung prototypisch implementieren *(Original: Woche 11)*
- [ ] Umsetzungsvariante wählen (Java, Python oder Low-Code/Workflow z. B. Node-RED/n8n/Power Automate)
- [ ] Prototyp automatisiert mind. einen Teilschritt, überträgt Informationen, berücksichtigt definierte Zustände
- [ ] Kontrolle gegen BPMN/Aktivitäts-/Sequenz-/Zustandsdiagramm
- [ ] Handlungsprodukt: funktionierender Prozessprototyp

## Woche 13 – Transformation, Dokumentation, Evaluation & AP2-nahe Prüfungssimulation *(Original: Woche 12 + 13, verdichtet)*
- [ ] Prozesstransformation/Change-Management-Grundzüge, englische Kurzdokumentation (Process Overview, Changes, User Roles, New Workflow, Benefits, Known Limitations)
- [ ] Evaluation anhand von fiktivem Kundenfeedback, Anpassung von Prozessdarstellung/Zustandsmodell/technischer Lösung
- [ ] AP2-nahe Prüfungssimulation an neuer Handlungssituation (Wartungsauftrags-Prozess): Prozessdarstellung, UML-Teilaufgabe, Prozessanalyse, Optimierung, Wirtschaftlichkeit
- [ ] Abschluss: Kompetenz-Selbsteinschätzung (sicher/teilweise/unsicher) je Kompetenzbereich

---

## Woche 14 – Ursache-Wirkungs-Analyse mit dem Ishikawa-Diagramm *(neu, Vertiefung zu Woche 8)*
- [x] Materialseite: vollständiger Zeichenvorrat des Ishikawa-Diagramms (Rückgrat, Hauptäste/6M-Kategorien, Ursachen, Unterursachen) mit interaktiven Elementen
- [x] Aufgabe a1: einfaches Ishikawa-Diagramm erstellen
- [x] Aufgabe a2: komplexes Ishikawa-Diagramm mit allen 6M-Kategorien erstellen
- [x] Aufgabe a3: fehlerhaftes Ishikawa-Diagramm korrigieren

---

## Offene Punkte
- [ ] Prüfen, ob Woche 11 (Optimierung + Wirtschaftlichkeit) und Woche 13 (Transformation + Prüfungssimulation) im Umfang von je 5 UStd. tatsächlich ausreichen, oder ob eine Stunde aus den Mathematik-Wochen (4–5) bei Bedarf nachträglich verschoben werden muss
- [ ] Lernmaterialien je Woche gemäß `.github/instructions/lernmaterialien.instructions.md` erstellen (Schülerversion, Lösungsseite, Moodle-Abgabe-Lösung)
