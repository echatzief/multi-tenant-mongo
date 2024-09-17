import type { Context } from 'hono'
import type { Db, Filter, Document, ObjectId } from 'mongodb'
import { tenantClients } from '@/db'
import type User from '@/models/user.model'

class UserService {
  static async find(c: Context) {
    const tenant = c.get('tenant');
    const db = tenantClients[tenant].db(tenant);
    return await db.collection('users').find().toArray()
  }

  static async findOne(c: Context, filter: Filter<Document>) {
    const tenant = c.get('tenant');
    const db = tenantClients[tenant].db(tenant);
    return await db.collection('users').findOne(filter)
  }

  static async create(c: Context, data: User) {
    const tenant = c.get('tenant');
    const db = tenantClients[tenant].db(tenant);
    const id = (await db.collection('users').insertOne(data)).insertedId
    return await db.collection('users').findOne({ _id: id })
  }

  static async update(c: Context, id: ObjectId, data: User) {
    const tenant = c.get('tenant');
    const db = tenantClients[tenant].db(tenant);
    await db.collection('users').updateOne({ _id: id }, { $set: data })
    return await db.collection('users').findOne({ _id: id })
  }

  static async delete(c: Context, id: ObjectId) {
    const tenant = c.get('tenant');
    const db = tenantClients[tenant].db(tenant);
    await db.collection('users').deleteOne({ _id: id })
  }
}

export default UserService