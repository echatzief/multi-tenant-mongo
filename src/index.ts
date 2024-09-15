import { serve } from '@hono/node-server'
import { app } from '@/app'
import { connectDB } from '@/db'
import { config } from '@/utils/envConfig'


const startServer = async () => {

  await connectDB()

  console.log(`App started at http://localhost:${config.SERVER_PORT}`)

  serve({
    fetch: app.fetch,
    port: config.SERVER_PORT
  })
}

startServer()