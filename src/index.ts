import { serve } from '@hono/node-server'
import { connectDB } from '@/db'
import { config } from '@/utils/envConfig'
import { app } from '@/app';


const startServer = async () => {

  await connectDB();

  console.log(`Server started at http://localhost:${config.SERVER_PORT}`);

  serve({
    fetch: app.fetch,
    port: config.SERVER_PORT
  })
};

startServer();