import pool from './dbconnect.js'

export const agregarUsuario = async (email, nombre, password, anos_experiencia, especialidad, foto, estado) => {
    try {
        if (!email || !nombre || !password || !anos_experiencia || !especialidad || !foto || !estado) {
            console.error('Datos de los usuarios incompletos. Debe ingresar email, nombre, password, años de experiencia, especialidad, foto y estado');
        } else {
            const query = `INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const values = [email, nombre, password, anos_experiencia, especialidad, foto, estado];
            const result = await pool.query(query, values);
            console.log('Usuario agregado correctamente.');
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
};

export const obtenerUsuario = async (email, password) => {
    try {
        if (!email || !password) {
            console.error('Datos de los usuarios incompletos. Debe ingresar email y password');
        } else {
            const query = `SELECT * FROM skaters WHERE email = $1 AND password = $2`;
            const values = [email, password];
            const result = await pool.query(query, values);
            console.log(result.rows);
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
};

export const obtenerUsuarioRegistrado = async (email) => {
    try {
        if (!email) {
            console.error('Datos de los usuarios incompletos. Debe ingresar email');
        } else {
            const query = `SELECT * FROM skaters WHERE email = $1`;
            const values = [email];
            const result = await pool.query(query, values);
            console.log(result.rows);
            return result.rows[0];
        }
    }
    catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
};

export const obtenerUsuarios = async () => {
    try {
        const query = 'SELECT * from skaters';
        const result = await pool.query(query);
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
    }
};

export const actualizarUsuario = async (email, nombre, password, anos_experiencia, especialidad) => {    // Función para actualizar un estudiante
    try {
        if (!email || !nombre || !password || !anos_experiencia || !especialidad) {
            console.error('Datos de los usuarios incompletos. Debe ingresar email, nombre, password, años de experiencia y especialidad');
        } else {
            const query = 'UPDATE skaters SET nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 WHERE email = $1 RETURNING *';
            const values = [email, nombre, password, anos_experiencia, especialidad];
            const result = await pool.query(query, values);
            console.log('Skater actualizado correctamente.');
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al actualizar skater:', error);
    }
};

export const actualizarEstado = async (id, estado) => {
    try {
        if (!id || !estado) {
            console.error('Datos de los usuarios incompletos.');
        } else {
            const query = `UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *`;
            const values = [estado, id];
            const result = await pool.query(query, values);
            console.log('Estado actualizado correctamente.');
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
    }
}

export const eliminarUsuario = async (email) => {
    try {
        if (!email) {
            console.error('Datos de los usuarios incompletos.');
        } else {
            const query = `DELETE FROM skaters WHERE email = $1 RETURNING *`;
            const values = [email];
            const result = await pool.query(query, values);
            console.log('Usuario eliminado correctamente.');
            return result;
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
};

export const obtenerUsuarioAdmin = async (email, password) => {
    try {
        if (!email || !password) {
            console.error('Datos de los usuarios incompletos. Debe ingresar email y password');
        } else {
            const query = `SELECT * FROM admin WHERE email = $1 AND password = $2`;
            const values = [email, password];
            const result = await pool.query(query, values);
            console.log(result.rows);
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
}