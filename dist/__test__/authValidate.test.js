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
app.use(express_1.default.json());
const db = [];
class MockAuthService {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user.id ||
                    !user.firstName ||
                    !user.lastName ||
                    !user.image ||
                    !user.title ||
                    !user.summary ||
                    !user.role ||
                    !user.email ||
                    !user.password) {
                    throw new Error("Invalid user data");
                }
                const userExists = db.find((u) => u.email === user.email);
                if (userExists) {
                    throw new Error("Email should be unique");
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt.hash(user.password, saltRounds);
                const newUser = Object.assign(Object.assign({}, user), { password: hashedPassword });
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
app.post("/register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, firstName, lastName, image, title, summary, role, email, password, } = request.body;
        const savedUser = yield mockAuthService.registerUser({
            id,
            firstName,
            lastName,
            image,
            title,
            summary,
            role,
            email,
            password,
        });
        response.status(200).send(savedUser);
    }
    catch (error) {
        response.status(400).send(error);
    }
}));
app.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = db.find((user) => user.email === email);
        if (!user) {
            response.status(404).send("user not found");
        }
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (passwordMatch) {
            response.status(200).send(user);
        }
        else {
            response.status(400).send("password do not match");
        }
    }
    catch (error) {
        return error;
    }
}));
describe("User Registration and validation", () => {
    it("should successfully register a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: 1,
            firstName: "sam",
            lastName: "doe",
            image: "../public/default.png",
            title: "some title",
            summary: "some summary",
            role: user_model_1.UserRole.User,
            email: "sam@example.com",
            password: "1234567",
        };
        const response = yield (0, supertest_1.default)(app).post("/register").send(newUser);
        expect(response.status).toBe(200);
    }));
    it("should fail with email validation whith status 400 ", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: 1,
            firstName: "sam",
            lastName: "doe",
            image: "../public/default.png",
            title: "some title",
            summary: "some summary",
            role: user_model_1.UserRole.User,
            email: "sam@example.com",
            password: "1234567",
        };
        const response = yield (0, supertest_1.default)(app).post("/register").send(newUser);
        expect(response.status).toBe(400);
    }));
    it("should return 500 server error", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            app.emit("error", new Error("server error"));
            const response = yield (0, supertest_1.default)(app).get("/");
            expect(response.status).toBe(500);
        }
        catch (error) {
            return error;
        }
    }));
});
describe("user login", () => {
    it("should return 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "sam@example.com",
            password: "1234567",
        };
        const response = yield (0, supertest_1.default)(app).post("/login").send(user);
        expect(response.status).toBe(200);
    }));
    it("should return 404 status code when email do not match", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "samfaile@example.com",
            password: "1234567",
        };
        const response = yield (0, supertest_1.default)(app).post("/login").send(user);
        expect(response.status).toBe(404);
    }));
    it("should return 400 status code when password do not match", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "sam@example.com",
            password: "12345678",
        };
        const response = yield (0, supertest_1.default)(app).post("/login").send(user);
        expect(response.status).toBe(400);
    }));
});
//# sourceMappingURL=authValidate.test.js.map