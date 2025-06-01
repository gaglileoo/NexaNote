import { getTopics } from '$lib/db/topics.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const topics = await getTopics();
    console.log('[SERVER] topics geladen:', topics.length);
    // direkte Rückgabe wie bei Tasks
    return { topics };
  } catch (err) {
    console.error('[SERVER] Fehler beim Laden der Topics:', err);
    return {
      topics: [],
      error: 'Konnte Themen nicht laden'
    };
  }
}
