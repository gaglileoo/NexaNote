<script>
  import FileCard from '$lib/components/FileCard.svelte';
  let { data }   = $props();
  // Mapping: Defaultwerte, damit die FileCard nie NaN/Invalid Date sieht!
  let files = (data.files || []).map(f => ({
    ...f,
    url: f.url || `/uploads/${f.filename}`,
    name: f.title || f.originalName || f.filename || 'Unbenannte Datei',
    size: typeof f.size === 'number' ? f.size : 0,
    uploadedAt: f.uploadedAt ? new Date(f.uploadedAt) : null
  }));
  let error      = $state(null);
  let submitting = $state(false);
  let selected   = $state('');

  async function handleUpload(event) {
    event.preventDefault();
    submitting = true;
    error = null;
    let formData = new FormData(event.currentTarget);
    let res = await fetch('?/upload', { method: 'POST', body: formData });
    if (res.ok) {
      window.location.reload();
    } else {
      let body = await res.json();
      error = body.error || 'Upload fehlgeschlagen';
      submitting = false;
    }
  }

  function toggleFile(filename) {
    selected = selected === filename ? '' : filename;
  }
</script>

<main class="container py-5">
  <h1 class="mb-4">
    <i class="bi bi-folder me-2 text-info"></i>
    Dateien verwalten
  </h1>
  <!-- Upload-Form: jetzt mit Titel -->
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
    {#if error}
      <div class="alert alert-danger mt-3">{error}</div>
    {/if}
  </form>

  {#if files.length === 0}
    <div class="alert alert-info">Keine Dateien hochgeladen.</div>
  {:else}
    <div class="row">
      {#each files as f}
        <div class="col-12 col-md-6 col-lg-4">
          <FileCard file={f} selected={selected} onToggle={toggleFile} />
        </div>
      {/each}
    </div>
  {/if}
</main>
