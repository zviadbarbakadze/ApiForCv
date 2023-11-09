"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const bcrypt = __importStar(require("bcrypt"));
const up = ({ context }) => __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    const saltRounds = 10;
    const hashedPassword = yield bcrypt.hash("1234567", saltRounds);
    yield q.bulkInsert("users", [
        {
            first_name: "John",
            last_name: "Doe",
            image: "../public/default.png",
            title: "some title",
            summary: "some summary",
            role: "Admin",
            email: "example@example.com",
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            first_name: "Jane",
            last_name: "Smith",
            image: "../public/default.png",
            title: "some title",
            summary: "some summary",
            role: "User",
            email: "Jane@example.com",
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
});
exports.up = up;
const down = ({ context }) => __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    yield q.bulkDelete("users", null, {});
});
exports.down = down;
//# sourceMappingURL=2023.10.12T09.59.53.default-users.js.map