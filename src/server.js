import express from 'express';
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import  { Server } from 'socket.io';

const app =  express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(errorHandler);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

const PORT = 8080

app.listen(PORT, () => console.log(`servidor ${PORT}`))