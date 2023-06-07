import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';


export default function TextComponent({text, handleTextChange, handleSend, messages, connected}) {

    if (connected)
    return (
      <div>
        <input type="text" value={text} onChange={handleTextChange} class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <button onClick={handleSend}  class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send</button>
        {messages.map((message, index) => (
        <div key={index} class="solid border-2 border-gray-400 m-auto p-2">
          ({message.timestamp.substring(11, 16)}) <strong>{message.user}: </strong>
          {message.content}
        </div>
        ))}
      </div>
    );
} 