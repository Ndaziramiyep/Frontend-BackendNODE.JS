import React from 'react'
import axios from 'axios';
// import session from 'express-session';

function register() {
    // session.post("/students",{d,f},(res,error)=>{
    //     console.log("This is session!");
    // })
    axios.post("http://localhost:4500/welcome")
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error));

  return (
    <div>
      
    </div>
  )
}

export default register

// Posts a message to the inspector back-end. callback will be notified when a response is received. callback is a function that accepts two optional arguments: error and message-specific result.

// session.post('Runtime.evaluate', { expression: '2 + 2' },
//              (error, { result }) => console.log(result));
// Output: { type: 'number', value: 4, description: '4' }