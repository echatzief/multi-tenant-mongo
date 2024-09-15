import { databaseManager } from '@/db';
import { Context, Next } from 'hono';

export const injectTenant = async (c: Context, next: Next) => {
  try {
    const tenant = c.req.header('X-Tenant');
    if (!tenant) {
      return c.json({ message: 'Woops!! Provide a valid tenant' }, 401);
    }
    const databases = (await databaseManager.db().admin().listDatabases()).databases;
    const isValidTenant = databases.some((database) => database.name === tenant);
    if (!isValidTenant) {
      return c.json({ message: 'Woops!! Provide a valid tenant' }, 401);
    }
    c.set('tenant', tenant);
    return next();
  } catch (error) {
    return c.json({ message: 'Woops!! Provide a valid tenant' }, 401);
  }
}