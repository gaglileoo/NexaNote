<script >
  // Holt Props (Daten) vom Server – z. B. parentId, falls man ein Unterthema erstellt.
  let { data } = $props();
  let parentId = data.props?.parentId ?? '';

  // Formular-States: Speichern die Eingaben des Users (Titel, Beschreibung, Typ, Fehler, Farbe).
  let title       = $state('');
  let description = $state('');
  let type        = $state('');
  let error       = $state(null);
  let color       = $state('#00aaff'); // Standardfarbe
</script>

<main class="container py-5">
  <!-- Überschrift: Abhängig davon, ob es ein Unterthema ist (parentId existiert) -->
  <h1 class="mb-4">
    {#if parentId}
      Neues Unterthema erstellen
    {:else}
      Neues Thema erstellen
    {/if}
  </h1>

  <!-- Formular für das neue Thema. Methode POST, Bootstrap-Grid. -->
  <form runes method="post" class="row g-2">
    <!-- Titel-Eingabefeld -->
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

    <!-- Beschreibung -->
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

    <!-- Farbwahl -->
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

    <!-- Kategorieauswahl -->
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

    <!-- Unsichtbares Feld für parentId (falls es ein Unterthema ist) -->
    <input type="hidden" name="parentId" value={parentId} />

    <!-- Senden-Button -->
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Erstellen</button>
    </div>

    <!-- Fehlermeldung (falls vorhanden) -->
    {#if error}
      <div class="alert alert-danger mt-3">{error}</div>
    {/if}
  </form>
</main>
