import { createTopic } from '$lib/db/topics.js';
import { redirect, fail } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
// Load-Funktion: Übergibt parentId (z. B. wenn man ein Unterthema anlegt)
export function load({ url }) {
  return {
    props: {
      parentId: url.searchParams.get('parentId') ?? ''
    }
  };
}

// Actions: Wird beim Abschicken des Formulars ausgeführt (POST)
export const actions = {
  default: async ({ request }) => {
    // Formulardaten auslesen
    const data        = await request.formData();
    const title       = data.get('title')?.toString()       || '';
    const description = data.get('description')?.toString() || '';
    const type        = data.get('type')?.toString()        || '';
    const parentId    = data.get('parentId') || null;
    const color       = data.get('color')                    || '#ffffff';

    // Validierung: Titel und Kategorie müssen ausgefüllt sein
    if (!title || !type) {
      return fail(400, { error: 'Titel und Kategorie sind erforderlich' });
    }

    // Thema in der Datenbank speichern
    await createTopic({
      title,
      description,
      type,
      parentId,
      createdAt: new Date().toISOString(),
      color
    });

    // Nach dem Anlegen: Redirect zur Übersicht
    throw redirect(303, '/topics');
  }
};
