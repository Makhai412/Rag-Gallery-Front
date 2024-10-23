import React, { useState, useEffect } from 'react';
import Modal from './ModalConfirm';

const Visualisation = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ role: '' });
  const [notification, setNotification] = useState({ message: '', visible: false });

  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Usuario', active: true },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Administrador', active: false },
      { id: 3, name: 'Alice Brown', email: 'alice@example.com', role: 'Usuario', active: true },
    ]);
  }, []);

  const openEditModal = (user) => {
    if (!user.active) {
      showNotification('No se puede editar porque el usuario está inactivo.');
      return;
    }
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

  const handleEditSubmit = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, role: editFormData.role } : user
      )
    );
    closeEditModal();
  };

  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedUser(null);
  };

  const handleToggleActive = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, active: !user.active } : user
      )
    );
    closeConfirmModal();
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
            <th className="border border-gray-300 px-4 py-2">Correo</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.active ? (
                  <span className="text-green-500 font-semibold">Activo</span>
                ) : (
                  <span className="text-red-500 font-semibold">Inactivo</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => openEditModal(user)}
                  className={`${
                    user.active ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                  } text-white px-2 py-1 rounded mr-2`}
                >
                  Editar
                </button>
                <button
                  onClick={() => openConfirmModal(user)}
                  className={`${
                    user.active ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'
                  } text-white px-4 py-1 rounded w-24`}
                >
                  {user.active ? 'Inactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar el rol del usuario */}
      <Modal
        title="Editar Rol"
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
        <div>
          <select
            name="role"
            value={editFormData.role}
            onChange={handleEditChange}
            className="border rounded px-2 py-1 w-full mb-4"
          >
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
              onClick={handleEditSubmit}
            >
              Guardar
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
              onClick={closeEditModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para confirmar activación/inactivación */}
      <Modal
        title={`¿Está seguro de ${selectedUser?.active ? 'inactivar' : 'activar'} al usuario?`}
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
      >
        <div className="text-center">
          <p>
            {`El usuario ${selectedUser?.name} será ${
              selectedUser?.active ? 'inactivado' : 'activado'
            }.`}
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
              onClick={handleToggleActive}
            >
              Aceptar
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
              onClick={closeConfirmModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Visualisation;
