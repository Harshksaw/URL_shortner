import { createClient } from "redis";
import { serverConfig } from "./index";



const redisClient = createClient({
    url:serverConfig.REDIS_URL
});

redisClient.on('error', (err:any) => console.log('Redis Client Error', err));

redisClient.on('connect', () => {
    console.log('Connected to Redis...');
});
export async function initRedis() {

    try{

        await redisClient.connect();
        console.log('Redis connected');

    }catch(err){
        console.error('Could not connect to Redis', err);
        throw err;
    }
}

export async function disconnectRedis() {
    try{
        await redisClient.quit();
        console.log('Redis disconnected');
    }catch(err){
        console.error('Could not disconnect from Redis', err);
        throw err;
    }
}
export {
    redisClient
}