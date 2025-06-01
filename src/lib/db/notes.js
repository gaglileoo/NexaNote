import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("NotionLiteDB");
const collection = db.collection("notes");

// ---------------------------------------------
// Get all notes
// ---------------------------------------------
async function getNotes() {
  let notes = [];
  try {
    notes = await collection.find({}).toArray();
    notes.forEach(note => {
      note._id = note._id.toString();
      if (note.topicId) note.topicId = note.topicId.toString();
      if (note.createdAt instanceof Date) note.createdAt = note.createdAt.toISOString();
    });
  } catch (error) {
    console.log("Fehler beim Laden der Notes:", error.message);
  }
  return notes;
}

// ---------------------------------------------
// Get note by id
// ---------------------------------------------
async function getNote(id) {
  let note = null;
  try {
    note = await collection.findOne({ _id: new ObjectId(id) });
    if (note) {
      note._id = note._id.toString();
      if (note.topicId) note.topicId = note.topicId.toString();
      if (note.createdAt instanceof Date) note.createdAt = note.createdAt.toISOString();
    } else {
      console.log("Keine Note mit id " + id);
    }
  } catch (error) {
    console.log("Fehler beim Laden der Note:", error.message);
  }
  return note;
}

// ---------------------------------------------
// Create note (GENAU wie createMovie)
// ---------------------------------------------
async function createNote(note) {
  note.createdAt = new Date();
  try {
    if (note.topicId) note.topicId = new ObjectId(note.topicId);
    const result = await collection.insertOne(note);
    return result.insertedId.toString();
  } catch (error) {
    console.log("Fehler beim Erstellen der Note:", error.message);
  }
  return null;
}

// ---------------------------------------------
// Update note
// ---------------------------------------------
async function updateNote(note) {
  let id = note._id;
  delete note._id;
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: note }
    );
    if (result.matchedCount === 0) {
      console.log("Keine Note mit id " + id);
    } else {
      return id;
    }
  } catch (error) {
    console.log("Fehler beim Updaten der Note:", error.message);
  }
  return null;
}

// ---------------------------------------------
// Delete note
// ---------------------------------------------
async function deleteNote(id) {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      console.log("Keine Note mit id " + id);
    } else {
      return id;
    }
  } catch (error) {
    console.log("Fehler beim Löschen der Note:", error.message);
  }
  return null;
}

// ---------------------------------------------
// Default Export (Movie-DB Style)
// ---------------------------------------------
export default {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
};
