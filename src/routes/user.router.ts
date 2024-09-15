import { Hono } from 'hono';
import { createUser, deleteUser, findUser, findUsers, updateUser } from '@/controllers/user.controller';

const userRouter = new Hono();

userRouter.get('/', findUsers);
userRouter.get('/:id', findUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export { userRouter };