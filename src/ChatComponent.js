import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./ChatComponent.css";  // Styles from before

const ChatComponent = () => {
  const [username, setUsername] = useState("");  // To store the user's name
  const [isConnected, setIsConnected] = useState(false);  // To track connection state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);

  // Connect to the WebSocket server once the username is set
  useEffect(() => {
    if (isConnected) {
      const socket = new SockJS("http://localhost:8085/chat");
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, (frame) => {
        console.log("Connected: " + frame);
        stompClient.subscribe("/topic/messages", (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      });

      setStompClient(stompClient);
    }
  }, [isConnected]);

  // Send the message through WebSocket
  const handleSendMessage = () => {
    if (stompClient && input.trim()) {
      const messageData = {
        sender: username,
        content: input,
      };
      stompClient.send("/app/message", {}, JSON.stringify(messageData));
      setInput("");  // Clear the input field after sending
    }
  };

  // Render the UI
  return (
    <div className="chat-container">
      {!isConnected ? (
        // Username input before connecting
        <div className="username-input">
          <h3>Enter your username to join the chat:</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={() => setIsConnected(true)}>Join Chat</button>
        </div>
      ) : (
        <>
          {/* Chat Header */}
          <div className="chat-header">
            <h3>Quick-Talk - {username}</h3>
          </div>

          {/* Chat Box */}
          <div className="chat-box">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-bubble ${msg.sender === username ? "self" : ""}`}>
                <strong>{msg.sender}:</strong> <p>{msg.content}</p>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
