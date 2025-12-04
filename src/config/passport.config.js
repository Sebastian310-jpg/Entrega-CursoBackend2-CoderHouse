import passport from "passport";
import local from 'passport-local';
import jwt from 'passport-jwt';
import User from "../dao/models/users.model.js";
import { hashPassword, validatePassword } from "../utils/hash.js";

const initPassport = () => {
  passport.use('register', new local.Strategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { first_name, last_name, age, cart, role } = req.body;

        if(!first_name || !last_name) return done(null, false, { message: 'Faltan campos...' });

        const existUser = await User.findOne({ email: username });
        if(existUser) return done(null, false, { message: 'El usuario ya existe' });

        const hashedPassword = hashPassword(password);
        
        const newUser = await User.create({ first_name, last_name, email: username, age, password: hashedPassword, cart, role });

        return done(null, newUser.toJSON());
      } catch (error) {
        done(error);
      }
    }
  ));

  passport.use('login', new local.Strategy(
    {
      usernameField: 'email',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });

        if(!user) return done(null, false, { message: 'Credenciales incorrectas' });

        const isValidPassword = validatePassword(password, user.password);
        if(!isValidPassword) return done(null, false, { message: 'Credenciales incorrectas' });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  ));

  passport.use('current', new jwt.Strategy(
    {
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([ (req) => req?.cookies?.authToken ]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.user.id).lean();
        if(!user) return done(null, false, { message: 'Usuario no encontrado' });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  ))
}

export default initPassport;