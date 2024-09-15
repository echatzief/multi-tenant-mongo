import type { Context } from 'hono'
import type { Db, Filter, Document, ObjectId } from 'mongodb'
import { databaseManager } from '@/db'
import type User from '@/models/user.model'

class UserService {
  static async find(c: Context) {
    const db: Db = databaseManager.db(c.get('tenant'))
    return await db.collection('users').find().toArray()
  }

  static async findOne(c: Context, filter: Filter<Document>) {
    const db: Db = databaseManager.db(c.get('tenant'))
    return await db.collection('users').findOne(filter)
  }

  static async create(c: Context, data: User) {
    const db: Db = databaseManager.db(c.get('tenant'))
    const id = (await db.collection('users').insertOne(data)).insertedId
    return await db.collection('users').findOne({ _id: id })
  }

  static async update(c: Context, id: ObjectId, data: User) {
    const db: Db = databaseManager.db(c.get('tenant'))
    await db.collection('users').updateOne({ _id: id }, { $set: data })
    return await db.collection('users').findOne({ _id: id })
  }

  static async delete(c: Context, id: ObjectId) {
    const db: Db = databaseManager.db(c.get('tenant'))
    await db.collection('users').deleteOne({ _id: id })
  }
}

export default UserService