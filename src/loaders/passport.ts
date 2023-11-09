import { Context, Loader } from "../interfaces/general";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export const loadPassport: Loader = (app, context: Context) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "asdfsfwefasdfwefwefsdf",
      },
      async function (jwtPayload, done) {
        try {
          const user = await context.services.authService.findUserById(
            jwtPayload.id,
          );

          if (!user) {
            return done(null, null);
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...data } = user;

          done(null, data);
        } catch (e) {
          done(e);
        }
      },
    ),
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
        try {
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return done(null, false, {
              message: "User with provided email not found!",
            });
          }

          const doesPasswordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (!doesPasswordsMatch) {
            return done(null, false, {
              message: "Invalid password!",
            });
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: userPassword, ...userData } = user;

          return done(null, userData, {
            message: "User logged in successfully!",
          });
        } catch (e) {
          return done(e);
        }
      },
    ),
  );
};
