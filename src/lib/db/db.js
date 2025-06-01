import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("NotionLiteDB"); // select database

//////////////////////////////////////////
// Notes
//////////////////////////////////////////

// Get all notes
async function getNotes() {
  let notes = [];
  try {
    const collection = db.collection("notes");

    // You can specify a query/filter here
    const query = {};

    // Get all objects that match the query
    notes = await collection.find(query).toArray();
    notes.forEach((note) => {
      note._id = note._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return notes;
}

// Get note by id
async function getNote(id) {
  let note = null;
  try {
    const collection = db.collection("notes");
    const query = { _id: new ObjectId(id) }; // filter by id
    note = await collection.findOne(query);

    if (!note) {
      console.log("No note with id " + id);
      // TODO: errorhandling
    } else {
      note._id = note._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
    // TODO: errorhandling
  }
  return note;
}

// create note
// Example note object:
/* 
{ 
  topicId: "1234567890",
  title: "Meeting Notes",
  content: "Besprochene Punkte ...",
  lastEdited: "2025-05-30"
} 
*/
async function createNote(note) {
  try {
    const collection = db.collection("notes");
    const result = await collection.insertOne(note);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    console.log(error.message);
    // TODO: errorhandling
  }
  return null;
}

// update note
// returns: id of the updated note or null, if note could not be updated
async function updateNote(note) {
  try {
    let id = note._id;
    delete note._id; // _id cannot be updated
    const collection = db.collection("notes");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: note });

    if (result.matchedCount === 0) {
      console.log("No note with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Note with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
    // TODO: errorhandling
  }
  return null;
}

// delete note by id
// returns: id of the deleted note or null, if note could not be deleted
async function deleteNote(id) {
  try {
    const collection = db.collection("notes");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No note with id " + id);
    } else {
      console.log("Note with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
    // TODO: errorhandling
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
    
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};



