<script >
  import FileCard from '$lib/components/FileCard.svelte';
  let { data }    = $props();
  let files        = data.files   || [];
  let error       = $state(null);
  let submitting  = $state(false);
  let selected    = $state('');

  async function handleUpload(event) {
    event.preventDefault();
    submitting = true;
    error = null;
    const formData = new FormData(event.currentTarget);
    const res = await fetch('?/upload', { method: 'POST', body: formData });
    if (res.ok) {
      window.location.reload();
    } else {
      const body = await res.json();
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
  <!-- Upload-Form -->
  <form runes onsubmit={handleUpload} class="mb-4">
    <div class="mb-3">
      <input type="file" name="file" class="form-control" required />
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
