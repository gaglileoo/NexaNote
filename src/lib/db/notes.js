import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");
const collection = db.collection("notes");

/** Alle Notes laden */
export async function getNotes() {
  try {
    const docs = await collection.find({}).toArray();
    return docs.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      // HIER! Damit topicId (falls vorhanden) ein String wird:
      topicId: doc.topicId ? doc.topicId.toString() : undefined,
      createdAt: doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : doc.createdAt
    }));
  } catch (err) {
    console.error("Fehler beim Laden der Notes:", err);
    throw err;
  }
}

/** Einzelne Note laden */
export async function getNote(id) {
  try {
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return {
      ...doc,
      _id: doc._id.toString(),
      topicId: doc.topicId ? doc.topicId.toString() : undefined,
      createdAt: doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : doc.createdAt
    };
  } catch (err) {
    console.error("Fehler beim Laden der Note:", err);
    throw err;
  }
}

/** Neue Note erstellen */
export async function createNote({ title, content, topicId }) {
  try {
    const note = {
      title,
      content,
      createdAt: new Date()
    };
    // Falls topicId mitgegeben wird (child-note), anhängen:
    if (topicId) note.topicId = new ObjectId(topicId);
    const result = await collection.insertOne(note);
    return result.insertedId.toString();
  } catch (err) {
    console.error("Fehler beim Erstellen der Note:", err);
    throw err;
  }
}

/** Note löschen */
export async function deleteNote(id) {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0 ? id : null;
  } catch (err) {
    console.error("Fehler beim Löschen der Note:", err);
    throw err;
  }

}

// lib/db/notes.js
export async function updateNote(id, { title, content }) {
  const { ObjectId } = await import('mongodb');
  const result = await db.collection('notes').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, content } }
  );
  return result.modifiedCount > 0;
}

