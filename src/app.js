import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import passport from 'passport';

import connectMongoDb from './config/db.js';
import initPassport from './config/passport.config.js';

import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';

// Inicializar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Handlebars config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Passport config
initPassport();
app.use(passport.initialize());

// Endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);

// Conectar con MongoDB
connectMongoDb();

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});