import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login');
    loginLink.addEventListener('click', async (event) => {
        try {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (!email > 50 || !password > 25) {
                alert("Por favor, llena todos los campos.");
                return;
            }
            if (!email || !password) {
                alert("Por favor, llena todos los campos.");
                return;
            }
            const response = await axios.post('http://localhost:3000/verificar', { email, password });
            if (response.data.token) {
                const token = response.data.token;
                sessionStorage.setItem('token', token);
                window.location.href = `http://localhost:5173/perfil?token=${token}"`;
            } else {
                alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
            }
        
        } catch (error) {
            console.error('Error:', error);
        }
    });
});