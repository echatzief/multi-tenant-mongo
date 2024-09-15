import { MongoClient } from 'mongodb'
import { config } from '@/utils/envConfig'

export let databaseManager: MongoClient

export async function connectDB() {
  try {
    const client: MongoClient = new MongoClient(config.MONGO_URI);
    await client.connect();
    databaseManager = client;
  } catch {
    throw new Error('Woops!! Failed to connect to the database cluster');
  }
}

