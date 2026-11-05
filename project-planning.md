Projektplanung – Music Platform

Portfolio Creative Studio 1

1. Projektidee

Ziel dieses Projekts war die Entwicklung einer Full-Stack-Webanwendung, bei der Nutzer Musik-bezogene Inhalte erstellen und verwalten können.

Die Plattform enthält:
		Benutzerregistrierung und Login
	    Erstellung von Künstlern und Songs
        Ein Like-System zur Interaktion
		Rollenbasierte Berechtigungen

Die Entwicklung erfolgte schrittweise. Jede Funktion wurde geplant, umgesetzt, getestet und bei Bedarf verbessert.



2. Feature-Planung und Zeitaufwand

1. Authentifizierungssystem

Geplante Zeit: 6 Stunden
Tatsächliche Zeit: 7 Stunden

Umfang:
	•	Registrierung
	•	Login
	•	Token-Authentifizierung mit Laravel Sanctum
	•	Geschützte Routen im Frontend
	•	Logout
	•	Eigenes Konto löschen

Anmerkung:
Die Konfiguration von Sanctum und die Verbindung zwischen Frontend und Backend haben mehr Zeit benötigt als geplant.



2. Künstlerverwaltung (CRUD)

Geplante Zeit: 5 Stunden
Tatsächliche Zeit: 5 Stunden

Umfang:
	•	Künstler erstellen
	•	Künstler anzeigen
	•	Künstler bearbeiten
	•	Künstler löschen
	•	Beziehung zwischen Künstler und Benutzer



3. Songverwaltung (CRUD)

Geplante Zeit: 7 Stunden
Tatsächliche Zeit: 8 Stunden

Umfang:
	•	Song erstellen
	•	Songs anzeigen
	•	Song löschen
	•	Beziehung zwischen Song, Künstler und Benutzer
	•	Anzeige von Genre, Dauer und Notizen

Anmerkung:
Die Implementierung der Datenbankbeziehungen und der Löschberechtigungen erforderte zusätzliche Anpassungen.




4. Like-System

Geplante Zeit: 4 Stunden
Tatsächliche Zeit: 5 Stunden

Umfang:
	•	Erstellung einer Likes-Tabelle
	•	Verhindern von doppelten Likes
	•	Implementierung der toggleLike()-Methode im Backend
	•	Anzeige der Like-Anzahl
	•	Sofortige Aktualisierung im Frontend ohne Seiten-Reload

Herausforderung:
Zunächst war die API-Route falsch mit dem Controller verbunden. Nach Korrektur funktionierte das System wie geplant.


5. Rollenbasierte Berechtigungen

Geplante Zeit: 3 Stunden
Tatsächliche Zeit: 3 Stunden

Umfang:
	•	Löschen eigener Inhalte
	•	Admin-Berechtigung zum Löschen
	•	Backend-Validierung für geschützte Aktionen



    6. UI und Responsive Design

Geplante Zeit: 5 Stunden
Tatsächliche Zeit: 4 Stunden

Umfang:
	•	Kartenbasiertes Layout
	•	Mobile-First-Ansatz
	•	Dynamische Anzeige von Buttons
	•	Lade- und Fehlermeldungen
	•	Klare und einfache Benutzeroberfläche



7. Testing und Qualitätssicherung

Geplante Zeit: 4 Stunden
Tatsächliche Zeit: 3 Stunden

Umfang:
	•	Manuelles Testen der API
	•	Testen der Berechtigungen
	•	Einfacher Frontend-Unit-Test für die Anzeige der Likes


3. Agiler Workflow

Das Projekt wurde iterativ entwickelt:
	1.	Feature planen
	2.	Backend umsetzen
	3.	Frontend anbinden
	4.	Testen
	5.	Fehler beheben
	6.	Struktur verbessern

Jede Funktion wurde abgeschlossen, bevor mit der nächsten begonnen wurde.



4. Beispiel-Ticket – Like-System

Titel: Like-Funktion für Songs implementieren

Beschreibung:
Benutzer sollen Songs liken und entliken können. Die Anzahl der Likes soll angezeigt werden. Es darf keine doppelten Likes vom gleichen Benutzer geben.

Akzeptanzkriterien:
	•	Nur eingeloggte Nutzer können liken
	•	Ein Song kann nur einmal pro Nutzer gelikt werden
	•	Zweiter Klick entfernt den Like
	•	Die Like-Anzahl aktualisiert sich sofort
	•	Berechtigungen bleiben erhalten

Status: Abgeschlossen

5. Reflexion

Durch dieses Projekt habe ich meine Kenntnisse in folgenden Bereichen verbessert:
	•	REST-API-Struktur
	•	Authentifizierung und Autorisierung
	•	Datenbankbeziehungen
	•	State-Management in React
	•	Fehlersuche im Full-Stack-Bereich
	•	Strukturierte Projektplanung

Eine der größten Herausforderungen war die Verbindung zwischen Backend und Frontend, besonders beim Like-System. Durch systematisches Debugging konnte das Problem gelöst werden.

6. Herausforderungen und Lösungen

Während der Entwicklung sind mehrere technische Probleme aufgetreten:
	•	Eine API-Route war mit der falschen Controller-Methode verbunden.
	•	Eine React-Funktion war nicht korrekt im Komponenten-Scope definiert.
	•	Die Synchronisierung von Backend-Antworten mit dem Frontend-State erforderte Anpassungen.
Diese Probleme wurden durch systematisches Debugging und schrittweises Testen gelöst.
