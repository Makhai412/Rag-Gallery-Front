import React, { useState } from 'react';

const LogIn = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica de inicio de sesión
        console.log('Nombre:', name);
        console.log('Contraseña:', password);
        closeModal();
    };

    return (
        <>
            <div className="p-4 w-full max-w-md">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-6 ">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 ">
                        Iniciar Sesión
                    </h3>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nombre
                            </label>
                            <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                value={name} onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Contraseña
                            </label>
                            <input type="password" id="password" className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={closeModal} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
                                Cancelar
                            </button>
                            <button type="submit" className="py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LogIn;
