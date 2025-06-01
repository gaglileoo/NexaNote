// src/routes/tasks/+page.server.js
import { getTasks, createTask } from '$lib/db/tasks.js';
import { redirect, fail } from '@sveltejs/kit';


export async function load() {
  const tasks = await getTasks().catch(() => []);
  return { tasks };
}

export const actions = {
  create: async ({ request }) => {
    const form = await request.formData();
    const title   = form.get('title')?.toString()   || '';
    const dueDate = form.get('dueDate')?.toString() || '';

    if (!title || !dueDate) {
      return fail(400, { error: 'Titel und Datum sind erforderlich' });
    }

    await createTask({ title, dueDate, completed: false });
    // hier wird die Seite neu geladen und load() erneut ausgeführt:
    throw redirect(303, '/tasks');
  }
};
