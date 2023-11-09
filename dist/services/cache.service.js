"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const redis_1 = __importDefault(require("redis"));
const util_1 = __importDefault(require("util"));
const config_1 = require("../config");
const redisClient = redis_1.default.createClient({
    host: config_1.config.redis.host,
    port: config_1.config.redis.port,
});
const clientSet = util_1.default.promisify(redisClient.setex).bind(redisClient);
const clientGet = util_1.default.promisify(redisClient.get).bind(redisClient);
const clientDelete = util_1.default.promisify(redisClient.del).bind(redisClient);
class CacheService {
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clientGet(key);
        });
    }
    setex(key, time, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clientSet(key, time, value);
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clientDelete(key);
        });
    }
}
exports.CacheService = CacheService;
//# sourceMappingURL=cache.service.js.map