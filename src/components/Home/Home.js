import React,{useContext, useState} from 'react';
import './Home.css';
import logo from '../../images/chat.png';
import { NavLink } from 'react-router-dom';
import homeContext from '../../context/homeContext';
const Home = () => {
    const context=useContext(homeContext);
    const{getUser}=context;
    const[user,setUser]=useState('');
    const onChange=(e)=>{
        setUser(e.target.value);
    }
    const handleClick=()=>{
        getUser(user);
    }

  return (
   <>
       <div className="d-flex" id='home-body' style={{justifyContent:"center"}}>
           <div className="box d-flex" style={{flexDirection:"column",alignItems:"center"}}>
               <div className="logo d-flex">
                    <img src={logo} alt="" style={{width:"70%"}} />
                    <h2 className='text-center text-white'>Let's Chat</h2>
               </div>
               <div className="input-section d-flex">
               <input id='user' onChange={onChange} value={user} type="text" className="form-control input-field" placeholder="Enter your username" aria-label="Username"/>
               <NavLink to='/chat'><button disabled={user?false:true} onClick={handleClick} className="btn btn-orange" id='send-btn'>Send</button></NavLink>
               </div>
           </div>
       </div>
   </>
  )
}

export default Home
