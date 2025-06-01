<script>
  let offcanvas;
</script>

<!-- TOGGLE-BUTTON für MOBILE, oben rechts -->
<button
  class="btn btn-primary d-md-none position-absolute"
  type="button"
  data-bs-toggle="offcanvas"
  data-bs-target="#sidebar"
  aria-controls="sidebar"
  aria-label="Sidebar öffnen"
  style="top: 20px; left: 20px; z-index: 1040;"
  
>
  ☰
</button>

<!-- SIDEBAR / OFFCANVAS -->
<div
  class="offcanvas offcanvas-start"
  tabindex="-1"
  id="sidebar"
  bind:this={offcanvas}
  style="background-color: #e9ecef; width: 250px;"
>
  <!-- MOBIL: Header mit Close-Button -->
  <div class="offcanvas-header d-md-none">
    <h5 class="offcanvas-title">NexaNote</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Schließen"></button>
  </div>
  <!-- SIDEBAR-INHALT -->
  <div class="offcanvas-body p-3 pt-4">
    <a href="/" class="d-none d-md-block mb-4 text-decoration-none">
      <h4 class="m-0">NexaNote</h4>
    </a>
    <nav class="nav flex-column">
      <a class="nav-link" href="/topics">Topics</a>
      <a class="nav-link" href="/notes">Notizen</a>
      <a class="nav-link" href="/files">Dateien</a>
      <a class="nav-link" href="/tasks">Aufgaben</a>
      <a class="nav-link" href="/chat">Chat</a>
    </nav>
  </div>
</div>

<style>

  /* Desktop: Sidebar immer sichtbar, nicht mehr "offcanvas" */
  @media (min-width: 768px) {
    #sidebar.offcanvas-start {
      position: static;
      transform: none !important;
      display: block !important;
      border-right: 1px solid #dee2e6;
      visibility: visible !important;
    }
    .offcanvas-header.d-md-none {
      display: none !important;
    }
    .offcanvas-body {
      height: 100vh;
      overflow-y: auto;
      padding: 1rem;
    }
    /* Toggle-Button ausblenden */
    button.d-md-none {
      display: none !important;
    }
  }

  .offcanvas {
    background-color: #e9ecef !important;
  }
</style>
