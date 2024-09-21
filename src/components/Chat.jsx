import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Chat = ({ isOpen, onClose, chatFontScale, onSizeChange }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [size, setSize] = useState(() => {
    const savedSize = localStorage.getItem('chatSize');
    return savedSize ? JSON.parse(savedSize) : { width: 300, height: 400 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const chatRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const MAX_MESSAGES = 10;

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatSize', JSON.stringify(size));
    onSizeChange(size);
  }, [size, onSizeChange]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && chatRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        setPosition({ x: newX, y: newY });
      }
      if (isResizing && chatRef.current) {
        const chatRect = chatRef.current.getBoundingClientRect();
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        switch (resizeDirection) {
          case 'nw':
            newWidth = chatRect.right - e.clientX;
            newHeight = chatRect.bottom - e.clientY;
            newX = e.clientX;
            newY = e.clientY;
            break;
          case 'ne':
            newWidth = e.clientX - chatRect.left;
            newHeight = chatRect.bottom - e.clientY;
            newY = e.clientY;
            break;
          case 'sw':
            newWidth = chatRect.right - e.clientX;
            newHeight = e.clientY - chatRect.top;
            newX = e.clientX;
            break;
          case 'se':
            newWidth = e.clientX - chatRect.left;
            newHeight = e.clientY - chatRect.top;
            break;
        }

        setSize({ 
          width: Math.max(250, newWidth), 
          height: Math.max(200, newHeight) 
        });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsInteracting(false);
      document.body.style.userSelect = 'auto';
    };

    if (isInteracting) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging, isResizing, dragOffset, position, size, resizeDirection, isInteracting]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleMouseDown = (e) => {
    if (chatRef.current) {
      const chatRect = chatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - chatRect.left,
        y: e.clientY - chatRect.top
      });
      setIsDragging(true);
      setIsInteracting(true);
    }
  };

  const handleResizeMouseDown = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setIsInteracting(true);
  };

  const sendMessageToGroq = async (message, context) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a helpful assistant specializing in resume building and career advice. Provide concise, professional advice to help users create compelling resumes." },
            ...context,
            { role: "user", content: message }
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      const aiResponse = response.data.choices[0].message.content;
      return aiResponse;
    } catch (error) {
      console.error('Error sending message to Groq:', error);
      return "Sorry, I couldn't process your request. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const userMessage = { text: inputMessage, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputMessage('');

      // Prepare context from previous messages
      const context = messages.slice(-4).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const aiResponse = await sendMessageToGroq(inputMessage, context);
      const aiMessage = { text: aiResponse, sender: 'ai' };
      
      setMessages(prevMessages => {
        let updatedMessages = [...prevMessages, aiMessage];
        if (updatedMessages.length > MAX_MESSAGES) {
          const halfLength = Math.floor(updatedMessages.length / 2);
          updatedMessages = updatedMessages.slice(halfLength);
        }
        return updatedMessages;
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  const messageStyle = {
    fontSize: `${chatFontScale * 100}%`,
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={chatRef}
      className="fixed bg-white rounded-lg shadow-lg flex flex-col"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 9999,
        userSelect: isInteracting ? 'none' : 'auto',
      }}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-8 bg-blue-600 cursor-move rounded-t-lg flex justify-between items-center px-2"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-lg font-bold text-white">Resume Assistant</h2>
        <button
          onClick={onClose}
          className="text-white bg-red-500 hover:bg-red-500 rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div 
        className="flex-grow overflow-y-auto overflow-x-hidden mt-8 mb-2 border border-gray-300 rounded-md p-2 mx-2"
        style={messageStyle}
      >
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div 
              className={`inline-block p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} text-black break-words max-w-[90%]`}
              style={messageStyle}
            >
              {message.sender === 'user' ? (
                <p>{message.text}</p>
              ) : (
                <ReactMarkdown className="prose max-w-none">
                  {message.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-center text-gray-500">AI is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col px-2 pb-2">
        <textarea
          ref={textareaRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-grow p-2 border border-gray-300 rounded-md bg-white text-black resize-none"
          style={messageStyle}
          placeholder="Ask for resume advice..."
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
          style={messageStyle}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
      <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}></div>
      <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'se')}></div>
    </div>
  );
};

export default Chat;