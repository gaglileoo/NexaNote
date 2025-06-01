<script >
  let { data } = $props();
  let topic    = data.topic;
  let tasks    = data.tasks ?? [];
  let notes    = data.notes ?? [];
  let files    = data.files ?? [];

  // Für Edit
  let editTitle = $state(topic.title);
  let editDescription = $state(topic.description);
  let editType = $state(topic.type);
  let editColor = $state(topic.color || '#0d6efd');
  let editError = $state(null);

  // Für Kommentare
  let comment = $state('');
  let commentError = $state(null);

  // Tasks
let taskTitle = $state('');
let taskDueDate = $state('');
let taskError = $state(null);

  // Notes
  let note = $state('');
  let noteError = $state(null);
  let noteTitle = $state('');
let noteContent = $state('');


  // File
  let fileError = $state(null);
</script>

<main class="container-lg mx-auto py-5" style="max-width: 1100px;">
  <div class="row g-4">
    <!-- Sidebar-Block (links) -->
    <div class="col-lg-5">
      <!-- Info -->
      <div class="card shadow-sm mb-4 rounded-4">
        <div class="card-body">
          <h2 class="h4 mb-1">{topic.title}</h2>
          <div class="mb-1">{topic.description}</div>
          <div>
            <small class="text-muted">Erstellt am: {new Date(topic.createdAt).toLocaleDateString('de-DE')}</small>
          </div>
        </div>
      </div>
      <!-- Bearbeiten -->
      <div class="card shadow-sm mb-4 rounded-4">
        <div class="card-body">
          <h5 class="card-title mb-3">Bearbeiten</h5>
          <form runes method="post" action="?/edit" class="row gy-2 gx-2 align-items-center">
            <div class="col-12">
              <input id="editTitle" name="title" class="form-control" placeholder="Titel" bind:value={editTitle} required style="max-width:350px;" />
            </div>
            <div class="col-12">
            <textarea
              id="editDescription"
              name="description"
              class="form-control"
              placeholder="Beschreibung"
              rows="2"
              bind:value={editDescription}
              style="max-width:350px;"
            ></textarea>
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
              <input id="editColor" type="color" name="color" bind:value={editColor} class="form-control form-control-color" style="width: 3rem; height:2rem;" />
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-sm w-100">Speichern</button>
              {#if editError}
                <div class="alert alert-danger mt-2">{editError}</div>
              {/if}
            </div>
          </form>
        </div>
      </div>
      <!-- Delete & Back -->
      <form runes method="post" action="?/delete" class="mb-3">
        <button type="submit" class="btn btn-danger w-100 btn-lg">Topic löschen</button>
      </form>
      <a href="/topics" class="btn btn-outline-secondary w-100 mb-4">← Zurück</a>
    </div>

    <!-- Content-Block (rechts) -->
    <div class="col-lg-7">
      <div class="row g-4">
      <!-- Aufgaben + Notizen nebeneinander -->
      <div class="col-md-6">
        <div class="card shadow-sm mb-4 rounded-4">
          <div class="card-body">
            <h5 class="card-title">Aufgaben</h5>
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
                  <!-- Delete-Button -->
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
            <form runes method="post" action="?/addTask" class="d-flex gap-2">
              <input name="title" class="form-control form-control-sm" placeholder="Aufgabe..." style="max-width:120px;" bind:value={taskTitle} required />
              <input name="dueDate" type="date" class="form-control form-control-sm" style="max-width:120px;" bind:value={taskDueDate} required />
              <button type="submit" class="btn btn-outline-primary btn-sm">+</button>
            </form>
            {#if taskError}
              <div class="alert alert-danger mt-2">{taskError}</div>
            {/if}
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card shadow-sm mb-4 rounded-4">
          <div class="card-body">
            <h5 class="card-title">Notizen</h5>
            <ul class="list-group list-group-flush mb-2">
              {#each notes as n}
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{n.title}</strong><br>
                    <span class="small text-muted">{n.content}</span>
                  </div>
                  <!-- Delete-Button -->
                  <form runes method="post" action="?/deleteNote" class="ms-2">
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
            <form runes method="post" action="?/addNote" class="d-flex gap-2">
              <input name="title" bind:value={noteTitle} class="form-control form-control-sm" placeholder="Titel..." style="max-width:110px;" required />
              <input name="content" bind:value={noteContent} class="form-control form-control-sm" placeholder="Inhalt..." style="max-width:160px;" required />
              <button type="submit" class="btn btn-outline-primary btn-sm">+</button>
            </form>
            {#if noteError}
              <div class="alert alert-danger mt-2">{noteError}</div>
            {/if}
          </div>
        </div>
      </div>
        <!-- Dateien -->
        <div class="col-12">
          <div class="card shadow-sm mb-4 rounded-4">
            <div class="card-body">
              <h5 class="card-title">Dateien</h5>
              <ul class="list-group list-group-flush mb-2">
                {#each files as f}
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <a href={f.url} target="_blank" rel="noopener">{f.name}</a>
                    <span class="text-muted small">{new Date(f.createdAt).toLocaleDateString('de-DE')}</span>
                  </li>
                {/each}
                {#if files.length === 0}
                  <li class="list-group-item text-muted">Keine Dateien hochgeladen.</li>
                {/if}
              </ul>
              <form runes method="post" action="?/addFile" enctype="multipart/form-data" class="d-flex gap-2">
                <input type="file" name="file" class="form-control form-control-sm" style="max-width:180px;" required />
                <button type="submit" class="btn btn-outline-primary btn-sm">Hochladen</button>
              </form>
              {#if fileError}
                <div class="alert alert-danger mt-2">{fileError}</div>
              {/if}
            </div>
          </div>
        </div>
        <!-- Kommentare -->
        <div class="col-12">
          <div class="card shadow-sm rounded-4">
            <div class="card-body">
              <h5 class="card-title">Kommentare</h5>
              <ul class="list-group list-group-flush mb-2">
                {#each topic.comments ?? [] as c}
                  <li class="list-group-item">
                    <small class="text-muted">{c.createdAt?.slice(0,16).replace('T',' ')}:</small> {c.text}
                  </li>
                {/each}
              </ul>
              <form runes method="post" action="?/comment" class="d-flex gap-2">
                <textarea class="form-control form-control-sm" name="comment" rows="1" placeholder="Kommentar..." style="max-width:280px;" bind:value={comment} required></textarea>
                <button type="submit" class="btn btn-outline-secondary btn-sm">+</button>
              </form>
              {#if commentError}
                <div class="alert alert-danger mt-2">{commentError}</div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
