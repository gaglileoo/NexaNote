import { error, redirect, fail } from '@sveltejs/kit';
import { getNote, deleteNote, updateNote } from '$lib/db/notes.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const note = await getNote(params.id);
  if (!note) throw error(404, 'Note nicht gefunden');
  return { note };
}

/** @type {import('./$types').Actions} */
export const actions = {
  update: async ({ request, params }) => {
    const form = await request.formData();
    const title = form.get('title')?.toString() || '';
    const content = form.get('content')?.toString() || '';

    if (!title) {
      return fail(400, { error: 'Titel ist erforderlich.' });
    }

    await updateNote(params.id, { title, content });
    return { success: true };
  },
  delete: async ({ params }) => {
    const deletedId = await deleteNote(params.id);
    if (!deletedId) throw error(500, 'Konnte Note nicht löschen');
    throw redirect(303, '/notes');
  }
};
