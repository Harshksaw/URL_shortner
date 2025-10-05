// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
    MONGO_URI?: string 
    REDIS_URL: string
    REDIS_COUNTER_KEY?: string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001,
    MONGO_URI: process.env.MONGODB_URI,
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    REDIS_COUNTER_KEY: process.env.REDIS_COUNTER_KEY || 'url_id_counter'
};