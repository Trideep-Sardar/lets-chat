import React from "react";

const ChatItem = (props) => {
    const{message,user,classs}=props;
    if(user){
        return (
          <>
          {user==='Admin'?
          <div className="admin-chat" style={{fontWeight:"bold",textDecoration:"underline"}}>
            <p><span className="text-warning" >{`${user}`}</span>{`: ${message}`}</p>
          </div>:<div className={`chat-input ${classs}`}>
            {`${user}:${message}`}
          </div>}
          </>
        );
    }else{
        return ( 
            <div className={`chat-input ${classs}`}>
              <p><span style={{fontWeight:"bold"}}>You: </span>{`${message}`}</p>
            </div>
          );
    }
};

export default ChatItem;
