import React, { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

const AIAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [...messages, userMessage],
        model: "llama3-8b-8192",
      });

      const assistantMessage = chatCompletion.choices[0]?.message || { role: 'assistant', content: "I'm sorry, I couldn't generate a response." };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "I'm sorry, an error occurred while generating a response." }]);
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-[500px] h-[600px] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
        <div className="flex-grow overflow-y-auto mb-4 border border-gray-300 rounded-md p-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.content}
              </span>
            </div>
          ))}
          {isLoading && <div className="text-center">AI is thinking...</div>}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow p-2 border border-gray-300 rounded-l-md"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;