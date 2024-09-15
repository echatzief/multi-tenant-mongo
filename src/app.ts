import { Hono } from 'hono';
import { userRouter } from '@/routes/users.router';
import { injectTenant } from '@/middlewares/tenant.middleware';

const app = new Hono()

app.use('*', injectTenant)

app.route('/api/users', userRouter);

export { app };