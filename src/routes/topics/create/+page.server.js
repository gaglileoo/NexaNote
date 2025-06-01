// src/routes/topics/create/+page.server.js
import { createTopic } from '$lib/db/topics.js';
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
  // parentId als Prop zurückgeben
  return {
    props: {
      parentId: url.searchParams.get('parentId') ?? ''
    }
  };
}

export const actions = {
  default: async ({ request }) => {
    const data        = await request.formData();
    const title       = data.get('title')?.toString()       || '';
    const description = data.get('description')?.toString() || '';
    const type        = data.get('type')?.toString()        || '';
    const parentId    = data.get('parentId') || null;
    const color       = data.get('color')                    || '#ffffff';

    if (!title || !type) {
      return fail(400, { error: 'Titel und Kategorie sind erforderlich' });
    }

    await createTopic({
      title,
      description,
      type,
      parentId,
      createdAt: new Date().toISOString(),
      color
    });

    // nach dem Anlegen zurück zur Übersicht
    throw redirect(303, '/topics');
  }
};
