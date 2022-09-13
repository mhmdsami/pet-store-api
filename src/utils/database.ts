import { dbName, dbUri } from "./config";
import { Db, MongoClient } from "mongodb";

let dbClient: MongoClient;
let db: Db;

const initializeClient = async (): Promise<MongoClient> => {
  try {
    return await MongoClient.connect(dbUri);
  } catch (e) {
    throw e;
  }
};

export const getDatabase = async (): Promise<Db> => {
  if (!db) {
    if (!dbClient) dbClient = await initializeClient();
    db = dbClient.db(dbName);
  }
  return db;
};
