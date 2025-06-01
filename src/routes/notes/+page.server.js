import { getNotes } from '$lib/db/notes.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const notes = await getNotes();
    console.log('[SERVER] notes geladen:', notes.length);
    return { notes };
  } catch (err) {
    console.error('[SERVER] Fehler beim Laden der Notes:', err);
    return { notes: [], error: 'Konnte Notes nicht laden' };
  }
}
