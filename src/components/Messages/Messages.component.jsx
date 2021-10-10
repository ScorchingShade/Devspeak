import React, { useEffect, useRef, useState } from "react";
import MessageHeader from "./MessageHeader/MessageHeader.component";
import MessageInput from "./MessageInput/MessageInput.component";

import firebase from "../../server/firebase";
import { connect } from "react-redux";
import MessageContent from "./MessageContent/MessageContent.component";
import { Comment, Segment } from "semantic-ui-react";
import classes from "./Messages.component.module.css";

import {setfavouriteChannel, removefavouriteChannel} from "../../store/actioncreator"

function Messages(props) {
  const messageRef = firebase.database().ref("messages");

  const usersRef = firebase.database().ref('users');

  const [messagesState, setMessagesState] = useState([]);

  const [searchTermState, setSearchTermState]= useState("");

  let divRef = useRef();

  

  useEffect(() => {
    if (props.channel) {
      setMessagesState([]);
      messageRef.child(props.channel.id).on("child_added", (snap) => {
        setMessagesState((currentState) => {
          let updatedState = [...currentState];
          updatedState.push(snap.val());
          return updatedState;
        });
      });
      return () => messageRef.child(props.channel.id).off();
    }
  }, [props.channel]);



  useEffect(() => {
    if (props.user) {
        usersRef.child(props.user.uid).child("favourite")
            .on('child_added', (snap) => {
                props.setfavouriteChannel(snap.val());
            })

        usersRef.child(props.user.uid).child("favourite")
            .on('child_removed', (snap) => {
                props.removefavouriteChannel(snap.val());
            })

        return () => usersRef.child(props.user.uid).child("favourite").off();
    }
  }, [props.user]);


  useEffect(()=> {
    divRef.scrollIntoView({behavior : 'smooth'});
},[messagesState])

  const displayMessages = () => {
      let messagesToDisplay =searchTermState ? filterMessageBySearchTerm():messagesState
    if (messagesToDisplay.length > 0) {
      return messagesToDisplay.map((message) => {
        return (
          <MessageContent
          imageLoaded={imageLoaded} 
            key={message.timestamp + Math.floor(Math.random() * 1000)}
            message={message}
            ownMessage={!props.user ? "" : message.user.id === props.user.uid}
          ></MessageContent>
        );
      });
    }
  };

  const imageLoaded= () => {
    divRef.scrollIntoView({behavior : 'smooth'});
}

  const uniqueusersCount = () => {
    const uniqueUsers = messagesState.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);

    return uniqueUsers.length;
  };


  const searchTermChange =(e)=>{
    const target = e.target;
    setSearchTermState(target.value);
  }

  const filterMessageBySearchTerm=()=>{
      const regex = new RegExp(searchTermState,"gi");
      const messages = messagesState.reduce((acc,message)=>{
          if((message.content && message.content.match(regex))||message.user.name.match(regex)){
              acc.push(message);
          }
          return acc;
      },[])

      return messages;
  }

  const starChange = () => {
    let favouriteRef = usersRef.child(props.user.uid).child("favourite").child(props.channel.id);
    if (isStarred()) {
        favouriteRef.remove();
    } else {
        favouriteRef.set({ channelId: props.channel.id, channelName: props.channel.name })
    }
}


const isStarred = () => {
    return Object.keys(props.favouriteChannels).includes(props.channel?.id);
}

  return (
    <div className={classes.messageContainer}>
      <MessageHeader
        starChange={starChange}
        starred={isStarred()}
        channelName={props.channel?.name}
        isPrivateChat={props.channel?.isPrivateChat}
        uniqueUsers={uniqueusersCount()}
        searchTermChange={searchTermChange}
        user={props.channel}
      />

      <Segment className={classes.messagecontent}>
        <Comment.Group>{displayMessages()}
            <div ref={currentEl => divRef = currentEl}></div>
        </Comment.Group>
      </Segment>

      <MessageInput />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel,
    user: state.user.currentUser,
    favouriteChannels: state.favouriteChannel.favouriteChannel
  };
};


const mapDispatchToProps=(dispatch) => {
    return {
        setfavouriteChannel: (channel) => dispatch(setfavouriteChannel(channel)),
        removefavouriteChannel: (channel) => dispatch(removefavouriteChannel(channel)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Messages);
