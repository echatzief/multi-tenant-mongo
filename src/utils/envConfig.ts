import dotenv from 'dotenv'

dotenv.config()

class Config {
  private static instance: Config

  public readonly SERVER_PORT: number
  public readonly MONGO_URI: string
  public readonly OPEN_CONNECTION_SECONDS: number

  private constructor() {
    if (!process.env.MONGO_URI || !process.env.SERVER_PORT) {
      throw new Error('Missing important environment variables')
    }
    this.SERVER_PORT = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000
    this.MONGO_URI = process.env.MONGO_URI
    this.OPEN_CONNECTION_SECONDS = process.env.OPEN_CONNECTION_SECONDS ? +process.env.OPEN_CONNECTION_SECONDS : 20
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config()
    }
    return Config.instance
  }
}

export const config = Config.getInstance()