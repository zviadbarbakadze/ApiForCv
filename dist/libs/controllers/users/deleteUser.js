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
exports.deleteUser = void 0;
const user_model_1 = require("../../../models/user.model");
const deleteUser = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const idToDelete = parseInt(request.params.id, 10);
      const authenticatedUser = request.user;
      if (
        authenticatedUser.dataValues.id !== idToDelete &&
        authenticatedUser.dataValues.role !== "Admin"
      ) {
        response
          .status(403)
          .send("You are not allowed to delete this user's account");
        return;
      }
      const userToDelete = yield user_model_1.User.findByPk(idToDelete);
      if (!userToDelete) {
        response.status(404).send("A user with the provided ID does not exist");
        return;
      }
      yield userToDelete.destroy();
      response.status(204).send("user deleted");
    } catch (error) {
      console.error(error);
      response.status(500).send("Something went wrong on the server");
    }
  });
exports.deleteUser = deleteUser;
//# sourceMappingURL=deleteUser.js.map
