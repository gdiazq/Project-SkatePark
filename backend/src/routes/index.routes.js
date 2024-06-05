import { Router } from "express";
import path from "path";
import jwt from "jsonwebtoken";
import { obtenerUsuarios, agregarUsuario, obtenerUsuario, obtenerUsuarioRegistrado, actualizarUsuario, eliminarUsuario, obtenerUsuarioAdmin, actualizarEstado } from '../controllers/dbactions.js'

const router = Router();
const __dirname = path.resolve();
const secretKey = 'SECRET_KEY';

router.get('/obtenerDatos', async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener skaters:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/registroUsuario', async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body
    const nombreFoto = nombre.replace(/ /g, '_')
    const { foto } = req.files
    const estado = 'false';
    const usuarioData = {
        email,
        nombre,
        password,
        anos_experiencia,
        especialidad,
        foto: `${nombreFoto}.jpg`,
        estado
    }
    try {
        foto.mv(`${__dirname}/src/img/${usuarioData.foto}`, (err) => {
            if (err) res.send("Error!, no se pudo cargar el archivo")
        })
        const usuario = await agregarUsuario(email, nombre, password, anos_experiencia, especialidad, usuarioData.foto, estado);
        res.json(usuario);
        console.log('Estudiante agregado exitosamente');
    } catch (error) {
        console.error('Error al agregar skater:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/verificar', async (req, res) => { 
    const { email, password } = req.body;
    try {
        const usuario = await obtenerUsuario(email, password);
        if (usuario) {
            const token = jwt.sign({ email, password }, secretKey, { expiresIn: '5m' });
            res.json({ token });
        } else {
            res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/verificarAdmin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await obtenerUsuarioAdmin(email, password);
        if (usuario) {
            const token = jwt.sign({ email, password }, secretKey, { expiresIn: '5m' });
            res.json({ token });
        } else {
            res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/datos', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Token no proporcionado');
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        const { email } = decoded;
        const usuario = await obtenerUsuarioRegistrado(email);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.delete('/borrarPerfil', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Token no proporcionado');
    }
    const formattedToken = token.replace('Bearer ', '');
    if (formattedToken.split('.').length !== 3) {
        return res.status(401).send('Token mal formado');
    }
    try {
        const decoded = jwt.verify(formattedToken, secretKey);
        const { email } = decoded;
        const usuario = await eliminarUsuario(email);
        if (usuario) {
            res.send('Usuario eliminado correctamente');
        } else {
            res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar el perfil:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.put('/actualizarPerfil', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Token no proporcionado');
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        const { email } = decoded;
        const { nombre, password, anos_experiencia, especialidad } = req.body;
        const usuario = await actualizarUsuario(email, nombre, password, anos_experiencia, especialidad);
        if (usuario) {
            res.send('Perfil actualizado correctamente');
        } else {
            res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.put('/actualizarEstado/:id', async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const usuario = await actualizarEstado(id, estado);
        if (usuario) {
            res.send('Estado actualizado correctamente');
        } else {
            res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/logout', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Token no proporcionado');
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        if (decoded) {
            res.send('Sesión cerrada correctamente');
        } else {
            res.status(401).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default router;