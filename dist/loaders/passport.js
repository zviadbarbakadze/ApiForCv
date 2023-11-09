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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const loadPassport = (app, context) => {
    passport_1.default.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "asdfsfwefasdfwefwefsdf",
    }, function (jwtPayload, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield context.services.authService.findUserById(jwtPayload.id);
                if (!user) {
                    return done(null, null);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password } = user, data = __rest(user, ["password"]);
                done(null, data);
            }
            catch (e) {
                done(e);
            }
        });
    }));
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
    }, function (email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({ where: { email } });
                if (!user) {
                    return done(null, false, {
                        message: "User with provided email not found!",
                    });
                }
                const doesPasswordsMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!doesPasswordsMatch) {
                    return done(null, false, {
                        message: "Invalid password!",
                    });
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: userPassword } = user, userData = __rest(user, ["password"]);
                return done(null, userData, {
                    message: "User logged in successfully!",
                });
            }
            catch (e) {
                return done(e);
            }
        });
    }));
};
exports.loadPassport = loadPassport;
//# sourceMappingURL=passport.js.map