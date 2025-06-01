import { saveFileMeta, getFiles } from '$lib/db/files.js';
import { fail } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const files = await getFiles();
  return { files };
}

/** @type {import('./$types').Actions} */
export const actions = {
  upload: async ({ request }) => {
    const form = await request.formData();
    const upload = form.get('file');
    if (!upload || !(upload instanceof File)) {
      return fail(400, { error: 'Keine Datei ausgewählt' });
    }

    // speichere Datei unter /static/uploads
    const uploadsDir = path.join(process.cwd(), 'static', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    // einzigartiger Dateiname
    const filename = `${Date.now()}-${upload.name}`;
    const filePath = path.join(uploadsDir, filename);

    // schreibe den Stream
    const buffer = await upload.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Metadaten in DB
    await saveFileMeta({
      filename,
      originalName: upload.name,
      mimeType: upload.type,
      size: upload.size
    });

    return { success: true };
  }
};
