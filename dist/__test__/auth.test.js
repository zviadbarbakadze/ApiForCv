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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const app = (0, express_1.default)();
const bcrypt = __importStar(require("bcrypt"));
const user_model_1 = require("../models/user.model");
class MockAuthService {
    registerUser(firstName, lastName, image, title, summary, role, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = [];
                const userExists = db.find((user) => user.email === email);
                if (userExists) {
                    throw new Error("email should be unique");
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt.hash(password, saltRounds);
                const newUser = {
                    firstName,
                    lastName,
                    image,
                    title,
                    summary,
                    role,
                    email,
                    password: hashedPassword,
                };
                db.push(newUser);
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
const mockAuthService = new MockAuthService();
app.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saveUser = yield mockAuthService.registerUser("sam", "doe", "../public/default.png", "some title", "A summary", user_model_1.UserRole.User, "sam@example.com", "1234567");
        // if (!saveUser) {
        //   response.status(400).send("invalid validation");
        // }
        response.status(200).send(saveUser);
    }
    catch (error) {
        response.status(500).send({ error: error.message });
    }
}));
describe("register", () => {
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = {
            firstName: "sam",
            lastName: "doe",
            image: "../public/default.png",
            title: "some title",
            summary: "A summary",
            role: user_model_1.UserRole.User,
            email: "sam@example.com",
            password: "1234567",
        };
        const response = yield (0, supertest_1.default)(app).post("/").send(newTask);
        expect(response.status).toBe(200);
    }));
    it("should return 500 status code if server error exists", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            app.emit("error", new Error("server error"));
            const newTask = {
                title: "my task",
                description: "my task description",
            };
            const response = yield (0, supertest_1.default)(app).post("/").send(newTask);
            expect(response.status).toBe(500);
        }
        catch (error) {
            return error;
        }
    }));
    it("should return 400 if invalid registration", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newTask = {
                firstName: "sam",
                lastName: "doe",
                image: "../public/default.png",
                title: "some title",
                summary: "A summary",
                role: user_model_1.UserRole.User,
                email: "sam@example.com",
                password: "1234567",
            };
            const response = yield (0, supertest_1.default)(app).post("/").send(newTask);
            expect(response.status).toBe(400);
        }
        catch (error) {
            return error;
        }
    }));
});
//# sourceMappingURL=auth.test.js.map