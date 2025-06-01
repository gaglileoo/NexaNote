<script>
  let { file, selected, onToggle } = $props();
</script>

<div class="card shadow-sm mb-3 rounded-4">
  <div class="card-body d-flex justify-content-between align-items-center">
    <div>
      <h6 class="card-title mb-1">
        <i class="bi bi-file-earmark me-1"></i>
        {file.originalName}
      </h6>
      {#if file.title}
        <div class="text-primary small mb-1" style="font-weight:600">
          Titel: {file.title}
        </div>
      {/if}
      <small class="text-muted">
        {new Date(file.uploadedAt).toLocaleString('de-DE')}
        &ndash; {Math.round(file.size/1024)} KB
      </small>
    </div>
    <div class="d-flex flex-column gap-1 align-items-end ms-3">
      <a
        href={`/uploads/${file.filename}`}
        download={file.originalName}
        class="btn btn-outline-secondary btn-sm mb-1"
      >Download</a>
      <button
        type="button"
        class="btn btn-outline-primary btn-sm"
        onclick={() => onToggle(file.filename)}
      >
        {selected === file.filename ? 'Schließen' : 'Ansehen'}
      </button>
    </div>
  </div>
  {#if selected === file.filename}
    <div class="card-footer bg-light">
      {#if file.mimeType.startsWith('image/')}
        <img
          src={`/uploads/${file.filename}`}
          alt={file.originalName}
          class="img-fluid border"
        />
      {:else if file.mimeType === 'application/pdf'}
        <object
          data={`/uploads/${file.filename}`}
          type="application/pdf"
          width="100%"
          height="600px"
          title="PDF-Vorschau von {file.originalName}"
          aria-label="PDF-Vorschau von {file.originalName}"
        >
          <p>
            Ihr Browser unterstützt keine PDFs.
            <a href={`/uploads/${file.filename}`}>PDF herunterladen</a>
          </p>
        </object>
      {:else}
        <p class="mt-2 mb-0">Vorschau nicht verfügbar für diesen Dateityp.</p>
      {/if}
    </div>
  {/if}
</div>
