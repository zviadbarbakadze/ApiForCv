"use strict";
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
exports.getByAdmin = void 0;
const user_model_1 = require("../../../models/user.model");
const getByAdmin = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const pageSize = parseInt(request.query.pageSize, 10);
      const page = parseInt(request.query.page, 10);
      const users = yield user_model_1.User.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      const totalCount = yield user_model_1.User.count();
      response.header("X-total-count", totalCount.toString());
      const destUsers = users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title,
        summary: user.summary,
        email: user.email,
        role: user.role,
      }));
      response.status(200).send(destUsers);
    } catch (error) {
      console.error(error);
      response.status(500).send("Something went wrong on the server");
    }
  });
exports.getByAdmin = getByAdmin;
//# sourceMappingURL=getByAdmin.js.map
