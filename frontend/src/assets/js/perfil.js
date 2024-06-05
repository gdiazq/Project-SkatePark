import axios from "axios";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token en el almacenamiento de sesión.');
            return;
        }
        console.log(token);
        const response = await axios.get('http://localhost:3000/datos', {
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token JWT en el encabezado de autorización
            }
        });
        const { data } = response;
        console.log(data);
        document.getElementById('email').value = data.email; 
        document.getElementById('name').value = data.nombre;
        document.getElementById('password').value = data.password;
        document.getElementById('repite_password').value = data.password;
        document.getElementById('anos_experiencia').value = data.anos_experiencia;
        document.getElementById('especialidad').value = data.especialidad;
    } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
    }

    document.getElementById('updateButton').addEventListener('click', async () => {
        const token = sessionStorage.getItem('token');
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const repite_password = document.getElementById('repite_password').value;
        const anos_experiencia = document.getElementById('anos_experiencia').value;
        const especialidad = document.getElementById('especialidad').value;
        if (email.length > 50 || nombre.length > 25 || password.length > 25 || anos_experiencia.length > 10 || especialidad.length > 50) {
            alert("Por favor, asegúrate de que los campos no excedan la longitud máxima permitida.");
            return;
        }
        if (!email || !nombre || !password || !anos_experiencia || !especialidad) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        if (password !== repite_password) {
            alert('Las contraseñas deben coincidir. Por favor, inténtalo de nuevo.');
            return;
        }
        if (anos_experiencia < 0) {
            alert("Por favor, ingresa un número válido para los años de experiencia.");
            return;
        }
        try {
            await axios.put('http://localhost:3000/actualizarPerfil', { email, nombre, password, anos_experiencia, especialidad }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Perfil actualizado correctamente.');
            window.location.href = '/';
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Ha ocurrido un error al actualizar el perfil. Por favor, inténtalo de nuevo más tarde.');
        }
    });

    document.getElementById('deleteButton').addEventListener('click', async () => {
        const token = sessionStorage.getItem('token');
        try {
            await axios.delete('http://localhost:3000/borrarPerfil', {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });            
            alert('Tu cuenta ha sido eliminada.');
            window.location.href = '/';
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            alert('Ha ocurrido un error al eliminar la cuenta. Por favor, inténtalo de nuevo más tarde.');
        }
    });

    document.getElementById('logoutbtn').addEventListener('click', async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token en el almacenamiento de sesión.');
            return;
        }
        await axios.post('http://localhost:3000/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        sessionStorage.removeItem('token');
        window.location.href = '/';
    });

});