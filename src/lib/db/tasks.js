import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");

//////////////////////////////////////////
// Tasks & Kommentare
//////////////////////////////////////////

/** Liste aller Tasks inkl. serialisierter Kommentare */
export async function getTasks() {
  const docs = await db
    .collection("tasks")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((task) => ({
    ...task,
    _id: task._id.toString(),
    topicId: task.topicId ? task.topicId.toString() : undefined, // <-- DAS FEHLT
    dueDate:
      task.dueDate instanceof Date
        ? task.dueDate.toISOString().split("T")[0]
        : task.dueDate,
    createdAt:
      task.createdAt instanceof Date
        ? task.createdAt.toISOString()
        : task.createdAt,
    completed: Boolean(task.completed),
    comments: (task.comments || []).map((c) => ({
      ...c,
      _id: c._id.toString(),
      createdAt:
        c.createdAt instanceof Date
          ? c.createdAt.toISOString()
          : c.createdAt
    }))
  }));
}

/** Eine einzelne Task laden inkl. serialisierter Kommentare */
export async function getTask(id) {
  const doc = await db
    .collection("tasks")
    .findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  return {
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId ? doc.topicId.toString() : undefined, // <-- DAS FEHLT
    dueDate:
      doc.dueDate instanceof Date
        ? doc.dueDate.toISOString().split("T")[0]
        : doc.dueDate,
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : doc.createdAt,
    completed: Boolean(doc.completed),
    comments: (doc.comments || []).map((c) => ({
      ...c,
      _id: c._id.toString(),
      createdAt:
        c.createdAt instanceof Date
          ? c.createdAt.toISOString()
          : c.createdAt
    }))
  };
}

/** Neue Task erstellen (mit leerem comments-Array) */
export async function createTask(task) {
  const toInsert = {
    ...task,
    dueDate:
      task.dueDate instanceof Date
        ? task.dueDate
        : new Date(task.dueDate),
    createdAt: new Date(),
    completed: Boolean(task.completed),
    comments: []
  };

  const result = await db.collection("tasks").insertOne(toInsert);
  return result.insertedId.toString();
}

/** Kommentar an Task anhängen */
export async function addComment(taskId, { text }) {
  const comment = {
    _id: new ObjectId(),
    text,
    createdAt: new Date()
  };

  await db.collection("tasks").updateOne(
    { _id: new ObjectId(taskId) },
    { $push: { comments: comment } }
  );

  // Rückgabe mit String-ID
  return {
    ...comment,
    _id: comment._id.toString(),
    createdAt: comment.createdAt.toISOString()
  };
}

/** Task aktualisieren */
export async function updateTask(id, { title, dueDate, completed }) {
  await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        dueDate: new Date(dueDate),
        completed
      }
    }
  );
}

/** Task löschen */
export async function deleteTask(id) {
  const result = await db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0 ? id : null;
}


