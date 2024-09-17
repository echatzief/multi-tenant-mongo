import { MongoClient } from "mongodb";

export const isConnectionActive = async (client: MongoClient) => {
  try {
    await client.db().admin().ping();
    return true;
  } catch (err) {
    return false;
  }
}