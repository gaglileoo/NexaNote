import { error, redirect } from '@sveltejs/kit';
import { getTask, updateTask, deleteTask, addComment } from '$lib/db/tasks.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const task = await getTask(params.id);
  if (!task) throw error(404, 'Aufgabe nicht gefunden');
  return { task };
}

/** @type {import('./$types').Actions} */
export const actions = {
  update: async ({ request, params }) => {
    const form = await request.formData();
    const title     = form.get('title')?.toString()   || '';
    const dueDate   = form.get('dueDate')?.toString() || '';
    const completed = form.get('completed') === 'on';

    if (!title || !dueDate) {
      return { success: false, error: 'Titel und Datum sind erforderlich' };
    }

    await updateTask(params.id, { title, dueDate, completed });
    return { success: true };
  },

  delete: async ({ params }) => {
    await deleteTask(params.id);
    throw redirect(303, '/tasks');
  },

  comment: async ({ request, params }) => {
    const form = await request.formData();
    const text = form.get('text')?.toString().trim() || '';
    if (!text) {
      return { success: false, error: 'Kommentar darf nicht leer sein' };
    }
    await addComment(params.id, { text });
    return { success: true };
  }
};