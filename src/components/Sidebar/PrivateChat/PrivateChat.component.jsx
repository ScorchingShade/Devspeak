import React, { useEffect, useState } from "react";
import {  Comment, Icon, Menu, } from "semantic-ui-react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import classes from "./PrivateChat.component.module.css";
import { setChannel } from "../../../store/actioncreator";
import Avatar from "./Avatar.component";

function PrivateChat(props) {

  const [usersState, setUsersState] = useState([]);

  const usersRef = firebase.database().ref("users");

  useEffect(() => {
    usersRef.on("child_added", (snap) => {
      console.log(snap.val());
      setUsersState((currentState) => {
        let updatedState = [...currentState];

        let user =snap.val();
        user.name = user.displayName;
        user.id =snap.key;
        

        updatedState.push(user);
      
        return updatedState;
      });
    });

    return ()=>{
        usersRef.off();
    }
  }, []);



  const displayUsers = () => {
    if (usersState.length > 0) {
      return usersState.filter((user)=>(user.id!==props.user.uid)).map((user) => {
        return (
        
          <Menu.Item
            key={user.id}
            name={user.name}
            
            onClick={() => props.selectChannel(user)}
            active={props.channel && user.id == props.channel.id}

            className={
               props.channel && user.id != props.channel.id ? classes.item : classes.activex
              }
          >
            <Avatar message={user} userName={user.name}/>  
          </Menu.Item>
        );
      });
    }
  };


  return (
    
      <Menu.Menu className={classes.menu, classes.menuTopMargin} >
        <Menu.Item className={classes.item}>
          <span>
            <Icon name="mail" /> Chat
          </span>
          ({usersState.length-1})
        </Menu.Item>
        {displayUsers()}
        
      </Menu.Menu>

      
    
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
