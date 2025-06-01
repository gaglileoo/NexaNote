<script>
  let { note } = $props();
</script>

<div class="card shadow-sm mb-3 rounded-4">
  <div class="card-body d-flex justify-content-between align-items-center">
    <div>
      <h5 class="card-title mb-1">
        <i class="bi bi-journal-text me-1"></i>
        {note.title}
      </h5>
      <div class="mb-2">
        <small class="text-muted">
          Erstellt: {new Date(note.createdAt).toLocaleDateString('de-DE')}
        </small>
      </div>
      {#if note.content}
        <p class="card-text text-muted mb-0" style="max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          {note.content}
        </p>
      {/if}
    </div>
    <div class="d-flex flex-column gap-1 align-items-end ms-3">
      <a href={`/notes/${note._id}`} class="btn btn-outline-secondary btn-sm mb-1">Anzeigen</a>
      <form runes method="post" action="?/delete" style="display:inline;">
        <input type="hidden" name="id" value={note._id} />
      </form>
    </div>
  </div>
</div>
