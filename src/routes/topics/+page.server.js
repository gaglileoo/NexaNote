import db from '$lib/db/topics.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const allTopics = await db.getTopics(); // komplett ungefiltert
  const parents = allTopics.filter(t => !t.parentId);
  for (const parent of parents) {
    parent.children = allTopics.filter(t => t.parentId === parent._id);
  }
  return { topics: parents };
}
