import express from "express";
import cors from 'cors';
import path from "path";
import fileUpload from "express-fileupload";
import rutas from "./src/routes/index.routes.js";

const app = express();
const PORT = 3000;

//Configuración de Handlebars
const __dirname = path.resolve();

//Middlewares
app.use('/src/img', express.static(path.join(__dirname, 'src/img')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
    fileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: 'El tamaño de la imagen supera el limite permitido',
    })
);

app.use("/", rutas);

// Iniciar el servidor con Nodemon
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});