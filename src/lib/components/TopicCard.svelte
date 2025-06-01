<script>
  import { goto } from '$app/navigation';

  // Direkt von topic dekonstrurieren!
  let { topic } = $props();
  let { title = '', description = '', color = '#0d6efd', children = [], _id } = topic;

  function showTopic() {
    goto(`/topics/${_id}`);
  }

  function addChild() {
    goto(`/topics/create?parentId=${_id}`);
  }
</script>

<div class="card mb-3" style="border-left:4px solid {color}">
  <div
    class="card-header d-flex justify-content-between align-items-center"
    style="background-color:{color}20"
  >
    <h5 class="card-title mb-0">{title}</h5>
    <div>
      <button class="btn btn-sm btn-outline-secondary me-1" onclick={showTopic}>
        bearbeiten
      </button>
      <button class="btn btn-sm btn-primary" onclick={addChild}>
        +
      </button>
    </div>
  </div>
  <div class="card-body">
    <p class="card-text text-muted">{description}</p>
    {#if children.length > 0}
      <ul class="list-group list-group-flush">
        {#each children as child}
          <li class="list-group-item ps-4">
            <a href={`/topics/${child._id}`}>{child.title}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
