import notesdb from '$lib/db/notes.js';

export async function load() {
  return {
    notes: await notesdb.getNotes()
  };
}

export const actions = {
  // Beispiel: Notiz anlegen
  createNote: async ({ request }) => {
    let data = await request.formData();
    let note = {
      title: data.get("title"),
      content: data.get("content"),
      topicId: data.get("topicId") || undefined
    };
    await notesdb.createNote(note);
  },
  // Beispiel: Notiz löschen
  deleteNote: async ({ request }) => {
    let data = await request.formData();
    let id = data.get("id");
    await notesdb.deleteNote(id);
  }
};
