import React, { useEffect } from "react";

const Notification = ({ message, success, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // La notificación se cierra automáticamente después de 4 segundos
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded shadow-md z-50 ${success ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button className="ml-4 text-white hover:text-gray-300" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;

