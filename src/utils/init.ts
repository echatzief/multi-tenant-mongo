import { databaseManager } from "@/db";

export async function initDB() {
  try {
    const adminCollections = await databaseManager.db('admin').collections();
    const hasTenantsCollection = adminCollections.some((collection) => collection.collectionName === 'tenants');
    if(!hasTenantsCollection) {
      await databaseManager.db('admin').createCollection('tenants');
      await databaseManager.db('admin').collection('tenants').insertOne({ name: 'tenant_1' });
      await databaseManager.db('admin').collection('tenants').insertOne({ name: 'tenant_2' });
    }
  } catch {
    throw new Error('Woops!! Failed to initialize database schema');
  }
}