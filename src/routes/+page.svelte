<script>
  import FeatureTile from '$lib/components/FeatureTitle.svelte';
</script>

<main class="container py-5">
  <div class="text-center mb-5">
    <h1 class="display-4 mb-3">
      Willkommen bei NexaNote <i class="bi bi-journal-bookmark"></i>
    </h1>
    <p class="lead text-muted mb-4">
      Deine schlanke Organisationsplattform - minimalistisch & effizient
    </p>
  </div>

  <!-- Feature-Kacheln mit Icons -->
  <div class="row g-4">
    <div class="col-md-6 col-lg-3">
      <FeatureTile
        href="/topics"
        iconClass="bi-collection"
        bgClass="bg-primary bg-opacity-10"
        iconColorClass="text-primary"
        title="Topics"
        text="Organisiere deine Projekte und Themen"
      />
    </div>
    <div class="col-md-6 col-lg-3">
      <FeatureTile
        href="/notes"
        iconClass="bi-pencil-square"
        bgClass="bg-success bg-opacity-10"
        iconColorClass="text-success"
        title="Notizen"
        text="Erfasse deine Gedanken"
      />
    </div>
    <div class="col-md-6 col-lg-3">
      <FeatureTile
        href="/files"
        iconClass="bi-folder"
        bgClass="bg-info bg-opacity-10"
        iconColorClass="text-info"
        title="Dateien"
        text="Verwalte deine Dokumente"
      />
    </div>
    <div class="col-md-6 col-lg-3">
      <FeatureTile
        href="/tasks"
        iconClass="bi-check-circle"
        bgClass="bg-warning bg-opacity-10"
        iconColorClass="text-warning"
        title="Aufgaben"
        text="Verfolge deine To-Dos"
      />
    </div>
  </div>

<div class="container my-5">
  <div class="text-center mb-4">
    <h2 class="h4 text-secondary fw-normal">
      Produktivität, die Spaß macht
    </h2>
  </div>
  <div class="row g-4 align-items-stretch justify-content-center">
    <!-- AI Chat Card -->
    <div class="col-12 col-md-5 d-flex">
      <a href="/chat" class="card flex-fill text-decoration-none shadow-sm" style="border-radius:18px;">
        <div class="card-body text-center py-5 d-flex flex-column justify-content-center">
          <i class="bi bi-chat-dots fs-1 text-primary mb-3"></i>
          <h4 class="fw-bold mb-2">AI Chat</h4>
          <p class="text-muted mb-0">Interagiere mit unserem KI-Assistenten</p>
        </div>
      </a>
    </div>
    <!-- Bild-Card -->
    <div class="col-12 col-md-5 d-flex">
      <div class="card flex-fill shadow-sm border-0 d-flex align-items-center justify-content-center" style="border-radius:18px;">
        <img
          src="/image.png"
          alt="NexaNote Illustration"
          style="max-width: 90%; max-height: 260px; border-radius:16px; object-fit: contain;"
          class="img-fluid my-3 mx-auto d-block"        />
      </div>
    </div>
  </div>
</div>

</main>

