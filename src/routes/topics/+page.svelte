<script>
  import TopicCard from '$lib/components/TopicCard.svelte';
  let { data } = $props();

  let filterType = $state('');

  // Nur Parent-Themen filtern und ggf. nach Typ weiterfiltern:
  let topics = $derived.by(() => {
    let parents = data.topics.filter(t => !t.parentId);
    if (!filterType) return parents;
    // Für maximale Sicherheit: Typ immer zu Kleinbuchstaben machen!
    return parents.filter(
      topic =>
        typeof topic.type === 'string' &&
        topic.type.toLowerCase() === filterType.toLowerCase()
    );
  });
</script>

<main class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1>
      <i class="bi bi-collection me-2 text-primary"></i>
      Themenübersicht
    </h1>
    <a href="/topics/create" class="btn btn-primary">Neues Thema</a>
  </div>
  <form class="mb-4 d-flex flex-wrap align-items-center gap-3">
    <div>
      <label for="typeFilter" class="form-label mb-0 me-2">Kategorie:</label>
      <select
        id="typeFilter"
        bind:value={filterType}
        class="form-select form-select-sm d-inline-block"
        style="width: 130px;"
      >
        <option value="">Alle</option>
        <option value="Modul">Modul</option>
        <option value="Projekt">Projekt</option>
        <option value="Übung">Übung</option>
      </select>
    </div>
    {#if filterType}
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm ms-2"
        onclick={() => filterType = ''}
      >
        Filter zurücksetzen
      </button>
    {/if}
  </form>

  {#if topics.length === 0}
    <div class="alert alert-info">Keine Themen gefunden.</div>
  {:else}
    <div class="row g-4">
      {#each topics as topic}
        <div class="col-12 col-md-6 col-lg-4">
          <TopicCard {topic} />
        </div>
      {/each}
    </div>
  {/if}
</main>
