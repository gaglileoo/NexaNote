<script>
  import OffcanvasSidebar from '$lib/components/OffcanvasSidebar.svelte';
  import "./styles.css";
  let { children } = $props();
</script>

<div class="d-flex">
  <OffcanvasSidebar />
  <main class="flex-grow-1 p-4 bg-light min-vh-100">
    <div class="container">
      {@render children()}
    </div>
  </main>
</div>
