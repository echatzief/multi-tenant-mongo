import { databaseManager } from '@/db';
import { Context, Next } from 'hono';

export const injectTenant = async (c: Context, next: Next) => {
  try {
    // Get tenant from headers
    const tenant = c.req.header('X-Tenant');
    if (!tenant) {
      return c.json({ message: 'Woops!! Provide a valid tenant' }, 401);
    }

    // Verify that the tenant is a valid database at our mongo cluster
    const databases = (await databaseManager.db().admin().listDatabases()).databases;
    const isValidTenant = databases.some((database) => database.name === tenant);
    if (!isValidTenant) {
      return c.json({ message: 'Woops!! Provide a valid tenant' }, 401);
    }

    // Set tenant to context
    c.set('tenant', tenant);
    return next();
  } catch {
    return c.json({ message: 'Woops!! Provide a valid tenant' }, 401);
  }
}