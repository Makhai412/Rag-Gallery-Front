import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import Modal from './ModalConfirm';

const Visualisation = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ role: '' });
  const [notification, setNotification] = useState({ message: '', visible: false });

  // Fetch data from backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8001/get-users/');
        console.log(response.data);
        setUsers(response.data); // Set the data from the response
        } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({ role: user.role });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(`http://localhost:8001/change-role/${selectedUser.id}`, {
        role: editFormData.role,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: editFormData.role } : user
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const showNotification = (message) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      closeNotification();
    }, 4000);
  };

  const closeNotification = () => {
    setNotification({ message: '', visible: false });
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      {notification.visible && (
        <div className="fixed top-4 right-4 bg-blue-300 text-black p-4 rounded shadow-md z-50 transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
              </svg>
              {notification.message}
            </div>
            <button onClick={closeNotification} className="ml-4 text-gray-700 hover:text-gray-900">
              &times;
            </button>
          </div>
        </div>
      )}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-1">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.uid}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.is_admin ? 'Administrador' : 'Usuario'}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing role */}
      {isEditModalOpen && (
        <Modal onClose={closeEditModal}>
          <h2 className="text-xl font-semibold">Editar Rol del Usuario</h2>
          <form onSubmit={handleEditSubmit} className="mt-4">
            <label className="block mb-2">
              Rol:
              <select
                name="role"
                value={editFormData.role}
                onChange={handleEditChange}
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Administrador</option>
              </select>
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
            >
              Guardar Cambios
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Visualisation;
