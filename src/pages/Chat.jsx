import React, { useState } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([
        { text: "¿Cómo te puedo ayudar hoy?", time: new Date().toLocaleTimeString(), sender: 'system' }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return; // Evitar enviar mensajes vacíos

        // Añadir el mensaje del usuario
        const userMessage = { text: inputValue, time: new Date().toLocaleTimeString(), sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Limpiar el input
        setInputValue("");

        // Simular la respuesta del sistema
        setTimeout(() => {
            const systemResponse = { text: `Respuesta del sistema a: ${inputValue}`, time: new Date().toLocaleTimeString(), sender: 'system' };
            setMessages((prevMessages) => [...prevMessages, systemResponse]);
        }, 1000); // Retraso de 1 segundo para simular la respuesta
    };

    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-lg mt-16"> {/* Añadir mt-16 aquí */}
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
            <form onSubmit={handleSendMessage} className="mt-4 flex">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Chat;
