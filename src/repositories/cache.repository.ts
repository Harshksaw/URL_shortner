import { serverConfig } from "../config";
import { redisClient } from "../config/redis";

export class CacheRepository {

    async getNextId(): Promise<number> {

        const key = serverConfig.REDIS_COUNTER_KEY;
        if (!key) {
            throw new Error("REDIS_COUNTER_KEY is undefined");
        }
        if(!redisClient.isOpen){
            await redisClient.connect();
        }
        const nextId = await redisClient.incr(key);
        return nextId;
    }



}