<script>
  let messages = $state([]);
  let userInput = $state('');
  let isLoading = $state(false);
  let error = $state(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage = userInput.trim();
    messages = [...messages, {
      role: "user",
      content: userMessage,
      timestamp: new Date()
    }];

    userInput = "";
    isLoading = true;
    error = null;

    try {
      const response = await fetch('/chat/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.status}`);
      }

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
                      || "Keine Antwort erhalten";

      messages = [...messages, {
        role: "model",
        content: aiResponse,
        timestamp: new Date()
      }];

    } catch (e) {
      error = `Fehler: ${e.message}`;
      console.error('API Fehler:', e);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="card">
  <div class="card-body">
    <!-- Nachrichtenbereich -->
    <div class="mb-3 p-3 border rounded" style="height: 60vh; overflow-y: auto;">
      {#each messages as message}
        <div class="d-flex mb-3 {message.role === 'user' ? 'justify-content-end' : 'justify-content-start'}">
          <div class="{message.role === 'user' ? 'bg-primary text-white' : 'bg-light'} p-3 rounded">
            {message.content}
          </div>
        </div>
      {/each}

      {#if isLoading}
        <div class="d-flex justify-content-start">
          <div class="p-3 rounded bg-light">
            <div class="spinner-border spinner-border-sm"></div>
            <span class="ms-2">Gemini antwortet…</span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Eingabebereich -->
    <form onsubmit={handleSubmit} class="d-flex gap-2">
      <input
        type="text"
        bind:value={userInput}
        placeholder="Nachricht eingeben…"
        class="form-control"
        disabled={isLoading}
      />
      <button
        type="submit"
        class="btn btn-primary"
        disabled={isLoading || !userInput.trim()}
      >
        {#if isLoading}
          <span class="spinner-border spinner-border-sm"></span>
        {:else}
         <i class="bi bi-send-fill"></i>
          Senden
        {/if}
      </button>
    </form>

    {#if error}
      <div class="alert alert-danger mt-3">
        {error}
        <button onclick={() => error = null} class="btn btn-sm btn-light ms-2">
          Schließen
        </button>
      </div>
    {/if}
  </div>
</div>
