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
const sequelize_1 = require("sequelize");
const up = ({ context }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    yield q.createTable("feedbacks", {
      id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      from_user: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      to_user: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
      },
      company_name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
      },
      createdAt: sequelize_1.DataTypes.DATE,
      updatedAt: sequelize_1.DataTypes.DATE,
    });
  });
exports.up = up;
const down = ({ context }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    yield q.dropTable("feedbacks");
  });
exports.down = down;
//# sourceMappingURL=feedbacks-schema.js.map
