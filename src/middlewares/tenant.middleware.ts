import type { Context, Next } from 'hono'
import { adminClient, tenantClients } from '@/db'
import { isConnectionActive } from '@/utils/client'
import { MongoClient } from 'mongodb'
import { config } from '@/utils/envConfig'

export const injectTenant = async (c: Context, next: Next) => {
  try {
    // Get tenant from headers
    const tenant = c.req.header('X-Tenant')
    if (!tenant) {
      return c.json({ message: 'Woops!! Provide a valid tenant' }, 401)
    }

    // Verify that the tenant is a valid database at our mongo cluster
    const databases = (await adminClient.db().admin().listDatabases()).databases
    const isValidTenant = databases.some((database) => database.name === tenant)
    if (!isValidTenant) {
      return c.json({ message: 'Woops!! Provide a valid tenant' }, 401)
    }
   
    const hasEstablishedConnection = Object.keys(tenantClients).some((name) => name === tenant);
    const hasActiveClient = await isConnectionActive(tenantClients[tenant]) 
    const hasActiveConnection = hasEstablishedConnection && hasActiveClient;

    if(!hasActiveConnection) {
      // Create a new connection
      tenantClients[tenant] = new MongoClient(config.MONGO_URI)
      await tenantClients[tenant].connect();

      // Close connection after OPEN_CONNECTION_SECONDS time
      setTimeout(async () => {
        await tenantClients[tenant].close();
        console.log(`Closing connection after ${config.OPEN_CONNECTION_SECONDS} seconds for \"${tenant}\"`)
      }, config.OPEN_CONNECTION_SECONDS * 1000)
    }

    // Set tenant to context
    c.set('tenant', tenant)
    return next()
  } catch {
    return c.json({ message: 'Woops!! Provide a valid tenant' }, 401)
  }
}