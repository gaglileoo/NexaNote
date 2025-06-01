import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");

const tasksCol = db.collection("tasks");
const notesCol = db.collection("notes");
const filesCol = db.collection("files");

// =========== TASKS ===================

async function createTask({ title, dueDate, completed = false, topicId }) {
  const doc = {
    title,
    dueDate: dueDate ? new Date(dueDate) : null,
    completed: Boolean(completed),
    comments: [],
    createdAt: new Date()
  };
  if (topicId) doc.topicId = new ObjectId(topicId);
  const res = await tasksCol.insertOne(doc);
  return res.insertedId.toString();
}

async function createTaskForTopic(topicId, { title, dueDate, completed = false }) {
  return await createTask({ title, dueDate, completed, topicId });
}

async function getTasksByTopic(topicId) {
  const docs = await tasksCol.find({ topicId: new ObjectId(topicId) }).toArray();
  return docs.map(task => ({
    ...task,
    _id: task._id.toString(),
    topicId: task.topicId?.toString(),
    dueDate: task.dueDate instanceof Date
      ? task.dueDate.toISOString().split("T")[0]
      : (task.dueDate || ''),
    createdAt: task.createdAt instanceof Date
      ? task.createdAt.toISOString()
      : task.createdAt,
    completed: Boolean(task.completed),
    comments: (task.comments || []).map(c => ({
      ...c,
      _id: c._id.toString(),
      createdAt: c.createdAt instanceof Date
        ? c.createdAt.toISOString()
        : c.createdAt
    }))
  }));
}

async function getTasks() {
  const docs = await tasksCol.find().sort({ createdAt: -1 }).toArray();
  return docs.map(task => ({
    ...task,
    _id: task._id.toString(),
    topicId: task.topicId?.toString(),
    dueDate: task.dueDate instanceof Date
      ? task.dueDate.toISOString().split("T")[0]
      : (task.dueDate || ''),
    createdAt: task.createdAt instanceof Date
      ? task.createdAt.toISOString()
      : task.createdAt,
    completed: Boolean(task.completed),
    comments: (task.comments || []).map(c => ({
      ...c,
      _id: c._id.toString(),
      createdAt: c.createdAt instanceof Date
        ? c.createdAt.toISOString()
        : c.createdAt
    }))
  }));
}

async function getTask(id) {
  const doc = await tasksCol.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId?.toString(),
    dueDate: doc.dueDate instanceof Date
      ? doc.dueDate.toISOString().split("T")[0]
      : (doc.dueDate || ''),
    createdAt: doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : doc.createdAt,
    completed: Boolean(doc.completed),
    comments: (doc.comments || []).map(c => ({
      ...c,
      _id: c._id.toString(),
      createdAt: c.createdAt instanceof Date
        ? c.createdAt.toISOString()
        : c.createdAt
    }))
  };
}

async function updateTask(id, { title, dueDate, completed }) {
  await tasksCol.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        dueDate: dueDate ? new Date(dueDate) : null,
        completed
      }
    }
  );
}

async function deleteTask(id) {
  const res = await tasksCol.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

async function addCommentToTask(taskId, { text }) {
  const comment = {
    _id: new ObjectId(),
    text,
    createdAt: new Date()
  };
  await tasksCol.updateOne(
    { _id: new ObjectId(taskId) },
    { $push: { comments: comment } }
  );
  return {
    ...comment,
    _id: comment._id.toString(),
    createdAt: comment.createdAt.toISOString()
  };
}

// =========== NOTES ===================

async function createNoteForTopic(topicId, { title, content }) {
  const res = await notesCol.insertOne({
    topicId: new ObjectId(topicId),
    title,
    content,
    createdAt: new Date()
  });
  return res.insertedId.toString();
}

async function getNotesByTopic(topicId) {
  const docs = await notesCol.find({ topicId: new ObjectId(topicId) }).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId?.toString(),
    createdAt: doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : doc.createdAt
  }));
}

async function getAllNotes() {
  const docs = await notesCol.find({}).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId?.toString(),
    createdAt: doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : doc.createdAt
  }));
}

async function updateNote(id, update) {
  const res = await notesCol.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...update, updatedAt: new Date() } }
  );
  return res.modifiedCount > 0;
}

async function deleteNote(id) {
  const res = await notesCol.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

// =========== FILES ===================

async function createFileForTopic(topicId, { name, url }) {
  const res = await filesCol.insertOne({
    topicId: new ObjectId(topicId),
    name,
    url,
    createdAt: new Date()
  });
  return res.insertedId.toString();
}

async function getFilesByTopic(topicId) {
  const docs = await filesCol.find({ topicId: new ObjectId(topicId) }).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId?.toString(),
    createdAt: doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : doc.createdAt
  }));
}

async function getAllFiles() {
  const docs = await filesCol.find({}).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId?.toString(),
    createdAt: doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : doc.createdAt
  }));
}

async function updateFile(id, update) {
  const res = await filesCol.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...update, updatedAt: new Date() } }
  );
  return res.modifiedCount > 0;
}

async function deleteFile(id) {
  const res = await filesCol.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

// =================== EXPORT DEFAULT ===================
export default {
  createTask,
  createTaskForTopic,
  getTasksByTopic,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  addCommentToTask,

  createNoteForTopic,
  getNotesByTopic,
  getAllNotes,
  updateNote,
  deleteNote,

  createFileForTopic,
  getFilesByTopic,
  getAllFiles,
  updateFile,
  deleteFile
};
