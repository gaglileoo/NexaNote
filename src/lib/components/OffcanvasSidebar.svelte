  <script>
  // Variable zur Bindung des Offcanvas-Elements
  // Wird verwendet, um programmatisch auf die Sidebar-Komponente zuzugreifen
    let offcanvas;
  </script>
  
  <!-- 
  Toggle-Button für die Sidebar - Nur auf mobilen Geräten sichtbar (d-md-none)
  Dieser Button wird ab dem mittleren Breakpoint (768px) ausgeblendet
  -->
  <button
    class="btn btn-primary d-md-none mb-3"  
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#sidebar"
    aria-controls="sidebar"
    aria-label="Sidebar öffnen"
  >
    ☰              
  </button>   
  
  <!-- Offcanvas-Container, der ab md-Breakpoint statisch als Sidebar angezeigt wird -->
  <div
    class="offcanvas offcanvas-start d-md-block"
    tabindex="-1"
    id="sidebar"
    bind:this={offcanvas}
    style="visibility: visible; background-color: #e9ecef; width: 250px; "
  >

    <div class="offcanvas-header d-md-none">
      <h5 class="offcanvas-title">NexaNote</h5>        <!--  Titel der mobilen Ansicht  -->
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Schließen"
      ></button>   
    </div>

      <!-- Hauptinhalt der Sidebar -->
    <div class="offcanvas-body p-3 pt-4">  <!-- pt-4 fügt oben mehr Padding hinzu -->
      <!-- 
      Logo/Link - Nur auf Desktop sichtbar (d-none d-md-block)
      Wird in der mobilen Ansicht durch den Header-Titel ersetzt
      -->
      <a href="/" class="d-none d-md-block mb-4 text-decoration-none">
       <h4 class="m-0">NexaNote</h4>            <!--  Titel der Desktop-Ansicht mit grösserer Schrift-->
      </a>
       <!-- 
      Navigationsmenü
      Flex-Column Layout für vertikale Anordnung der Links
      -->
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
    /* 
    Media Query für Desktop-Ansicht (≥768px)
    Transformiert das Offcanvas-Element in eine permanente Sidebar
    */
    /* Damit der Offcanvas-Container auch im non-collapsed Zustand nicht abspringt */
    @media (min-width: 768px) {
      .offcanvas-start {
        position: static;                 /* Entfernt die absolute Positionierung */
        transform: none !important;       /*  Entfernt die Slide-Animation */
        visibility: visible !important;   /* Stellt sicher, dass es sichtbar ist */
        border-right: 1px solid #dee2e6;  /* Trennlinie zwischen Sidebar und Content */
      }

      /* 
      Anpassungen für den Body der Sidebar
      - Volle Höhe minus eventueller Header
      - Automatische Scrollbar bei Bedarf
      */
      .offcanvas-body {
        height: calc(100vh - 0px); /* passt sich der Viewport-Höhe an */
        overflow-y: auto;
        padding: 1rem;
      }
    }
  </style>
  