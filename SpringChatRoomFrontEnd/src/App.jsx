import { useState } from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import LoginComponent from './LoginComponent';
import TextComponent from './TextComponent';
function App() {

  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [connected, setConnected] = useState(false);

  function connect() {
    if (name === ''){
      alert('An empty string in not a valid name!');
      throw new Error('Parameter is not a number!');
    }
    const socket = new SockJS('http://localhost:8080/websocket');
    const client = Stomp.over(socket);
    client.connect({}, () => {
        alert('Connected to server');
        setStompClient(client);
        client.subscribe('/topic/chat', (message) => {
          const obj =JSON.parse(message.body);
          setConnected(true);
          showMessage(obj);
      });
      }, () => alert('Server is down'));
  }

  function disconnect() {
    setName('');
    setMessages([]);
    stompClient.disconnect();
    setConnected(false);
  }

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
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
  const messagesArray = Array.isArray(message) ? message : [message];
  setMessages((prevMessages) => [...prevMessages, ...messagesArray]);
};

  return (
    <div class="solid border-2 border-gray-400 m-auto w-1/2">
    <LoginComponent connect={connect} disconnect={disconnect} handleInputChange={handleInputChange} name={name} connected={connected}/>
    <TextComponent text={text} handleTextChange={handleTextChange} handleSend={handleSend} messages={messages} connected={connected}/>
    </div>
  )
}

export default App
