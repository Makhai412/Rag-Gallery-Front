import { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import LogIn from '../../pages/login/LogIn'
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    const [openModal, setOpenModal] = useState(false);
    // const { email } = useSelector(state => state.auth); // Asegúrate de que el estado 'auth' esté configurado correctamente en tu store
    // const dispatch = useDispatch();

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://i.ibb.co/tD1648m/Rag-Gallery-Logo.png" className="h-16" alt="Gallery Logo"/>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {/* Descomentar cuando se configure el estado 'auth'
                        {!email ? (
                            <Button
                                theme={customButtonTheme}
                                onClick={() => setOpenModal(true)}
                                color="primary"
                            >
                                Login
                            </Button>
                        ) : (
                            <Button
                                onClick={() => dispatch(signOutThunk())}
                                theme={customButtonTheme}
                                color="primary"
                            >
                                Logout
                            </Button>
                        )}
                        */}
                        <Button onClick={() => setOpenModal(true)} className="py-0 px-1 bg-blue-700 text-white rounded-lg hover:bg-blue-800 hover:shadow-lg  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" color="primary">
                            Login
                        </Button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                            <Link to="/" className="block py-1 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Chat</Link>
                            </li>
                            <li>
                            <Link to="/aboutus" className="block py-1 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">About Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {openModal && (
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <LogIn closeModal={() => setOpenModal(false)} />
                </Modal.Body>
                <Modal.Footer />
            </Modal>
)}
        </>
    );
};

export default NavbarComponent;
