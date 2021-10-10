import React from "react";
import { Icon, Image } from "semantic-ui-react";

function Avatar(props) {
  
  return (
    <div style={{padding:'0.3rem', marginTop:'0.2rem',}}>
      {props.message.avatar}

      <Image src={props.message.photoURL} avatar></Image>
      <span style={{fontSize: '0.9rem'}}>{props.userName}
      </span>
      

    </div>
  );
}

export default Avatar;
