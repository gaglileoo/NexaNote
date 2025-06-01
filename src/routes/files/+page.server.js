import filesdb from '$lib/db/files.js';
import { fail } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

// Load-Funktion (async function + let)
export async function load() {
  let filesRaw = await filesdb.getFiles();
  // Mapping: Gleiche Felder für ALLE Files, Defaultwerte!
  let files = filesRaw.map(f => ({
    ...f,
    url: `/uploads/${f.filename}`,
    name: f.title || f.originalName || f.filename || 'Unbenannte Datei',
    size: typeof f.size === 'number' ? f.size : 0,
    uploadedAt: f.uploadedAt ? new Date(f.uploadedAt) : null
  }));
  return { files };
}

export const actions = {
  upload: async ({ request }) => {
    let form = await request.formData();
    let upload = form.get('file');
    let title = form.get('title')?.toString() || upload?.name; // Titel auslesen, fallback: Dateiname

    if (!upload || !(upload instanceof File)) {
      return fail(400, { error: 'Keine Datei ausgewählt' });
    }

    // Datei im /static/uploads Ordner speichern
    let uploadsDir = path.join(process.cwd(), 'static', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    let filename = `${Date.now()}-${upload.name}`;
    let filePath = path.join(uploadsDir, filename);

    let buffer = await upload.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Metadaten in DB speichern
    await filesdb.saveFileMeta({
      filename,
      originalName: upload.name,
      mimeType: upload.type,
      size: upload.size,
      title, 
      uploadedAt: new Date() // <- immer dabei, für konsistente Anzeige!
    });

    return { success: true };
  }
};
