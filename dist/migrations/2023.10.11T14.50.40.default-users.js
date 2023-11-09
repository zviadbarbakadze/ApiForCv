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
exports.down = exports.up = void 0;
const up = ({ context }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    yield q.bulkInsert("users", [
      {
        first_name: "Admin",
        last_name: "User",
        image: "default.png",
        title: "Administrator",
        summary: "Default admin user",
        role: "Admin",
        email: "admin@example.com",
        password: "123456",
      },
      {
        first_name: "User",
        last_name: "User",
        image: "default.png",
        title: "regular",
        summary: "Default regular user",
        role: "User",
        email: "user@example.com",
        password: "1234567",
      },
    ]);
  });
exports.up = up;
const down = ({ context }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    yield q.bulkDelete("users", {
      email: ["admin@example.com", "user@example.com"],
    });
  });
exports.down = down;
//# sourceMappingURL=2023.10.11T14.50.40.default-users.js.map
