import axios from "axios";

const registro = async (event) => {
    try {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const nombre = document.getElementById("nombre").value;
        const password = document.getElementById("password").value;
        const repite_password = document.getElementById("repite_password").value;
        const anos_experiencia = document.getElementById("anos_experiencia").value;
        const especialidad = document.getElementById("especialidad").value;
        const foto = document.querySelector('input[type="file"]').files[0];
        if (email.length > 50 || nombre.length > 25 || password.length > 25 || anos_experiencia.length > 10 || especialidad.length > 50) {
            alert("Por favor, asegúrate de que los campos no excedan la longitud máxima permitida.");
            return;
        }
        if (!email || !nombre || !password || !anos_experiencia || !especialidad || !foto) {
            alert("Por favor, llena todos los campos.");
            return;
        }
        if (password !== repite_password) {
            alert("Las contraseñas deben coincidir. Por favor, inténtalo de nuevo.");
            return;
        }
        if (anos_experiencia < 0) {
            alert("Por favor, ingresa un número válido para los años de experiencia.");
            return;
        }
        const formData = new FormData();
        formData.append('email', email);
        formData.append('nombre', nombre);
        formData.append('password', password);
        formData.append('anos_experiencia', anos_experiencia);
        formData.append('especialidad', especialidad);
        formData.append('foto', foto);
        await axios.post(`http://localhost:3000/registroUsuario`, formData);
        window.location.href = "http://localhost:5173/";
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("registroBtn").addEventListener("click", registro);