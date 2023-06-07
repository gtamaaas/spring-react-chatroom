
import * as React from 'react';


export default function LoginComponent({connect, disconnect, handleInputChange, name, connected}) {
  if(connected)
    return (
      <div>
        <h1 class='text-center p-5'> Chatroom Application</h1>
        <input type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} value={name}/>
        <button onClick={disconnect} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Disconnect
        </button>
      </div>
    );
    else
    return (
      <div>
        <h1 class='text-center p-5'> Chatroom Application</h1>
        <input type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} value={name}/>
        <button onClick={connect} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Connect
        </button>
      </div>
    );
}