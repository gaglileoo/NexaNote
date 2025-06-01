import notesdb from '$lib/db/notes.js';
import { redirect, fail, error } from '@sveltejs/kit';

export async function load({ params }) {
  return {
    note: await notesdb.getNote(params.id)
  };
}

export const actions = {
  update: async ({ request, params }) => {
    let form = await request.formData();
    let note = {
      _id: params.id,
      title: form.get('title')?.toString() || '',
      content: form.get('content')?.toString() || ''
    };
    if (!note.title) {
      return fail(400, { error: 'Titel ist erforderlich.' });
    }
    await notesdb.updateNote(note);
    return { success: true };
  },
  delete: async ({ request }) => {
    let form = await request.formData();
    let id = form.get('id');
    await notesdb.deleteNote(id);
    throw redirect(303, '/notes');
  }
};
