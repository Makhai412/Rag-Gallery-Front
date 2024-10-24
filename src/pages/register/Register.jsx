import { useState } from 'react';
import api from '../../services/Api';

const Register = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Valores: 'admin' o 'user'
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await api.post('/sign-up', { username, password, role });

            // Manejar el registro exitoso, por ejemplo, iniciar sesión automáticamente
            const { token } = response.data;
            localStorage.setItem('token', token);

            closeModal();
            window.location.reload(); // Refrescar la página o manejar el estado en tu app
        } catch (err) {
            setError('Hubo un error al registrar el usuario.');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <div className="flex space-x-3">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                        />
                        <span className="ml-2">Administrador</span>
                    </label>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                onClick={handleRegister}
            >
                Registrarse
            </button>
        </div>
    );
};

export default Register;
