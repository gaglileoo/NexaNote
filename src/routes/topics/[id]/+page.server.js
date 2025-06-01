import db from '$lib/db/topics.js';
import dbfiles from '$lib/db/files.js';
import objdb from '$lib/db/objects.js';
import { error, redirect } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function load({ params }) {
  let topic = await db.getTopic(params.id);
  if (!topic) throw error(404, 'Topic nicht gefunden');

  // Holt die zugeordneten Aufgaben, Notizen, Dateien
  let [tasks, notes, files] = await Promise.all([
    objdb.getTasksByTopic(params.id),
    objdb.getNotesByTopic(params.id),
    // Holt alle Files, die zu dieser Topic gehören (gleiches Schema wie global)!
    dbfiles.getFilesByTopic(params.id)
  ]);

  return { topic, tasks, notes, files };
}

export const actions = {
  delete: async ({ params }) => {
    let deletedId = await db.deleteTopic(params.id);
    if (!deletedId) throw error(500, 'Konnte Topic nicht löschen');
    throw redirect(303, '/topics');
  },

  edit: async ({ request, params }) => {
    let data = await request.formData();
    let title = data.get('title')?.toString() || '';
    let description = data.get('description')?.toString() || '';
    let type = data.get('type')?.toString() || '';
    let color = data.get('color') || '#ffffff';

    if (!title || !type) {
      return { error: 'Titel und Kategorie sind erforderlich' };
    }

    await db.updateTopic(params.id, {
      title,
      description,
      type,
      color,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  },

  comment: async ({ request, params }) => {
    let data = await request.formData();
    let text = data.get('comment')?.toString();
    if (!text) return { error: 'Kommentar darf nicht leer sein' };

    await db.addComment(params.id, {
      text,
      createdAt: new Date().toISOString()
    });
    return { success: true };
  },

  // === TASK ===
  addTask: async ({ request, params }) => {
    let data = await request.formData();
    let title = data.get('title')?.toString();
    let dueDate = data.get('dueDate')?.toString();
    if (!title || !dueDate) return { error: 'Titel und Datum sind erforderlich' };
    await objdb.createTaskForTopic(params.id, { title, dueDate });
    return { success: true };
  },
  deleteTask: async ({ request }) => {
    let data = await request.formData();
    let taskId = data.get('taskId');
    if (taskId) await objdb.deleteTask(taskId);
    return { success: true };
  },

  // === NOTE ===
  addNote: async ({ request, params }) => {
    let data = await request.formData();
    let title = data.get('title')?.toString();
    let content = data.get('content')?.toString();
    if (!content) return { error: 'Notiz darf nicht leer sein' };
    await objdb.createNoteForTopic(params.id, { title, content });
    return { success: true };
  },
  deleteNote: async ({ request }) => {
    let data = await request.formData();
    let noteId = data.get('noteId');
    if (!noteId) return { error: 'ID fehlt' };
    await objdb.deleteNote(noteId);
    return { success: true };
  },

  // === FILE ===
  addFile: async ({ request, params }) => {
    let data = await request.formData();
    let file = data.get('file');
    let title = data.get('title')?.toString() || file?.name;

    if (!file || !(file instanceof File)) return { error: 'Keine Datei ausgewählt' };

    let uploadsDir = path.join(process.cwd(), 'static', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    let filename = `${Date.now()}-${file.name}`;
    let filePath = path.join(uploadsDir, filename);
    let buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // **Hier exakt dieselbe Feldstruktur wie global, + topicId**
    await dbfiles.saveFileMeta({
      filename,                   // wie in globaler Upload-Logik
      originalName: file.name,    // wie in globaler Upload-Logik
      mimeType: file.type,        // wie in globaler Upload-Logik
      size: file.size,            // wie in globaler Upload-Logik
      topicId: params.id,         // NUR für Zuordnung zur Topic
      title,                      // Optionaler Titel aus Formular
      uploadedAt: new Date()
    });

    return { success: true };
  }
};
