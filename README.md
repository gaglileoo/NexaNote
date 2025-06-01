# NexaNote

NexaNote ist eine moderne Notiz- und Organisationsplattform, entwickelt als Semesterprojekt. Die App vereint Aufgabenmanagement, Notizen und Dateiverwaltung übersichtlich in einer Anwendung.


## Features

- **Topics**: Zentrale Kategorien, z.B. Module oder Projekte
- **Tasks**: Aufgaben mit Titel, Fälligkeitsdatum, Status und Löschfunktion
- **Notes**: Notizen mit Titel und Inhalt, direkt einem Topic zugeordnet
- **Files**: Dateiuploads, verknüpft mit Topics
- **Kommentare**: Notizen und Feedback direkt am Topic
- **Responsives Design**: Alle Komponenten sind mit Bootstrap gestaltet

## Komponenten & Struktur

- **Topic-Detailseite**: Alle Infos, Aufgaben, Notizen, Dateien und Kommentare auf einen Blick
- **Globale Übersichten**: Listen aller Aufgaben, Notizen und Dateien
- **Grid-Layout**: Übersichtliche, moderne Karten-Ansicht
- **Bearbeiten & Löschen**: Direkt im UI möglich

## Technologien

- **Frontend**: SvelteKit
- **Styling**: Bootstrap 5
- **Backend**: SvelteKit (Node.js, Server Actions)
- **Datenbank**: MongoDB

## Einrichtung

## Umgebungsvariablen
.env

## Installation
npm install

## Entwicklung
npm run dev


## Deployment auf Netlify
Installiere den SvelteKit Netlify Adapter:
npm i -D @sveltejs/adapter-netlify

Lege in Netlify die Umgebungsvariable DB_URI an

Build Command: npm run build

Publish Directory: .svelte-kit/output

## Hinweise
Dieses Projekt demonstriert moderne Webentwicklung und kann um Features wie Authentifizierung, Markdown-Unterstützung oder Kalenderintegration erweitert werden.


## Autor
(c) 2025 – Leonardo | Semesterprojekt Prototyping
