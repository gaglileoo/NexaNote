import db from "$lib/db/tasks.js";
import { redirect, fail } from "@sveltejs/kit";

export async function load() {
  return {
    tasks: await db.getTasks()
  };
}

export const actions = {
  create: async ({ request }) => {
    let data = await request.formData();
    let title = data.get("title")?.toString() || "";
    let dueDate = data.get("dueDate")?.toString() || "";

    if (!title || !dueDate) {
      return fail(400, { error: "Titel und Datum sind erforderlich" });
    }

    await db.createTask({ title, dueDate, completed: false });
    throw redirect(303, "/tasks");
  },
  completeTask: async ({ request }) => {
    let data = await request.formData();
    let id = data.get("id");
    await db.updateTask(id, { completed: true });
  },
  uncompleteTask: async ({ request }) => {
    let data = await request.formData();
    let id = data.get("id");
    await db.updateTask(id, { completed: false });
  }
};
