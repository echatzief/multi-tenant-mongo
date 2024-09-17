import { MongoClient } from 'mongodb'
import { config } from '@/utils/envConfig'

export let adminClient: MongoClient

export let tenantClients: Record<string, MongoClient> = {};

export async function connectDB() {
  try {

    // Create a connection for admin
    const client: MongoClient = new MongoClient(config.MONGO_URI);
    await client.connect();
    adminClient = client;

    // Create a connection for each tenant at the database
    const databases = (await client.db().admin().listDatabases()).databases;
    const tenantDatabases = databases.filter((database) => database.name.startsWith('tenant'))
    for (let i = 0; i < tenantDatabases.length; i++) {
      const name = tenantDatabases[i].name;
      tenantClients[name] = new MongoClient(config.MONGO_URI)
      await tenantClients[name].connect();

      // close connection after OPEN_CONNECTION_SECONDS time
      setTimeout(async () => {
        await tenantClients[name].close();
        console.log(`Closing connection after ${config.OPEN_CONNECTION_SECONDS} seconds for \"${name}\"`)
      }, config.OPEN_CONNECTION_SECONDS * 1000)
    }
  } catch {
    throw new Error('Woops!! Failed to connect to the database cluster');
  }
}

