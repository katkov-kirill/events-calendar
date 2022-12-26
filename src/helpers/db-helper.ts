import { MongoClient, Document } from "mongodb";

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@events-database.cwjc6fj.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
};

const insertDocument = async <T extends Document>(
  client: MongoClient,
  collection: string,
  document: T
) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne({ ...document });
  return result;
};

const getAllDocuments = async <T extends Document>(
  client: MongoClient,
  collection: string,
  eventId: string
) => {
  const db = client.db();
  const docs = (await db
    .collection<T>(collection)
    //@ts-ignore
    .find({ eventId })
    .sort({ _id: -1 })
    .toArray()) as T[];

  return docs;
};

export { connectDatabase, insertDocument, getAllDocuments };
