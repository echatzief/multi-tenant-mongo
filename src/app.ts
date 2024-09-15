import { Hono } from 'hono'
import { injectTenant } from '@/middlewares/tenant.middleware'
import { userRouter } from '@/routes/user.router'

const app = new Hono()

app.use('*', injectTenant)

app.route('/api/users', userRouter)

export { app }