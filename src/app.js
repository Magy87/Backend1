import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/viewsRouter.js';
import productsSocket from './sockets/productsSocket.js';
import __dirname from './utils.js';
import receptorMiddleware from './middlewares/receptor.js';
import path from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const server = http.createServer(app);

const io = new Server(server);

//app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(receptorMiddleware);

app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
    productsSocket(socket);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));


