import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

function NameFormOld() {
  const [name, setName] = useState('');
  const [connected, setConnected] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    let stompClient;
    let subscribed = false
    if (connected) {
      const socket = new SockJS('http://localhost:8080/websocket');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, () => {
        setConnected(true);
        setStompClient(stompClient);
        stompClient.subscribe('/topic/chat', (message) => {
          if (!subscribed) {
            const arr = JSON.parse(message.body);
            arr.map(messages => showMessage(messages));
            subscribed = true;
          }
          else
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

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    if (!connected) {
      setConnected(true);
    } else {
      setConnected(false);
      setName('');
      setText('');
      setMessages([]);
    }
  };

  const handleSend = () => {
    if (text.trim() !== '') {
      const message = {
        name: name,
        text: text,
      };
      stompClient.send('/app/sendMessage', JSON.stringify(message), {});
      setText('');
    }
  };

  const showMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>
        {connected ? 'Disconnect' : 'Connect'}
      </button>
      {connected && (
        <div>
          <input type="text" value={text} onChange={handleTextChange} />
          <button onClick={handleSend}>Send</button>
        </div>
      )}
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.user}: </strong>
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default NameFormOld;
