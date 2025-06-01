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

<!-- Chat & Video nebeneinander auf großen Bildschirmen -->
<div class="row mt-4 align-items-center">
  <!-- Chat-Kachel -->
  <div class="col-12 col-md-6 mb-4 mb-md-0">
    <a href="/chat" class="card text-decoration-none bg-light border-0 hover-shadow h-100">
      <div class="card-body text-center p-4">
        <div class="d-flex align-items-center justify-content-center">
          <div class="icon-wrapper bg-purple bg-opacity-10 rounded-circle p-3 me-3" style="width: 60px; height: 60px;">
            <i class="bi bi-chat-dots fs-3 text-purple"></i>
          </div>
          <div class="text-start">
            <h5 class="mb-1">AI Chat</h5>
            <p class="text-muted small mb-0">Interagiere mit unserem KI-Assistenten</p>
          </div>
          <i class="bi bi-arrow-right ms-auto fs-4 text-muted"></i>
        </div>
      </div>
    </a>
  </div>
  <!-- Video -->
  <div class="col-12 col-md-6 d-flex justify-content-center">
    <video controls style="max-width: 100%; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); width: 100%;">
      <source src="/videos/intro.mp4" type="video/mp4" />
      <track kind="captions" srclang="de" label="Deutsch" src="" default />
      Dein Browser unterstützt das Video-Tag nicht.
    </video>
  </div>
</div>
</main>

