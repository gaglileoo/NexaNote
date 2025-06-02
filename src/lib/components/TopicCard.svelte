<script>
  import { goto } from '$app/navigation';
  let { topic } = $props();

  function showTopic() {
    goto(`/topics/${topic._id}`);
  }

  function addChild() {
    goto(`/topics/create?parentId=${topic._id}`);
  }
</script>

<div class="card mb-3" style="border-left:4px solid {topic.color || '#0d6efd'}">
  <div
    class="card-header d-flex justify-content-between align-items-center"
    style="background-color:{(topic.color || '#0d6efd')}20"
  >
    <h5 class="card-title mb-0">{topic.title}</h5>
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
    <p class="card-text text-muted">{topic.description}</p>
    {#if Array.isArray(topic.children) && topic.children.length > 0}
      <ul class="list-group list-group-flush">
        {#each topic.children as child}
          <li class="list-group-item ps-4">
            <a href={`/topics/${child._id}`}>{child.title}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
