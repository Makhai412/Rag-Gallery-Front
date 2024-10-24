import { useState } from 'react';
import api from '../../services/Api'; // Importa el archivo api.js

const LogIn = ({ closeModal, onLogin }) => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await api.post('/login/', { username, password });
            const { access_token } = response.data;
    
            // Guardar el token en localStorage
            localStorage.setItem('token', access_token);
    
            // Llamar a la función onLogin para pasar el nombre de usuario al Navbar
            onLogin(username);
    
            // Cerrar el modal
            closeModal();
            
            // No recargar la página, simplemente actualizar el estado
            // Puedes agregar lógica aquí para manejar el cambio de usuario
        } catch (err) {
            setError('Credenciales incorrectas, inténtalo de nuevo.');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
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
