import { createUser, findUser, findUsers } from '@/controllers/user.controller';
import { Hono } from 'hono';

const userRouter = new Hono();

userRouter.get('/', findUsers);
userRouter.get('/:id', findUser);
userRouter.post('/', createUser);

export { userRouter };