import { useState, useRef } from "react";
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

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (isSending || inputValue.trim() === "") return;

        const timestamp = new Date().toLocaleTimeString();
        await handleTextMessage(timestamp);
    };

    const handleSendFile = async (e) => {
        e.preventDefault();
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
                time: timestamp,
                sender: 'system'
            };
            setMessages((prevMessages) => [...prevMessages, systemResponse]);
        } catch (error) {
            console.error("Error al obtener la respuesta del sistema:", error);
            const errorMessage = {
                text: "Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
                time: timestamp,
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
            // Mostrar notificación de éxito (fondo azul)
            setNotification({ visible: true, message: `Archivo "${file.name}" subido con éxito.`, success: true });
            setFile(null);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            // Mostrar notificación de error (fondo rojo)
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
                        {message.sender === 'user' ? (
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Tú</span>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{message.time}</span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-blue-600 bg-blue-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">{message.text}</p>
                                </div>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                            </div>
                        ) : (
                            <>
                                <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/1XrCBKP/usuario.png" alt="System Avatar"/>
                                <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Sistema</span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{message.time}</span>
                                    </div>
                                    <div className="flex flex-col leading-1.5 p-4 border-gray-600 bg-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                        <p className="text-sm font-normal text-gray-900 dark:text-white">{message.text}</p>
                                    </div>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                                </div>
                            </>
                        )}
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
                <input type="text" className="flex-1 p-2 border border-gray-300 rounded-lg ml-2" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe un mensaje..." disabled={isSending}/>
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
