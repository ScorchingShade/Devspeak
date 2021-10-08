import React, { useState } from "react";
import { Button, Form, Icon, Menu, Modal, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import classes from './Channels.module.css'

function Channels(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [channelAddState, setChannelAddState] = useState({
    name: "",
    description: "",
  });

  const channelsRef = firebase.database().ref("channels");

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
      <Menu.Menu className={classes.menu}> 
        <Menu.Item className={classes.item}>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          (0)
        </Menu.Item>
        <Menu.Item className={classes.item}>
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
  };
};

export default connect(mapStateToProps)(Channels);
