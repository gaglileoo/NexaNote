<script >
  import NoteCard from '$lib/components/NoteCard.svelte';
  let { data }    = $props();
  let notes       = data.notes   || [];
  let loadError   = data.error;

  console.log('[CLIENT] notes:', notes);
</script>

<main class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
     <h1>
      <i class="bi bi-pencil-square me-2 text-success"></i>
      Notizen
    </h1>
  <a href="/notes/create" class="btn btn-primary">Neue Note</a>
  </div>

  {#if loadError}
    <div class="alert alert-danger mb-4">{loadError}</div>
  {:else if notes.length === 0}
    <div class="alert alert-info">Keine Notizen vorhanden.</div>
    <a href="/notes/create" class="btn btn-primary mt-3">Erste Note erstellen</a>
  {:else}
  <div class="row">
  {#each notes as note}
    <div class="col-12 col-md-6 col-lg-4">
      <NoteCard {note} />
    </div>
  {/each}
</div>

  {/if}
</main>
