import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");

// Get all tasks
async function getTasks() {
  let tasks = [];
  try {
    const collection = db.collection("tasks");
    tasks = await collection.find({}).toArray();
    tasks.forEach((task) => {
      task._id = task._id.toString();

      // Falls task.topicId ein ObjectId ist
      if (task.topicId && typeof task.topicId !== 'string') {
        task.topicId = task.topicId.toString();
      }

      // Alle Kommentare _id zu String machen
      if (Array.isArray(task.comments)) {
        task.comments = task.comments.map((c) => ({
          ...c,
          _id: c._id?.toString?.() ?? c._id
        }));
      }
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return tasks;
}
// Get one task by id
async function getTask(id) {
  const doc = await db
    .collection("tasks")
    .findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  return {
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId ? doc.topicId.toString() : undefined,
    comments: (doc.comments || []).map((c) => ({
      ...c,
      _id: c._id?.toString?.() ?? c._id
    }))
  };
}

// Create a new task
async function createTask(task) {
  const toInsert = {
    ...task,
    createdAt: new Date(),
    completed: Boolean(task.completed),
    comments: []
  };
  const result = await db.collection("tasks").insertOne(toInsert);
  return result.insertedId.toString();
}

// Add comment to task
async function addComment(taskId, { text }) {
  const comment = {
    _id: new ObjectId(),
    text,
    createdAt: new Date()
  };

  await db.collection("tasks").updateOne(
    { _id: new ObjectId(taskId) },
    { $push: { comments: comment } }
  );

  return {
    ...comment,
    _id: comment._id.toString()
  };
}

// Update a task
async function updateTask(id, { title, dueDate, completed }) {
  await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        dueDate,
        completed
      }
    }
  );
}

// Delete a task
async function deleteTask(id) {
  const result = await db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0 ? id : null;
}

export default {
  getTasks,
  getTask,
  createTask,
  addComment,
  updateTask,
  deleteTask
};
