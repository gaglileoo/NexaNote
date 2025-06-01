<script>
  let { data } = $props();
  let note     = data.note;
  let title    = $state(note.title);
  let content  = $state(note.content);
  let success  = $state(false);
  let error    = $state(null);
</script>

<main class="container py-5">
  <h1 class="mb-4">Notiz bearbeiten</h1>
  <form runes method="post" action="?/update" class="mb-4">
    <div class="mb-3">
      <label for="title" class="form-label">Titel</label>
      <input
        id="title"
        name="title"
        class="form-control"
        bind:value={title}
        required
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">Inhalt</label>
      <textarea
        id="content"
        name="content"
        class="form-control"
        rows="6"
        bind:value={content}
      ></textarea>
    </div>
    <button type="submit" class="btn btn-success me-2">Speichern</button>
    {#if success}
      <div class="alert alert-success mt-3">Notiz wurde gespeichert.</div>
    {/if}
    {#if error}
      <div class="alert alert-danger mt-3">{error}</div>
    {/if}
  </form>
  <form runes method="post" action="?/delete" class="mb-3">
    <button type="submit" class="btn btn-danger">Note löschen</button>
  </form>
  <p>
    <a href="/notes" class="btn btn-secondary">← Zurück zur Übersicht</a>
  </p>
  <p class="mt-3">
    <small class="text-muted">
      Erstellt: {new Date(note.createdAt).toLocaleDateString('de-DE')}
    </small>
  </p>
</main>
