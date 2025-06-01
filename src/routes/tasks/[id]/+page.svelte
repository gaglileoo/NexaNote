

<script >
  let { data }   = $props();
  let task       = data.task;
  let title      = $state(task.title);
  let dueDate    = $state(task.dueDate);
  let completed  = $state(task.completed);
  let success    = $state(false);
  let error      = $state('');

  let commentText = $state('');
  let commentError = $state('');
  // State für neue Kommentare
  let comments = $state(task.comments || []);  
</script>

<main class="container py-5">
  <h1 class="mb-4">Aufgabe bearbeiten</h1>

  <form runes method="post" action="?/update" class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="title" class="form-label">Titel</label>
      <input
        id="title"
        name="title"
        type="text"
        bind:value={title}
        class="form-control"
        required
      />
    </div>

    <div class="col-md-4">
      <label for="dueDate" class="form-label">Fälligkeitsdatum</label>
      <input
        id="dueDate"
        name="dueDate"
        type="date"
        bind:value={dueDate}
        class="form-control"
        required
      />
    </div>

    <div class="col-md-2 d-flex align-items-center">
      <label class="form-check-label ms-2">
        <input
          type="checkbox"
          name="completed"
          bind:checked={completed}
          class="form-check-input"
        />
        Erledigt
      </label>
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-success me-2">Speichern</button>
      <button
        type="submit"
        formaction="?/delete"
        formmethod="post"
        class="btn btn-danger"
      >
        Löschen
      </button>
    </div>

    {#if success}
      <div class="alert alert-success mt-3">Aufgabe wurde aktualisiert.</div>
    {:else if error}
      <div class="alert alert-danger mt-3">{error}</div>
    {/if}
  </form>

  <a href="/tasks" class="btn btn-secondary">← Zurück zur Übersicht</a>

   <section class="mt-5">
    <h2>Kommentare</h2>
    <!-- Kommentar-Form -->
    <form runes method="post" action="?/comment" class="mb-3">
      <div class="mb-2">
        <textarea
          name="text"
          bind:value={commentText}
          class="form-control"
          rows="3"
          placeholder="Neuen Kommentar eingeben..."
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Kommentar hinzufügen</button>
      {#if commentError}
        <div class="alert alert-danger mt-2">{commentError}</div>
      {/if}
    </form>

    <!-- Kommentar-Liste -->
    {#if comments.length === 0}
      <p class="text-muted">Noch keine Kommentare.</p>
    {:else}
      <ul class="list-group">
        {#each comments as c}
          <li class="list-group-item">
            <p>{c.text}</p>
            <small class="text-muted">
              {new Date(c.createdAt).toLocaleString('de-DE')}
            </small>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</main>
