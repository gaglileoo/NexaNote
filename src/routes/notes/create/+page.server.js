import { redirect, fail } from '@sveltejs/kit';
import notesdb from '$lib/db/notes.js';

export const actions = {
  createNote: async ({ request }) => {
    let form = await request.formData();
    let title = form.get('title')?.toString() || '';
    let content = form.get('content')?.toString() || '';

    if (!title) {
      return fail(400, { error: 'Titel ist erforderlich' });
    }

    await notesdb.createNote({ title, content });
    throw redirect(303, '/notes');
  }
};
