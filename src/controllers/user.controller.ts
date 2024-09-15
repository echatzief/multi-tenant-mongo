import { Context } from 'hono'
import UserService from '@/services/users.services';
import User from '@/models/user.model';
import { ObjectId } from 'mongodb';

export const findUsers = async (c: Context) => {
  try {
    const users = await UserService.find(c);
    return c.json(users, 200);
  } catch {
    return c.json({ message: 'Failed to fetch users' }, 400)
  }
}

export const findUser = async (c: Context) => {
  try {
    const id = await c.req.param('id');
    const user = await UserService.findOne(c, { _id: new ObjectId(id) });
    return c.json(user, 200);
  } catch (error: any) {
    return c.json({ message: 'Failed to find user' }, 400)
  }
}

export const createUser = async (c: Context) => {
  try {
    const payload = await c.req.json() as unknown as User;
    const user = await UserService.create(c, payload)
    return c.json(user, 200);
  } catch (error: any) {
    return c.json({ message: 'Failed to create user' }, 400)
  }
}