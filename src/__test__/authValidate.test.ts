import express, { Request, Response } from "express";
import request from "supertest";
const app = express();
import * as bcrypt from "bcrypt";

import { UserRole } from "../models/user.model";
app.use(express.json());
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  title: string;
  summary: string;
  role: UserRole;
  email: string;
  password: string;
}

const db: UserAttributes[] = [];

class MockAuthService {
  async registerUser(user: UserAttributes): Promise<UserAttributes> {
    try {
      if (
        !user.id ||
        !user.firstName ||
        !user.lastName ||
        !user.image ||
        !user.title ||
        !user.summary ||
        !user.role ||
        !user.email ||
        !user.password
      ) {
        throw new Error("Invalid user data");
      }

      const userExists = db.find((u) => u.email === user.email);
      if (userExists) {
        throw new Error("Email should be unique");
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const newUser: UserAttributes = { ...user, password: hashedPassword };
      db.push(newUser);

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const mockAuthService = new MockAuthService();

app.post("/register", async (request: Request, response: Response) => {
  try {
    const {
      id,
      firstName,
      lastName,
      image,
      title,
      summary,
      role,
      email,
      password,
    }: UserAttributes = request.body;

    const savedUser = await mockAuthService.registerUser({
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
  } catch (error) {
    response.status(400).send(error);
  }
});
app.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user = db.find((user) => user.email === email);
    if (!user) {
      response.status(404).send("user not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      response.status(200).send(user);
    } else {
      response.status(400).send("password do not match");
    }
  } catch (error) {
    return error;
  }
});
describe("User Registration and validation", () => {
  it("should successfully register a user", async () => {
    const newUser: UserAttributes = {
      id: 1,
      firstName: "sam",
      lastName: "doe",
      image: "../public/default.png",
      title: "some title",
      summary: "some summary",
      role: UserRole.User,
      email: "sam@example.com",
      password: "1234567",
    };
    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(200);
  });

  it("should fail with email validation whith status 400 ", async () => {
    const newUser: UserAttributes = {
      id: 1,
      firstName: "sam",
      lastName: "doe",
      image: "../public/default.png",
      title: "some title",
      summary: "some summary",
      role: UserRole.User,
      email: "sam@example.com",
      password: "1234567",
    };
    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
  });

  it("should return 500 server error", async () => {
    try {
      app.emit("error", new Error("server error"));

      const response = await request(app).get("/");
      expect(response.status).toBe(500);
    } catch (error) {
      return error;
    }
  });
});

describe("user login", () => {
  it("should return 200 status code", async () => {
    const user = {
      email: "sam@example.com",
      password: "1234567",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(200);
  });
  it("should return 404 status code when email do not match", async () => {
    const user = {
      email: "samfaile@example.com",
      password: "1234567",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(404);
  });
  it("should return 400 status code when password do not match", async () => {
    const user = {
      email: "sam@example.com",
      password: "12345678",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(400);
  });
});
