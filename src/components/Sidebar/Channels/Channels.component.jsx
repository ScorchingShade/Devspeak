import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Menu, Modal, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import classes from "./Channels.module.css";
import { setChannel } from "../../../store/actioncreator";
import { Notification } from "../Notification/Notification.component";

function Channels(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [channelsState, setChannelsState] = useState([]);
  const [channelAddState, setChannelAddState] = useState({
    name: "",
    description: "",
  });

  const channelsRef = firebase.database().ref("channels");
  const usersRef = firebase.database().ref("users");

  useEffect(() => {
    channelsRef.on("child_added", (snap) => {
      console.log(snap.val());
      setChannelsState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.val());
      
        return updatedState;
      });
    });

    return ()=>{
        channelsRef.off();
    }
  }, []);

  useEffect(() =>{
    if (channelsState.length > 0) {
        props.selectChannel(channelsState[0]);
      }
  },[!props.channel ? channelsState:null])

  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };

  const checkIfFormValid = () => {
    return (
      channelAddState && channelAddState.name && channelAddState.description
    );
  };

  const displayChannels = () => {
    if (channelsState.length > 0) {
      return channelsState.map((channel) => {
        return (
        
          <Menu.Item
            key={channel.id}
            name={channel.name}
            
            onClick={() => selectChannel(channel)}
            active={props.channel && channel.id == props.channel.id && !props.channel.isFavourite}

            className={
              
               (props.channel && channel.id == props.channel.id) && !props.channel.isFavourite ? classes.activex : classes.item 
              }

              
          >
            <Notification user={props.user} channel={props.channel}
                        notificationChannelId={channel.id}
                        displayName= {channel.name} 
                        typeName="channel"
                        />
          </Menu.Item>
        );
      });
    }
  };

  const selectChannel = (channel) => {
    setLastVisited(props.user,props.channel);
    setLastVisited(props.user,channel);
    props.selectChannel(channel);
}

  const setLastVisited = (user, channel) => {
    const lastVisited = usersRef.child(user.uid).child("lastVisited").child(channel.id);
    lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
    lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
}

  const onSubmit = () => {
    if (!checkIfFormValid()) {
      return;
    }

    const key = channelsRef.push().key;

    const channel = {
      id: key,
      name: channelAddState.name,
      description: channelAddState.description,
      created_by: {
        name: props.user.displayName,
        avatar: props.user.photoURL,
      },
    };
    setIsLoading(true);
    channelsRef
      .child(key)
      .update(channel)
      .then(() => {
        setChannelAddState({ name: "", description: "" });
        setIsLoading(false);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    let target = e.target;
    setChannelAddState((currentState) => {
      let updatedState = { ...currentState };
      updatedState[target.name] = target.value;
      return updatedState;
    });
  };

  return (
    <>
      <Menu.Menu className={classes.menu} style={{marginTop:'35px'}}>
        <Menu.Item className={classes.item}>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          <span>
          ({channelsState.length})
          </span>
        </Menu.Item>
        {displayChannels()}
        <Menu.Item className={classes.item} style={{marginTop:'0.8rem'}}>
          <span onClick={openModal}>
            <Icon name="add" /> ADD
          </span>
        </Menu.Item>
      </Menu.Menu>

      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>Create Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              {/* name and value needs to be the same as specified in the state json object */}

              <Form.Input
                value={channelAddState.name}
                name="name"
                type="text"
                placeholder="Enter Channel Name"
                onChange={handleInput}
              />

              <Form.Input
                value={channelAddState.description}
                name="description"
                onChange={handleInput}
                type="text"
                placeholder="User Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button loading={isLoading} onClick={onSubmit}>
            <Icon name="checkmark" /> Save
          </Button>

          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
