import axios from 'axios';

const admin = async () => {
    try {
        const response = await axios.get('http://localhost:3000/obtenerDatos/');
        const data = response.data;
        console.log(data);
        if (data.length === 0) {
            const tablaParticipantes = document.getElementById('tabla-skaters');
            const tbody = tablaParticipantes.querySelector('tbody');
            const fila = `
                <tr>
                    <h3 class="mt-3 mb-5">Aún no hay participantes, utiliza el botón de abajo para registrarte</h3>
                </tr>
            `;
            tbody.innerHTML += fila;
        }
        const tablaParticipantes = document.getElementById('tabla-skaters');
        const tbody = tablaParticipantes.querySelector('tbody');
        data.forEach((participante, index) => {
            const estadoCheckbox = participante.estado ? 'checked' : '';
            const fila = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td><img src="http://localhost:3000/src/img/${participante.foto}" alt="${participante.nombre}" style="width: 100px;"></td>
                    <td>${participante.nombre}</td>
                    <td>${participante.anos_experiencia}</td>
                    <td>${participante.especialidad}</td>
                    <td><input type="checkbox" data-id="${participante.id}" ${estadoCheckbox}></td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });

        const checkboxes = document.querySelectorAll('#tabla-skaters input[type="checkbox"]');
        const token = sessionStorage.getItem('token');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', async () => {
                const id = checkbox.dataset.id;
                const estado = checkbox.checked;
                try {
                    if (!token) {   
                        console.error('No se encontró el token');
                        return;
                    }
                    await axios.put(`http://localhost:3000/actualizarEstado/${id}`, { estado }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                } catch (error) {
                    console.error('Error al actualizar el estado:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

admin();

document.getElementById('logout').addEventListener('click', async () => {
    try {
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
    } catch (error) {
        console.error('Error:', error);
    }
});