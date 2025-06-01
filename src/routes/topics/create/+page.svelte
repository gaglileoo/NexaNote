<!-- src/routes/topics/create/+page.svelte -->

<script >
  // Loader-Props unter data.props parentId
  let { data } = $props();
  console.log('🍀 data.props:', data.props);
  let parentId = data.props?.parentId ?? '';
  console.log('🍀 parentId:', parentId);

  // Formular-States
  let title       = $state('');
  let description = $state('');
  let type        = $state('');
  let error       = $state(null);
  let color       = $state('#00aaff'); // Default-Wert
</script>

<main class="container py-5">
  <h1 class="mb-4">
    {#if parentId}
      Neues Unterthema erstellen
    {:else}
      Neues Thema erstellen
    {/if}
  </h1>

  <form runes method="post" class="row g-2">
    <div class="col-12">
      <label for="title" class="form-label">Titel</label>
      <input
        id="title"
        name="title"
        bind:value={title}
        class="form-control"
        required
      />
    </div>

    <div class="col-12">
      <label for="description" class="form-label">Beschreibung</label>
      <textarea
        id="description"
        name="description"
        bind:value={description}
        class="form-control"
        rows="4"
      ></textarea>
    </div>

     <!-- Neuer Input: Farbe -->
  <div class="col-12">
    <label for="color" class="form-label">Farbe</label>
    <input
      type="color"
      id="color"
      name="color"
      bind:value={color}
      class="form-control form-control-color"
      title="Themenfarbe auswählen"
    />
  </div>

    <div class="col-12">
      <label for="type" class="form-label">Kategorie</label>
      <select
        id="type"
        name="type"
        bind:value={type}
        class="form-select"
        required
      >
        <option value="">Bitte wählen</option>
        <option value="Modul">Modul</option>
        <option value="Projekt">Projekt</option>
        <option value="Übung">Übung</option>
      </select>
    </div>

    <!-- Hidden parentId -->
    <input type="hidden" name="parentId" value={parentId} />

    <div class="col-12">
      <button type="submit" class="btn btn-primary">Erstellen</button>
    </div>

    {#if error}
      <div class="alert alert-danger mt-3">{error}</div>
    {/if}
  </form>
</main>
