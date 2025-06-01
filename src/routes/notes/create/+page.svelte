
<script >
  let title    = $state('');
  let content  = $state('');
  let error    = $state(null);
</script>

<main class="container py-5">
  <h1 class="mb-4">Neue Note erstellen</h1>

  <form runes method="post" class="mb-4">
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
    <button type="submit" class="btn btn-primary">Erstellen</button>
    {#if error}
      <div class="alert alert-danger mt-3">{error}</div>
    {/if}
  </form>

  <a href="/notes" class="btn btn-secondary">← Zurück zur Übersicht</a>
</main>
