<script >
  // ======== Props und Dateninitialisierung =========
  // Holt alle geladenen Daten vom Server (Topic-Objekt, Aufgaben, Notizen, Dateien)
  let { data } = $props();
  let topic    = data.topic;
  let tasks    = data.tasks ?? [];   // Fallback auf leeres Array falls keine Aufgaben
  let notes    = data.notes ?? [];
  let files    = data.files ?? [];

  // ======== State für das Bearbeiten des Themas =========
  // Vorbefüllen der Eingabefelder mit aktuellen Werten des Themas
  let editTitle = $state(topic.title);
  let editDescription = $state(topic.description);
  let editType = $state(topic.type);
  let editColor = $state(topic.color || '#0d6efd');   // Standardfarbe, falls keine gesetzt
  let editError = $state(null);                      // Für Fehlermeldungen beim Bearbeiten

  // ======== State für Kommentare =========
  let comment = $state('');         // Aktueller Kommentartext
  let commentError = $state(null);  // Fehler beim Kommentieren

  // ======== State für Aufgaben (Tasks) =========
  let taskTitle = $state('');       // Eingabefeld für neue Aufgabe
  let taskDueDate = $state('');     // Eingabefeld für Fälligkeitsdatum
  let taskError = $state(null);     // Fehler beim Aufgaben-Handling

  // ======== State für Notizen =========
  let note = $state('');
  let noteError = $state(null);     // Fehler beim Notizen-Handling
  let noteTitle = $state('');       // Titel für neue Notiz
  let noteContent = $state('');     // Inhalt für neue Notiz

  // ======== State für Datei-Uploads =========
  let fileError = $state(null);     // Fehler beim Datei-Upload
  let submitting = $state(false);

  async function handleUpload(event) {
      event.preventDefault();
      submitting = true;
      fileError = null;
      let formData = new FormData(event.currentTarget);
      // Optional: Topic-ID mitgeben, falls gebraucht
      if (!formData.has('topicId') && data.topic?._id) {
        formData.append('topicId', data.topic._id);
      }

      let res = await fetch('?/addFile', { method: 'POST', body: formData });
      if (res.ok) {
        window.location.reload();
      } else {
        let body = await res.json();
        fileError = body.error || 'Upload fehlgeschlagen';
        submitting = false;
      }
    }
</script>

<main class="container-lg mx-auto py-5" style="max-width: 1100px;">
  <!-- 
    Hauptcontainer der Seite:
    - Bootstrap: großes Container-Layout
    - py-5: vertikaler Padding für Abstand oben/unten
    - max-width: für Lesbarkeit und Begrenzung auf großen Screens
  -->
  <div class="row g-4">
    <!-- 
      Grid mit zwei Hauptspalten:
      - Links: Sidebar (Infos, Bearbeiten, Löschen, Zurück)
      - Rechts: Content-Bereich (Tasks, Notes, Files, Comments)
    -->
    <!-- ==================== Sidebar-Block (links) ==================== -->
    <div class="col-lg-5">
      <!-- ======= Info-Card: Zeigt Titel, Beschreibung, Erstellungsdatum ======= -->
      <div class="card shadow-sm mb-4 rounded-4">
        <div class="card-body">
          <h2 class="h4 mb-1">{topic.title}</h2> <!-- Titel des Themas -->
          <div class="mb-1">{topic.description}</div> <!-- Beschreibung des Themas -->
          <div>
            <!-- Datum im deutschen Format -->
            <small class="text-muted">Erstellt am: {new Date(topic.createdAt).toLocaleDateString('de-DE')}</small>
          </div>
        </div>
      </div>
      <!-- ======= Bearbeitungs-Formular für das Thema ======= -->
      <div class="card shadow-sm mb-4 rounded-4">
        <div class="card-body">
          <h5 class="card-title mb-3">Bearbeiten</h5>
          <!--
            Formular zum Ändern der Topic-Daten:
            - Felder: Titel, Beschreibung, Kategorie (Dropdown), Farbe (Colorpicker)
            - Alle Felder sind mit State verbunden
            - Bootstrap Grid für Abstände/Responsivität
          -->
          <form method="post" action="?/edit" class="row gy-2 gx-2 align-items-center">
            <div class="col-12">
              <input id="editTitle" name="title" class="form-control" placeholder="Titel"
                     bind:value={editTitle} required style="max-width:350px;" />
            </div>
            <div class="col-12">
              <textarea id="editDescription" name="description" class="form-control"
                        placeholder="Beschreibung" rows="2" bind:value={editDescription}
                        style="max-width:350px;"></textarea>
            </div>
            <div class="col-6">
              <select id="editType" name="type" class="form-select" bind:value={editType} required>
                <option value="">Kategorie wählen</option>
                <option value="Modul">Modul</option>
                <option value="Projekt">Projekt</option>
                <option value="Übung">Übung</option>
              </select>
            </div>
            <div class="col-4">
              <input id="editColor" type="color" name="color" bind:value={editColor}
                     class="form-control form-control-color" style="width: 3rem; height:2rem;" />
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-sm w-100">Speichern</button>
              <!-- Fehleranzeige beim Bearbeiten -->
              {#if editError}
                <div class="alert alert-danger mt-2">{editError}</div>
              {/if}
            </div>
          </form>
        </div>
      </div>
      <!-- ======= Löschen & Zurück-Button ======= -->
      <!-- 
        Formular zum Löschen des Themas:
        - Großer roter Button, um Thema endgültig zu entfernen
      -->
      <form method="post" action="?/delete" class="mb-3">
        <button type="submit" class="btn btn-danger w-100 btn-lg">Topic löschen</button>
      </form>
      <!-- 
        Zurück-Link zur Themenübersicht:
        - Sekundärer Button, damit Nutzer zurück zur Liste kommt
      -->
      <a href="/topics" class="btn btn-outline-secondary w-100 mb-4">← Zurück</a>
    </div>

    <!-- ==================== Content-Block (rechts) ==================== -->
    <div class="col-lg-7">
      <div class="row g-4">
        <!-- ======= Aufgaben (Tasks) ======= -->
        <div class="col-md-6">
          <div class="card shadow-sm mb-4 rounded-4">
            <div class="card-body">
              <h5 class="card-title">Aufgaben</h5>
              <!-- 
                Liste aller Aufgaben (Tasks):
                - Jeder Eintrag zeigt Titel, ggf. Erledigt-Badge und Fälligkeitsdatum
                - Jede Aufgabe kann gelöscht werden (Mini-Formular)
              -->
              <ul class="list-group list-group-flush mb-2">
                {#each tasks as t}
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      {t.title}
                      {#if t.completed}
                        <span class="badge bg-success ms-2">Erledigt</span>
                      {/if}
                      {#if t.dueDate}
                        <span class="text-muted small ms-3">{new Date(t.dueDate).toLocaleDateString('de-DE')}</span>
                      {/if}
                    </div>
                    <!-- Button zum Löschen der Aufgabe -->
                    <form runes method="post" action="?/deleteTask" class="ms-2">
                      <input type="hidden" name="taskId" value={t._id} />
                      <button type="submit" class="btn btn-danger btn-sm" title="Löschen">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </form>
                  </li>
                {/each}
                {#if tasks.length === 0}
                  <li class="list-group-item text-muted">Keine Aufgaben.</li>
                {/if}
              </ul>
              <!-- Formular zum Hinzufügen einer neuen Aufgabe -->
              <form method="post" action="?/addTask" class="d-flex gap-2">
                <input name="title" class="form-control form-control-sm" placeholder="Aufgabe..."
                       style="max-width:120px;" bind:value={taskTitle} required />
                <input name="dueDate" type="date" class="form-control form-control-sm"
                       style="max-width:120px;" bind:value={taskDueDate} required />
                <button type="submit" class="btn btn-outline-primary btn-sm">+</button>
              </form>
              <!-- Fehleranzeige für Tasks -->
              {#if taskError}
                <div class="alert alert-danger mt-2">{taskError}</div>
              {/if}
            </div>
          </div>
        </div>
        <!-- ======= Notizen (Notes) ======= -->
        <div class="col-md-6">
          <div class="card shadow-sm mb-4 rounded-4">
            <div class="card-body">
              <h5 class="card-title">Notizen</h5>
              <!-- 
                Liste aller Notizen (Notes):
                - Zeigt Titel und Inhalt jeder Notiz
                - Jede Notiz kann gelöscht werden (Mini-Formular)
              -->
              <ul class="list-group list-group-flush mb-2">
                {#each notes as n}
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{n.title}</strong><br>
                      <span class="small text-muted">{n.content}</span>
                    </div>
                    <!-- Button zum Löschen der Notiz -->
                    <form method="post" action="?/deleteNote" class="ms-2">
                      <input type="hidden" name="noteId" value={n._id} />
                      <button type="submit" class="btn btn-danger btn-sm" title="Löschen">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </form>
                  </li>
                {/each}
                {#if notes.length === 0}
                  <li class="list-group-item text-muted">Keine Notizen.</li>
                {/if}
              </ul>
              <!-- Formular zum Hinzufügen einer neuen Notiz -->
              <form method="post" action="?/addNote" class="d-flex gap-2">
                <input name="title" bind:value={noteTitle} class="form-control form-control-sm"
                       placeholder="Titel..." style="max-width:110px;" required />
                <input name="content" bind:value={noteContent} class="form-control form-control-sm"
                       placeholder="Inhalt..." style="max-width:160px;" required />
                <button type="submit" class="btn btn-outline-primary btn-sm">+</button>
              </form>
              <!-- Fehleranzeige für Notes -->
              {#if noteError}
                <div class="alert alert-danger mt-2">{noteError}</div>
              {/if}
            </div>
          </div>
        </div>
        <!-- ======= Dateien (Files) ======= -->
        <div class="col-12">
          <div class="card shadow-sm mb-4 rounded-4">
            <div class="card-body">
              <h5 class="card-title">Dateien</h5>
              <!-- Dateien anzeigen -->
              <ul class="list-group list-group-flush mb-2">
                {#each files as f}
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <a href={"/uploads/" + f.filename} target="_blank" rel="noopener">
                      {f.title || f.originalName}
                    </a>
                    <span class="text-muted small">
                      {new Date(f.uploadedAt).toLocaleDateString('de-DE')}
                    </span>
                  </li>
                {/each}
                {#if files.length === 0}
                  <li class="list-group-item text-muted">Keine Dateien hochgeladen.</li>
                {/if}
              </ul>

              <!-- Formular zum Hinzufügen einer neuen Datei -->
              <form onsubmit={handleUpload} class="mb-4">
                <div class="mb-3">
                  <input
                    type="text"
                    name="title"
                    class="form-control mb-2"
                    placeholder="Datei-Titel"
                    required
                  />
                  <input
                    type="file"
                    name="file"
                    class="form-control"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Lädt …' : 'Datei hochladen'}
                </button>
                {#if fileError}
                  <div class="alert alert-danger mt-3">{fileError}</div>
                {/if}
              </form>
              <!-- Fehleranzeige für Datei-Upload -->
              {#if fileError}
                <div class="alert alert-danger mt-2">{fileError}</div>
              {/if}
            </div>
          </div>
        </div>
        <!-- ======= Kommentare (Comments) ======= -->
        <div class="col-12">
          <div class="card shadow-sm rounded-4">
            <div class="card-body">
              <h5 class="card-title">Kommentare</h5>
              <!-- 
                Liste aller Kommentare zum Thema:
                - Zeigt Erstellungsdatum und Text
              -->
              <ul class="list-group list-group-flush mb-2">
                {#each topic.comments ?? [] as c}
                  <li class="list-group-item">
                    <small class="text-muted">{c.createdAt?.slice(0,16).replace('T',' ')}:</small> {c.text}
                  </li>
                {/each}
              </ul>
              <!-- Formular für neuen Kommentar -->
              <form method="post" action="?/comment" class="d-flex gap-2">
                <textarea class="form-control form-control-sm" name="comment" rows="1"
                          placeholder="Kommentar..." style="max-width:280px;"
                          bind:value={comment} required></textarea>
                <button type="submit" class="btn btn-outline-secondary btn-sm">+</button>
              </form>
              <!-- Fehleranzeige für Kommentare -->
              {#if commentError}
                <div class="alert alert-danger mt-2">{commentError}</div>
              {/if}
            </div>
          </div>
        </div>
      </div> <!-- Ende row g-4 (Content-Block rechts) -->
    </div> <!-- Ende col-lg-7 (Content) -->
  </div> <!-- Ende row g-4 (Seitenhauptgrid) -->
</main>
