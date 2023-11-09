"use strict";
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
const up = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // Placeholder logic - you can replace this with your actual migration logic
    console.log(params, "Running up migration");
    // Make sure to return a value, since the function is declared to return Promise<void>
    return Promise.resolve();
});
exports.up = up;
const down = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // Placeholder logic - you can replace this with your actual rollback logic
    console.log(params, "Running down migration");
    // Make sure to return a value, since the function is declared to return Promise<void>
    return Promise.resolve();
});
exports.down = down;
//# sourceMappingURL=2021.10.07T20.56.47.test-user.js.map