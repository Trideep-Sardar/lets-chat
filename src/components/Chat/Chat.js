import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import socketIo from 'socket.io-client';
import homeContext from '../../context/homeContext';
import ChatItem from './ChatItem';
const ENDPOINT='http://localhost:5000/';
let socket;
const Chat = () => {
    const [messages,setMessages]=useState([]);
    const [id,setId]=useState('');

    const context=useContext(homeContext);
    const {user}=context;
    const handleClick=()=>{
        let newmessage=document.getElementById('input-field').value;
        socket.emit('message',{message:newmessage,id:id})
        // setMessages([...messages,newmessage]);
        // console.log(messages);
        document.getElementById('input-field').value="";
       
    }
    useEffect(()=>{
        socket=socketIo(ENDPOINT,{transports:['websocket']});
         socket.on("connect",()=>{
             setId(socket.id);
        })

        socket.emit('joined',{user:user});

        socket.on('welcome',(data)=>{
        setMessages([...messages,data]);
        console.log(` ${data.user} ${data.message}`)});

        
        return()=>{
            socket.disconnect();
            socket.off();
        }
    },[]);
    useEffect(()=>{
        socket.on('send',(data)=>{
            console.log(`${data.user}: ${data.message}`);
            setMessages([...messages,data]);
        })
        socket.on('userJoined',(data)=>{
            setMessages([...messages,data])
            console.log(` ${data.user}${data.message}`)
        });
        socket.on('leave',(data)=>{
            setMessages([...messages,data])
            console.log(`${data.user} ${data.message}`);
        });
        return ()=>{
            socket.off();
        }
        
    },[messages])

  return (
    <>
        <div className="d-flex" id='chat-body'>
            <div className="chat-box d-flex">
                <ScrollToBottom className="chat-section">
                    {
                        messages.map((item,idx)=>{
                            return <div key={idx}>
                            <ChatItem message={item.message} classs={item.id===id?"right":"left"} user={item.id===id?"":item.user}/>
                            </div>
                        })
                    }
                </ScrollToBottom>
                <div className="input-section d-flex">
               <input onKeyPress={(event)=>event.key==="Enter"?handleClick():null} type="text" id='input-field' className="form-control input-field" placeholder="Enter your username" aria-label="Username"/>
               <button onClick={handleClick} className="btn btn-orange" id='send-btn'>Send</button>
               </div>
            </div>
        </div>
    </>
  )
}

export default Chat
