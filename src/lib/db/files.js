// src/lib/db/files.js
import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");
const collection = db.collection("files");

// Datei-Metadaten speichern (mit optionaler Topic-Verknüpfung)
async function saveFileMeta({ filename, originalName, mimeType, size, topicId, title }) {
  const doc = {
    filename,
    originalName,
    mimeType,
    size,
    uploadedAt: new Date()
  };
  // topicId nur setzen, wenn vorhanden
  if (topicId) doc.topicId = typeof topicId === 'string' ? new ObjectId(topicId) : topicId;
  // Optionaler Titel für die Datei
  if (title) doc.title = title;
  const res = await collection.insertOne(doc);
  return {
    id: res.insertedId.toString(),
    ...doc,
    topicId: doc.topicId?.toString()
  };
}

// Alle Dateien abrufen (ohne Filter)
async function getFiles() {
  const docs = await collection.find({}).sort({ uploadedAt: -1 }).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId?.toString?.(),
    uploadedAt: doc.uploadedAt?.toISOString?.() ?? doc.uploadedAt
  }));
}

// Nur Dateien für ein bestimmtes Topic abrufen
async function getFilesByTopic(topicId) {
  if (!topicId) return [];
  const docs = await collection
    .find({ topicId: new ObjectId(topicId) })
    .sort({ uploadedAt: -1 })
    .toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    topicId: doc.topicId?.toString?.(),
    uploadedAt: doc.uploadedAt?.toISOString?.() ?? doc.uploadedAt
  }));
}

export default {
  saveFileMeta,
  getFiles,
  getFilesByTopic
};
