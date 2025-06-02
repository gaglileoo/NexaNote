<script>
  import TaskCard from '$lib/components/TaskCard.svelte';
  let title   = $state('');
  let dueDate = $state('');

  let { data }  = $props();
  let loadError  = data.error;

  // Filter-State: false = alle, true = nur erledigte
  let filterByCompleted = $state(false);

  // Abgeleitete Liste der Tasks, abhängig vom Filter
  let tasks = $derived.by(() => {
    if (filterByCompleted) {
      return data.tasks.filter(task => task.completed === false);
    }
    return data.tasks;
  });
</script>

<main class="container py-5">
  <h1 class="mb-4">
    <i class="bi bi-check-circle me-2 text-warning"></i>
    Aufgaben
  </h1>

  {#if loadError}
    <div class="alert alert-danger mb-4">{loadError}</div>
  {/if}

  <form method="post" action="?/create" class="row g-2 align-items-end mb-4">
    <div class="col-md-6">
      <label for="title" class="form-label">Titel</label>
      <input
        id="title"
        name="title"
        bind:value={title}
        class="form-control"
        required
      />
    </div>

    <div class="col-md-4">
      <label for="dueDate" class="form-label">Fälligkeitsdatum</label>
      <input
        id="dueDate"
        name="dueDate"
        type="date"
        bind:value={dueDate}
        class="form-control"
        required
      />
    </div>

    <div class="col-md-2">
      <button type="submit" class="btn btn-primary w-100">Erstellen</button>
    </div>
  </form>

  <div class="form-check mb-4">
    <input
      class="form-check-input"
      type="checkbox"
      bind:checked={filterByCompleted}
      id="filter"
    />
    <label class="form-check-label" for="filter">
      Nur offene Tasks anzeigen
    </label>
  </div>

  {#if tasks.length === 0}
    <div class="alert alert-info">Keine Aufgaben vorhanden.</div>
  {:else}
    <div class="row g-3">
      {#each tasks as task}
        <div class="col-12 col-md-6 col-lg-4">
          <TaskCard {task} />
        </div>
      {/each}
    </div>
  {/if}
</main>
