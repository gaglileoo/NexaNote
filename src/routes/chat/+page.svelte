<!-- src/routes/chat/+page.svelte -->
<script>
  import Chat from '$lib/components/Chat.svelte';
</script>


<main class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    
    <h1>
       <i class="bi bi-chat-dots me-2 text-purple"></i>
       Gemini Chat
    </h1>
    <!-- Platz für zukünftige Buttons -->
  </div>
  <Chat />

  <!-- Dezenter Hinweis unterhalb des Chats -->
  <p class="text-muted small mt-2 text-center">
    Antworten können Fehler enthalten. Der Gemini-Chat basiert auf einem kostenlosen API-Token von Google Gemini (Testzugang).
  </p>

</main>

<style>
  .text-purple {
    color: #8f3be8 !important;
  }
</style>