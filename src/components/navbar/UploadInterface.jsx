import React, { useState } from 'react';
import '../../componentesCSS/UploadInterface.css';

const UploadInterface = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setMessage('Documento subido exitosamente.');
    } else {
      setFile(null);
      setMessage('Formato no permitido. Solo se permiten archivos PDF o Word.');
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Por favor, sube un documento antes de enviar.');
      return;
    }

    if (!question.trim()) {
      setMessage('Por favor, ingresa una pregunta.');
      return;
    }

    // Simulación de una carga al enviar
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('Documento y pregunta enviados correctamente.');
    }, 2000); // Simula un retraso de 2 segundos
  };

  return (
    <div className="upload-interface">
      <h1>Sube tu Documento y Pregunta</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Subir Documento */}
        <div className="upload-section">
          <label htmlFor="file-upload" className="file-upload-label">
            Subir Documento (PDF o Word):
          </label>
          <input 
            type="file" 
            id="file-upload" 
            onChange={handleFileChange} 
            className="file-upload-input"
          />
          {message && <p className={`message ${file ? 'success' : 'error'}`}>{message}</p>}
        </div>

        {/* Ingresar Pregunta */}
        <div className="question-section">
          <label htmlFor="question-input" className="question-label">
            Ingresar Pregunta:
          </label>
          <textarea 
            id="question-input" 
            value={question} 
            onChange={handleQuestionChange} 
            className="question-input"
          />
        </div>

        {/* Botón de Enviar */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default UploadInterface;
