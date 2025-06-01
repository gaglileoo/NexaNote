// src/lib/db/files.js
import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";
import path from "path";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NotionLiteDB");
const collection = db.collection("files");

export async function saveFileMeta({ filename, originalName, mimeType, size }) {
  const doc = {
    filename,
    originalName,
    mimeType,
    size,
    uploadedAt: new Date()
  };
  const res = await collection.insertOne(doc);
  return { id: res.insertedId.toString(), ...doc };
}

export async function getFiles() {
  const docs = await collection.find({}).sort({ uploadedAt: -1 }).toArray();
  return docs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    uploadedAt: doc.uploadedAt.toISOString()
  }));
}
