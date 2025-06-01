import tasksdb from "$lib/db/tasks.js";
import { redirect, fail } from "@sveltejs/kit";

export async function load() {
  return {
    tasks: await tasksdb.getTasks()
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

    await tasksdb.createTask({ title, dueDate, completed: false });
    throw redirect(303, "/tasks");
  }
};
