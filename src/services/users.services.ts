import { Context } from "hono";
import { Db, Filter, Document } from "mongodb";
import { databaseManager } from "@/db";
import User from "@/models/user.model";

class UserService {
  static async find(c: Context) {
    const db: Db = databaseManager.db(c.get('tenant'));
    return await db.collection('users').find().toArray();
  }

  static async findOne(c: Context, filter: Filter<Document>) {
    const db: Db = databaseManager.db(c.get('tenant'));
    return await db.collection('users').findOne(filter);
  }

  static async create(c: Context, data: User) {
    const db: Db = databaseManager.db(c.get('tenant'));
    const id = (await db.collection('users').insertOne(data)).insertedId;
    return await db.collection('users').findOne({ _id: id });
  }

  static async update(c: Context, id: string, data: User) {
    const db: Db = databaseManager.db(c.get('tenant'));
    return await db.collection('users').updateOne({ id: id }, data);
  }

  static async delete(c: Context, id: string) {
    const db: Db = databaseManager.db(c.get('tenant'));
    return await db.collection('users').deleteOne({ id: id });
  }
}

export default UserService;