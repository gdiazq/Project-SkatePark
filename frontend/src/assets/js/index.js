import axios from 'axios'; 

const obtenerUsuarios = async () => {
    try {
        const tablaSkaters = document.getElementById('tabla-skaters');
        const tbody = tablaSkaters.querySelector('tbody');
        const mensaje = document.getElementById('mensaje');
        const response = await axios.get('http://localhost:3000/obtenerDatos/');
        const data = response.data;
        if (data.length === 0) {
            const fila = `
                    <h3 class="mt-3 mb-5">Aún no hay participantes, utiliza el botón de abajo para registrarte</h3>
            `;
            mensaje.innerHTML += fila;
        } else {
            data.forEach((participante, index) => {
                const fila = `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td><img src="http://localhost:3000/src/img/${participante.foto}" alt="${participante.nombre}" style="width: 100px;"></td>
                        <td>${participante.nombre}</td>
                        <td>${participante.anos_experiencia}</td>
                        <td>${participante.especialidad}</td>
                        <td class="${participante.estado ? 'text-success' : 'text-warning'} font-weight-bold">${participante.estado ? 'Aprobado' : 'En revisión'}</td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });
        }
    } catch (error) {
        console.error('Error al obtener los skaters:', error);
    }
};

obtenerUsuarios();