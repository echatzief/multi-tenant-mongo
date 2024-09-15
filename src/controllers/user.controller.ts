import type { Context } from 'hono'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import type User from '@/models/user.model'
import UserService from '@/services/users.services'
import { userShema } from '@/validations/user.validation'

export const findUsers = async (c: Context) => {
  try {
    const users = await UserService.find(c)
    return c.json(users, 200)
  } catch {
    return c.json({ message: 'Failed to fetch users' }, 400)
  }
}

export const findUser = async (c: Context) => {
  try {
    const id = await c.req.param('id')
    if (!id) {
      return c.json({ message: 'Woops!! Provide a valid id' }, 400)
    }
    const user = await UserService.findOne(c, { _id: new ObjectId(id) })
    return c.json(user, 200)
  } catch {
    return c.json({ message: 'Failed to find user' }, 400)
  }
}

export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json()
    const payload = await userShema.parseAsync(body) as User
    const user = await UserService.create(c, payload)
    return c.json(user, 200)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: 'Woops! Provide valid payload' }, 400)
    }
    return c.json({ message: 'Failed to create user' }, 400)
  }
}

export const updateUser = async (c: Context) => {
  try {
    const id = await c.req.param('id')
    if (!id) {
      return c.json({ message: 'Woops!! Provide a valid id' }, 400)
    }
    const body = await c.req.json()
    const payload = await userShema.parseAsync(body) as User
    const user = await UserService.update(c, new ObjectId(id), payload)
    return c.json(user, 200)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: 'Woops! Provide valid payload' }, 400)
    }
    return c.json({ message: 'Failed to update user' }, 400)
  }
}

export const deleteUser = async (c: Context) => {
  try {
    const id = await c.req.param('id')
    if (!id) {
      return c.json({ message: 'Woops!! Provide a valid id' }, 400)
    }
    const user = await UserService.findOne(c, { _id: new ObjectId(id) })
    if (!user) {
      return c.json({ message: 'Woops!! No valid user to delete' }, 404)
    }
    await UserService.delete(c, new ObjectId(id))
    return c.json({}, 200)
  } catch {
    return c.json({ message: 'Failed to delete user' }, 400)
  }
}