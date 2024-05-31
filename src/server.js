import express from 'express';
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app =  express();

const httpServer = new HttpServer(app);
const io = new SocketIOServer(httpServer);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(errorHandler);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/', viewsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

const PORT = 8080


httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const products = [];

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar la lista de productos actualizada al cliente recién conectado
    socket.emit('updateProducts', products);

    // Escuchar la creación de nuevos productos
    socket.on('newProduct', (product) => {
    products.push(product);
      io.emit('updateProducts', products); // Actualizar todos los clientes
    });

    // Escuchar la eliminación de productos
    socket.on('deleteProduct', (productId) => {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        io.emit('updateProducts', products); // Actualizar todos los clientes
    }
    });
});