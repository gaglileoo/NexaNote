<script>
  let { task } = $props();
</script>

<div class="card shadow-sm rounded-4 h-100">
  <div class="card-body d-flex flex-column justify-content-between">
    <div>
      <h5 class="card-title mb-1">{task.title}</h5>
      <div class="mb-2">
        <small class="text-muted">Fällig: {new Date(task.dueDate).toLocaleDateString('de-DE')}</small>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-end">
      <span class:bg-success={task.completed} class:bg-secondary={!task.completed} class="badge">
        {task.completed ? 'Erledigt' : 'Offen'}
      </span>
      <a href={`/tasks/${task._id}`} class="btn btn-outline-primary btn-sm ms-2">Details</a>
    </div>
  </div>
</div>
