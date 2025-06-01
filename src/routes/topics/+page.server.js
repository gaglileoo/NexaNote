// src/routes/topics/+page.server.js
import db from '$lib/db/topics.js'; // Default-Export, wie im Movie-Beispiel

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const allTopics = await db.getTopics(); // <-- Default-Export, wie im Movie-Beispiel

    // Eltern-Themen (ohne parentId)
    const parents = allTopics.filter(t => !t.parentId);

    // Kindern jedem Eltern-Thema zuordnen (child-Array)
    for (const parent of parents) {
      parent.children = allTopics.filter(t => t.parentId === parent._id);
    }

    return { topics: parents }; // Rückgabe wie bei movies
  } catch (err) {
    return {
      topics: [],
      error: 'Konnte Themen nicht laden'
    };
  }
}
