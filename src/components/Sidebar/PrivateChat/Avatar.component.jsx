import React from "react";
import { Icon, Image } from "semantic-ui-react";

function Avatar(props) {
  
  return (
    <div style={{padding:'0.3rem', marginTop:'0.2rem',}}>
      {props.message.avatar}

      <Image src={props.message.photoURL} avatar></Image>
      <span style={{fontSize: '0.9rem'}}>{props.userName}
      {/* <Icon name="circle" color={`${props.connectedUsersState.indexOf(props.message.id)!==-1?"green":"red"}`} style={{right: "0"}}/> */}
     
      </span>
      

    </div>
  );
}

export default Avatar;
