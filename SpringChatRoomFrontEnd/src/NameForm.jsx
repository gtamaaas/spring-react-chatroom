import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

function NameForm() {
  const [name, setName] = useState('');
  const [connected, setConnected] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (connected) {
      const socket = new SockJS('http://localhost:8080/websocket');
      const client = Stomp.over(socket);
      client.connect({}, () => {
        setStompClient(client);
        setConnected(true);
        client.subscribe('/topic/chat', (message) => {
          showMessage(JSON.parse(message.body));
        });
      });
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [connected]);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageInputChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleButtonClick = () => {
    if (!connected) {
      setConnected(true);
    } else {
      setConnected(false);
      setName('');
      setStompClient(null);
    }
  };

  const handleSendMessage = () => {
    if (connected && messageText.trim() !== '') {
      const message = { name: name, text: messageText };
      stompClient.send('/app/sendMessage',  JSON.stringify(message), {});
      setMessageText('');
      setMessages([...messages, message]); // Append sent message to the messages list
    }
  };

  const showMessage = (message) => {
    setMessages([...messages, message]); // Append received message to the messages list
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>
        {connected ? 'Disconnect' : 'Connect'}
      </button>
      {connected && (
        <div>
          <input
            type="text" name="text"
          />
          <button type="submit">Send</button>
        </div>
      )}

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.name}: </strong>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NameForm;
