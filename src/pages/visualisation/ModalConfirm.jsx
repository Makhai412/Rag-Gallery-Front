// src/components/Modal.jsx
import React from 'react';

const ModalConfirm = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalConfirm;
