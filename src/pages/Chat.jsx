import { useState, useRef } from "react";
import axios from "axios";


const Chat = () => {
    const [messages, setMessages] = useState([
        { text: "¿Cómo te puedo ayudar hoy?", time: new Date().toLocaleTimeString(), sender: 'system' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (isSending) return;

        const timestamp = new Date().toLocaleTimeString();

        // Si hay un archivo seleccionado, sube el archivo.
        if (file) {
            await handleFileUpload(timestamp);
        } 
        // Si hay un mensaje, envíalo.
        else if (inputValue.trim() !== "") {
            await handleTextMessage(timestamp);
        }
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
                text: response.data.answer,
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
        if (!file) return;
        setIsSending(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post("http://127.0.0.1:8001/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const systemResponse = {
                text: `Archivo "${file.name}" subido con éxito.`,
                time: timestamp,
                sender: 'system'
            };
            setMessages((prevMessages) => [...prevMessages, systemResponse]);
            setFile(null);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            const errorMessage = {
                text: "Hubo un error al subir el archivo. Por favor, inténtalo de nuevo.",
                time: timestamp,
                sender: 'system'
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsSending(false);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div className="flex flex-col  h-screen p-4 mt-2 py-8 bg-blue-300">
            <div className="flex-1 overflow-y-auto  w-3/4 mx-auto p-4 border bg-white border-gray-300 rounded-lg mt-16 bg-cover bg-no-repeat bg-center" 
                style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('https://i.ibb.co/tD1648m/Rag-Gallery-Logo.png')`,
                        backgroundSize: 'contain' }}>
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
                                <img 
                                    className="w-8 h-8 rounded-full" 
                                    src="/docs/images/people/system-avatar.jpg" 
                                    alt="System Avatar" 
                                />
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
            <form onSubmit={handleSendMessage} className="mt-4  w-3/4 mx-auto flex">
                <button type="button" 
                    onClick={() => fileInputRef.current.click()} 
                    className="p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                    </svg>
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                />
                <input type="text" className="flex-1 p-2 border border-gray-300 rounded-lg" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe un mensaje..." disabled={isSending}
                />
                <button 
                    type="submit" 
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" 
                    disabled={isSending}
                >
                    {isSending ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </div>
    );
};

export default Chat;