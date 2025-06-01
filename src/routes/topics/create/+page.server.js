import db from '$lib/db/topics.js';      // Analog zum Movie-Beispiel
import { redirect, fail } from "@sveltejs/kit";

// Load-Funktion: parentId wird als prop übergeben (wie gehabt)
export function load({ url }) {
  return {
    props: {
      parentId: url.searchParams.get("parentId") ?? ""
    }
  };
}

// Actions: Hier jetzt exakt wie bei den Movies – Action-Name "create"
export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let topic = {
      title: data.get("title"),
      description: data.get("description"),
      type: data.get("type"),
      parentId: data.get("parentId") || null,
      color: data.get("color") || "#ffffff",
      createdAt: new Date().toISOString()
    };

    // Validierung wie gehabt
    if (!topic.title || !topic.type) {
      return fail(400, { error: "Titel und Kategorie sind erforderlich" });
    }

    await db.createTopic(topic);
    // Optional: direkt zur Übersicht weiterleiten
    throw redirect(303, "/topics");
  }
};
