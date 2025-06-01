// src/lib/db/topics.js
import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");
const collection = db.collection("topics");

export async function getTopics() {
  const docs = await collection.find({}).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    parentId: doc.parentId ? doc.parentId.toString() : null,
    // falls doc.createdAt ein Date ist → String, sonst unverändert
    createdAt: doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : doc.createdAt
  }));
}

export async function getTopic(id) {
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
    parentId: doc.parentId ? doc.parentId.toString() : null,
    createdAt: doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : doc.createdAt
  };
}

export async function createTopic(topic) {
  const result = await collection.insertOne({ ...topic, createdAt: new Date() });
  return result.insertedId.toString();
}

export async function deleteTopic(id) {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0 ? id : null;
}


// Fügt in src/lib/db/topics.js ein:
export async function updateTopic(id, data) {
  // Entferne Felder, die nicht überschrieben werden dürfen
  if ('_id' in data) delete data._id;
  if ('createdAt' in data) delete data.createdAt;
  // updatedAt setzen (optional, aber sinnvoll)
  data.updatedAt = new Date();

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return result.modifiedCount > 0;
}
// Kommentare als Array im Topic speichern:
export async function addComment(topicId, comment) {
  // Füge createdAt als Date ein, falls nicht vorhanden
  if (!comment.createdAt) comment.createdAt = new Date();

  const result = await collection.updateOne(
    { _id: new ObjectId(topicId) },
    { $push: { comments: comment } }
  );
  return result.modifiedCount > 0;
}
