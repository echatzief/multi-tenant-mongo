import { adminClient } from "@/db";

export async function initDB() {
  try {
    const adminCollections = await adminClient.db('admin').collections();
    const hasTenantsCollection = adminCollections.some((collection) => collection.collectionName === 'tenants');
    if(!hasTenantsCollection) {
      await adminClient.db('admin').createCollection('tenants');
      await adminClient.db('admin').collection('tenants').insertOne({ name: 'tenant_1' });
      await adminClient.db('admin').collection('tenants').insertOne({ name: 'tenant_2' });
    }
  } catch {
    throw new Error('Woops!! Failed to initialize database schema');
  }
}