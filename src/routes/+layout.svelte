<script >
  import OffcanvasSidebar from '$lib/components/OffcanvasSidebar.svelte';
  import "./styles.css";

  // Nimm alle Props und hole Dir children (die Page-Komponente) heraus,
  // die restlichen Props stecken in pageProps
  const { children, ...pageProps } = $props();
</script>

<div class="d-flex">
  <OffcanvasSidebar />
  <main class="flex-grow-1 p-4 bg-light min-vh-100">
    <div class="container">
      {@render children(pageProps)}
    </div>
  </main>
</div>
