import { error, redirect } from '@sveltejs/kit';
import { getTopic, deleteTopic, updateTopic, addComment } from '$lib/db/topics.js';
import { getTasksByTopic, createTaskForTopic,deleteTask } from '$lib/db/objects.js';
import { getNotesByTopic, createNoteForTopic, deleteNote } from '$lib/db/objects.js';
import { getFilesByTopic, createFileForTopic } from '$lib/db/objects.js';

export async function load({ params }) {
  const topic = await getTopic(params.id);
  if (!topic) throw error(404, 'Topic nicht gefunden');

  // Diese Zeile holt die zugeordneten Aufgaben, Notizen, Dateien
  const [tasks, notes, files] = await Promise.all([
    getTasksByTopic(params.id),
    getNotesByTopic(params.id),
    getFilesByTopic(params.id)
  ]);

  return { topic, tasks, notes, files };
}

export const actions = {
  delete: async ({ params }) => {
    const deletedId = await deleteTopic(params.id);
    if (!deletedId) throw error(500, 'Konnte Topic nicht löschen');
    throw redirect(303, '/topics');
  },
  edit: async ({ request, params }) => {
    const data = await request.formData();
    const title = data.get('title')?.toString() || '';
    const description = data.get('description')?.toString() || '';
    const type = data.get('type')?.toString() || '';
    const color = data.get('color') || '#ffffff';

    if (!title || !type) {
      return { error: 'Titel und Kategorie sind erforderlich' };
    }

    await updateTopic(params.id, {
      title,
      description,
      type,
      color,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  },
  comment: async ({ request, params }) => {
    const data = await request.formData();
    const text = data.get('comment')?.toString();
    if (!text) return { error: 'Kommentar darf nicht leer sein' };

    await addComment(params.id, {
      text,
      createdAt: new Date().toISOString()
    });
    return { success: true };
  },

  // === NEU: TASK ===
addTask: async ({ request, params }) => {
  const data = await request.formData();
  const title = data.get('title')?.toString();
  const dueDate = data.get('dueDate')?.toString();
  if (!title || !dueDate) return { error: 'Titel und Datum sind erforderlich' };
  await createTaskForTopic(params.id, { title, dueDate });
  return { success: true };
},
deleteTask: async ({ request }) => {
  const data = await request.formData();
  const taskId = data.get('taskId');
  if (taskId) await deleteTask(taskId); // deine deleteTask-Funktion aus der DB
  return { success: true };
},

// === NEU: NOTE ===
  addNote: async ({ request, params }) => {
  const data = await request.formData();
  const title = data.get('title')?.toString();
  const content = data.get('content')?.toString();
  if (!content) return { error: 'Notiz darf nicht leer sein' };
  await createNoteForTopic(params.id, { title, content });
  return { success: true };
},


  // ... andere Actions
  deleteNote: async ({ request }) => {
    const data = await request.formData();
    const noteId = data.get('noteId');
    if (!noteId) return { error: 'ID fehlt' };

    await deleteNote(noteId);
    return { success: true };
  },



  // === NEU: FILE ===
  addFile: async ({ request, params }) => {
    const data = await request.formData();
    const file = data.get('file');
    if (!file) return { error: 'Keine Datei ausgewählt' };
    // Beispiel: Du speicherst das File woanders und bekommst eine URL zurück
    // Hier eine Dummy-Implementierung (ersetze mit echter Logik!):
    const url = `/uploads/${file.name}`; // Oder deinen echten Upload-Prozess
    await createFileForTopic(params.id, { name: file.name, url });
    return { success: true };
  }
};
