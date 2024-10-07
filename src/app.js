import express from 'express';
// import http from 'http';
//import { Server } from 'socket.io';
//import usersRouter from './routes/users.js';
import productsRouter from './routes/products.router.js';
//import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/viewsRouter.js';
//import productsSocket from './sockets/productsSocket.js';
import __dirname from './dirname.js';
//import receptorMiddleware from './middlewares/receptor.js';
//import path from 'path';
import mongoose from 'mongoose';

const app = express();
const PORT = 8080

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}))//formulario
app.use('/static', express.static(__dirname + '/public'))
//const server = http.createServer(app);

//const io = new Server(server);

app.use('/static', express.static(__dirname + '/public'));
//pp.use('/uploads', express.static(__dirname + '/uploads'));

app.engine('hbs', handlebars.engine({ extname: '.hbs', runtimeOptions:{allowProtoPropertiesByDefault:true} }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');


//app.use(express.static('public'));

//app.use(receptorMiddleware);

//app.use('/api/users', usersRouter);
//app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

// //io.on('connection', (socket) => {
//     productsSocket(socket);
// });
mongoose.connect('mongodb+srv://magymoyano021020:MagyMartin87@libra.c6z4j.mongodb.net/ecomerce?retryWrites=true&w=majority&appName=libra')
app.listen(PORT,()=> console.log(`server in port ${PORT}`))


