"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterByAdmin = void 0;
const bcrypt = __importStar(require("bcrypt"));
// import { Models } from "../interfaces/general";
const user_model_1 = require("../models/user.model");
class RegisterByAdmin {
  registerUserByAdmin(
    response,
    firstName,
    lastName,
    title,
    summary,
    email,
    password,
    role,
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const userExists = yield user_model_1.User.findOne({
          where: { email },
        });
        if (userExists) {
          response.status(400).send("email should be a unique field");
        }
        if (
          !firstName ||
          !lastName ||
          !title ||
          !summary ||
          !email ||
          !password ||
          !role
        ) {
          response.status(400).send("Every field is required");
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt.hash(password, saltRounds);
        const newUser = yield user_model_1.User.create({
          firstName: firstName,
          lastName: lastName,
          title,
          summary,
          role,
          email,
          password: hashedPassword,
        });
        return newUser;
      } catch (error) {
        response.status(500).send("Something went wrong on the server");
      }
    });
  }
  findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield user_model_1.User.findOne({ where: { email } });
    });
  }
}
exports.RegisterByAdmin = RegisterByAdmin;
//# sourceMappingURL=registerByAdmin.service.js.map
