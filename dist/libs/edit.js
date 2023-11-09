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
exports.editByUser = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt = __importStar(require("bcrypt"));
const editByUser = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const id = request.params.id;
      const authenticatedUser = request.user;
      const reqId = authenticatedUser.dataValues.id;
      const { firstName, lastName, title, summary, email, password, role } =
        request.body;
      const user = yield user_model_1.User.findByPk(id);
      if (!user) {
        response.status(404).send("A user with the provided ID is not found");
        return;
      }
      if (reqId !== Number(id)) {
        response
          .status(403)
          .send("You are not allowed to update another user's profile");
        return;
      }
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (title) user.title = title;
      if (summary) user.summary = summary;
      if (email) {
        const userExists = yield user_model_1.User.findOne({
          where: { email },
        });
        if (userExists) {
          return response.status(400).send("email already exists");
        } else {
          user.email = email;
        }
      }
      if (role) user.role = role;
      if (password) {
        const hashedPassword = yield bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      yield user.save();
      response.status(200).send({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title,
        summary: user.summary,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send("Something went wrong on the server");
    }
  });
exports.editByUser = editByUser;
//# sourceMappingURL=edit.js.map
