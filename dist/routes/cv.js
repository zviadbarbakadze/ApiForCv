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
exports.makeCv = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validators_1 = require("../middleware/validators");
const makeCv = (context) => {
    const router = express_1.default.Router();
    router.get("/:userId/cv", (0, express_validator_1.check)("userId").isInt().toInt().escape().withMessage("validation failed"), validators_1.handleValidationResults, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cacheKey = request.params.userId;
            const cachedData = yield context.services.cacheService.get(cacheKey);
            console.log(cachedData);
            if (cachedData) {
                response.status(200).send(JSON.parse(cachedData));
            }
            else {
                const id = request.params.userId;
                const userId = Number(id);
                const getCv = yield context.services.cvService.getCv(userId, response);
                if (getCv) {
                    yield context.services.cacheService.setex(cacheKey, 5, JSON.stringify(getCv));
                    response.status(200).json(getCv);
                }
            }
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
};
exports.makeCv = makeCv;
//# sourceMappingURL=cv.js.map