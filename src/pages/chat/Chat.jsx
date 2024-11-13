import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Notification from "./Notification";

const Chat = () => {
    const [messages, setMessages] = useState([
        { text: "¿Cómo te puedo ayudar hoy?", time: new Date().toLocaleTimeString(), sender: 'system' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [file, setFile] = useState(null);
    const [notification, setNotification] = useState({ visible: false, message: '', success: true });
    const fileInputRef = useRef(null);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setNotification({ visible: true, message: "Por favor inicia sesión para poder acceder al chat", success: false });
            return;
        }

        if (isSending || inputValue.trim() === "") return;

        const timestamp = new Date().toLocaleTimeString();
        await handleTextMessage(timestamp);
    };

    const handleSendFile = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setNotification({ visible: true, message: "Por favor inicia sesión para poder acceder al chat", success: false });
            return;
        }

        if (isSending || !file) return;

        const timestamp = new Date().toLocaleTimeString();
        await handleFileUpload(timestamp);
    };

    const handleTextMessage = async (timestamp) => {
        const userMessage = { text: inputValue, time: timestamp, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue("");
        setIsSending(true);

        try {
            const response = await axios.post("http://127.0.0.1:8001/generate-answer/", {
                query: inputValue
            });
            const systemResponse = {
                text: response.data,
                time: new Date().toLocaleTimeString(),
                sender: 'system'
            };
            setMessages((prevMessages) => [...prevMessages, systemResponse]);
        } catch (error) {
            console.error("Error al obtener la respuesta del sistema:", error);
            const errorMessage = {
                text: "Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
                time: new Date().toLocaleTimeString(),
                sender: 'system'
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsSending(false);
        }
    };

    const handleFileUpload = async (timestamp) => {
        setIsSending(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post("http://127.0.0.1:8001/save-document/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNotification({ visible: true, message: `Archivo "${file.name}" subido con éxito.`, success: true });
            setFile(null);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            setNotification({ visible: true, message: "Hubo un error al subir el archivo. Por favor, inténtalo de nuevo.", success: false });
        } finally {
            setIsSending(false);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const closeNotification = () => {
        setNotification({ visible: false, message: '', success: true });
    };

    return (
        <div className="flex flex-col h-screen p-4 mt-2 py-8 bg-blue-300">
            <div className="flex-1 overflow-y-auto w-3/4 mx-auto p-4 border bg-white border-gray-300 rounded-lg mt-16 bg-cover bg-no-repeat bg-center" 
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('https://i.ibb.co/tD1648m/Rag-Gallery-Logo.png')`,
                    backgroundSize: '300px', 
                    backgroundPosition: 'center' 
                }}>
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-2.5 mb-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                        {/* Renderización de mensajes */}
                    </div>
                ))}
            </div>
            <form className="mt-4 w-3/4 mx-auto flex">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 rounded-full bg-blue-500 hover:bg-blue-700">
                    <img src="https://i.ibb.co/PjRxhP2/clip-de-papel-de-metal.png" alt="Clip de papel" className="w-6 h-6"/>
                </button>
                <button onClick={handleSendFile} className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={isSending || !file}>
                    {isSending ? "Enviando..." : "Enviar Archivo"}
                </button>
                <input 
                    type="text" 
                    className="flex-1 p-2 border border-gray-300 rounded-lg ml-2" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={isSending}>
                    {isSending ? "Enviando..." : "Enviar Mensaje"}
                </button>
            </form>

            {/* Notificación emergente */}
            {notification.visible && <Notification message={notification.message} success={notification.success} onClose={closeNotification} />}
        </div>
    );
};

export default Chat;
