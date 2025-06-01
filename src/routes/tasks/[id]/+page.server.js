import tasksdb from "$lib/db/tasks.js";
import { error, redirect, fail } from "@sveltejs/kit";

export async function load({ params }) {
  let task = await tasksdb.getTask(params.id);
  if (!task) throw error(404, "Aufgabe nicht gefunden");
  return { task };
}

export const actions = {
  update: async ({ request, params }) => {
    let data = await request.formData();
    let title = data.get("title")?.toString() || "";
    let dueDate = data.get("dueDate")?.toString() || "";
    let completed = data.get("completed") === "on";

    if (!title || !dueDate) {
      return fail(400, { error: "Titel und Datum sind erforderlich" });
    }

    await tasksdb.updateTask(params.id, { title, dueDate, completed });
    return { success: true };
  },

  delete: async ({ request, params }) => {
    await tasksdb.deleteTask(params.id);
    throw redirect(303, "/tasks");
  },

  comment: async ({ request, params }) => {
    let data = await request.formData();
    let text = data.get("text")?.toString().trim() || "";
    if (!text) {
      return fail(400, { error: "Kommentar darf nicht leer sein" });
    }
    await tasksdb.addComment(params.id, { text });
    return { success: true };
  }
};
