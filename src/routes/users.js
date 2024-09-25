// import { Router } from "express";
// import uploader from "../middlewares/uploader.js";

// const usersRouter = Router();

// usersRouter.get('/', (req, res) => {
//     console.log(req);
//     res.send("Users");
// });

// usersRouter.get('/:uid', (req, res) => {
//     res.send("User by ID");
// });

// usersRouter.post('/', uploader.single('file'), (req, res) => {

//     if (req.file) {
//         console.log("Archivo recibido:", req.file);
//     } else {
//         console.log("No se recibió archivo");
//     }

//     const data = Object.assign({}, req.body);
//     console.log("Datos recibidos:", data);

//     res.send("Usuarios procesados correctamente");
// });

// usersRouter.put('/:uid', (req, res) => {
//     res.send("Actualizar usuario");
// });

// usersRouter.delete('/:uid', (req, res) => {
//     res.send("Eliminar usuario");
// });

// export default usersRouter;
