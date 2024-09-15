import { serve } from '@hono/node-server'
import { app } from '@/app'
import { connectDB } from '@/db'
import { config } from '@/utils/envConfig'
import { initDB } from '@/utils/init'

const startServer = async () => {

  // Connect to database
  await connectDB()

  // Initialize database schema
  await initDB();

  console.log(`App started at http://localhost:${config.SERVER_PORT}`)

  serve({
    fetch: app.fetch,
    port: config.SERVER_PORT
  })
}

startServer()