import { useState } from 'react';
import api from '../../services/Api'; // Importa el archivo api.js

const LogIn = ({ closeModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token } = response.data;

            // Guardar el token en localStorage
            localStorage.setItem('token', token);

            // Lógica para cambiar el estado de login
            closeModal();
            window.location.reload(); // Refrescar la página o manejar el estado en tu app
        } catch (err) {
            setError('Credenciales incorrectas, inténtalo de nuevo.');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                onClick={handleLogin}
            >
                Iniciar Sesión
            </button>
        </div>
    );
};

export default LogIn;
