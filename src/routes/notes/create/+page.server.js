import { redirect, fail } from '@sveltejs/kit';
import { createNote } from '$lib/db/notes.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const form    = await request.formData();
    const title   = form.get('title')?.toString()   || '';
    const content = form.get('content')?.toString() || '';

    if (!title) {
      return fail(400, { error: 'Titel ist erforderlich' });
    }

    await createNote({ title, content });
    throw redirect(303, '/notes');
  }
};
