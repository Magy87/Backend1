import express from 'express';
import http from 'http'; // Importa el módulo http
import { Server } from 'socket.io';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.router.js'; 
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/viewsRouter.js'; 
import productsSocket from './sockets/productsSocket.js';
import __dirname from './utils.js';
import receptorMiddleware from './middlewares/receptor.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Crea el servidor HTTP
const server = http.createServer(app);

// Configura el servidor de Socket.io
const io = new Server(server);

app.use('/static', express.static(__dirname + '/public'));

app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(receptorMiddleware);

app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter); 
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

// Configura el manejo de eventos de socket
io.on('connection', (socket) => {
    productsSocket(socket);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));


//app.use('/api/products', productsRouter);
