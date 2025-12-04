import './config/env.js'; // Cargar variables de entorno

import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import connectMongoDb from './config/db.js';
import initPassport from './config/passport.config.js';

import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import userRouter from './routes/users.router.js';
import ticketRouter from './routes/tickets.router.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Handlebars config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Passport config
initPassport();
app.use(passport.initialize());

// Endpoints
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);

// Conectar con MongoDB
connectMongoDb();

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});