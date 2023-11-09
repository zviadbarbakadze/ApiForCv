import redis from "redis";
import util from "util";
import { config } from "../config";

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
});
const clientSet = util.promisify(redisClient.setex).bind(redisClient);
const clientGet = util.promisify(redisClient.get).bind(redisClient);
const clientDelete = util.promisify(redisClient.del).bind(redisClient);

export class CacheService {
  async get(key: string): Promise<string | null> {
    return await clientGet(key);
  }

  async setex(key: string, time: number, value: string): Promise<string> {
    return await clientSet(key, time, value);
  }

  async del(key: string): Promise<number> {
    return await clientDelete(key);
  }
}
