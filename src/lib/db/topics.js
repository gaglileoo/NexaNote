import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");
const collection = db.collection("topics");

// Holt alle Topics
async function getTopics() {
  const docs = await collection.find({}).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    parentId: doc.parentId ? doc.parentId.toString() : null,
    comments: (doc.comments || []).map(c => ({
      ...c,
      _id: c._id?.toString?.() ?? c._id
    }))
  }));
}

// Holt ein Topic per ID
async function getTopic(id) {
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
    parentId: doc.parentId ? doc.parentId.toString() : null,
    comments: (doc.comments || []).map(c => ({
      ...c,
      _id: c._id?.toString?.() ?? c._id
    }))
  };
}

// Erstellt ein Topic
async function createTopic(topic) {
  const toInsert = {
    ...topic,
    createdAt: new Date(),
    comments: []
  };
  const result = await collection.insertOne(toInsert);
  return result.insertedId.toString();
}

// Löscht ein Topic
async function deleteTopic(id) {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0 ? id : null;
}

// Updated ein Topic
async function updateTopic(id, data) {
  if ('_id' in data) delete data._id;
  if ('createdAt' in data) delete data.createdAt;
  data.updatedAt = new Date();

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return result.modifiedCount > 0;
}

// Fügt einen Kommentar zum Topic hinzu
async function addComment(topicId, comment) {
  const commentWithId = {
    ...comment,
    _id: new ObjectId(),
    createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date()
  };

  const result = await collection.updateOne(
    { _id: new ObjectId(topicId) },
    { $push: { comments: commentWithId } }
  );
  return result.modifiedCount > 0;
}

export default {
  getTopics,
  getTopic,
  createTopic,
  deleteTopic,
  updateTopic,
  addComment
};
