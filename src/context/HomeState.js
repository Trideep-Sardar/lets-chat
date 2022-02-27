import React,{useState} from 'react'
import homeContext from './homeContext';
const HomeState = (props) => {
    const [user,setUser]=useState('');
    const getUser=(user_val)=>{
        setUser(user_val)
    }
  return (
    <homeContext.Provider value={{getUser,user}}>
        {props.children}
    </homeContext.Provider>
  )
}

export default HomeState;
