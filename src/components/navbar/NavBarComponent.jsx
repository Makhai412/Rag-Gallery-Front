import { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import LogIn from '../../pages/login/LogIn';
import Register from '../../pages/register/Register'; // Nuevo componente de registro
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
    const [username, setUsername] = useState(''); // Almacenar nombre de usuario




    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            setUsername('');
        }
    }, []);

    const closeLoginModal = () => {
        setOpenLoginModal(false);
    };

    const closeRegisterModal = () => {
        setOpenRegisterModal(false);
    };

    const handleLogin = (user) => {
        setUsername(user); // Establecer el nombre de usuario
        setIsLoggedIn(true); // Cambiar el estado de autenticación
        closeLoginModal(); // Cerrar modal de login
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        setIsLoggedIn(false); // Cambiar el estado de autenticación
        setUsername(''); // Limpiar el nombre de usuario
    };

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://i.ibb.co/tD1648m/Rag-Gallery-Logo.png" className="h-16" alt="Gallery Logo" />
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isLoggedIn ? (
                            <>
                                <span className="flex items-center text-blue-600 font-bold text-lg p-2 rounded-md transition duration-200 ease-in-out">
                                    Hola! {username}
                                </span>


                                <Button
                                    onClick={handleLogout}
                                    className="py-1 px-2 text-white font-bold rounded-full bg-red-600 hover:bg-red-700 shadow-lg transition duration-200 ease-in-out"
                                    style={{ backgroundColor: 'rgba(239, 68, 68)', color: 'white' }} // Asegúrate de que el color es rojo
                                >
                                    Logout
                                </Button>


                            </>
                        ) : (
                            <Button
                                onClick={() => setOpenLoginModal(true)}
                                className="py-0 px-1 bg-blue-700 text-white rounded-lg hover:bg-blue-800 hover:shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                color="primary"
                            >
                                Login
                            </Button>
                        )}
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" className="block py-1 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Chat</Link>
                            </li>
                            <li>
                                <Link to="/aboutus" className="block py-1 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">About Us</Link>
                            </li>
                            <li>
                                <Link to="/visualisation" className="block py-1 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Users Visualisation</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modal de Login */}
            {openLoginModal && (
                <Modal show={openLoginModal} size="md" popup onClose={closeLoginModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <LogIn closeModal={closeLoginModal} onLogin={handleLogin} /> {/* Pasar función de inicio de sesión */}
                        <p className="text-center mt-4">
                            ¿No tienes una cuenta?{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => {
                                    setOpenLoginModal(false);
                                    setOpenRegisterModal(true);
                                }}
                            >
                                Regístrate
                            </button>
                        </p>
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>
            )}

            {/* Modal de Registro */}
            {openRegisterModal && (
                <Modal show={openRegisterModal} size="md" popup onClose={closeRegisterModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <Register closeModal={closeRegisterModal} />
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>
            )}
        </>
    );
};

export default NavbarComponent;
