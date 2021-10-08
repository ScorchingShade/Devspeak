import React, { useState } from "react";
import { Button, Form, Icon, Menu, Modal, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

function Channels() {
  const [modalOpenState, setModalOpenState] = useState(false);
  const [channelAddState, setChannelAddState] = useState({Name:'', Description:''});

  

  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };

  const onSubmit = () => {};

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
      <Menu.Menu>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          (0)
        </Menu.Item>
        <Menu.Item>
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
                value={channelAddState.Name}
                name="Name"
                type="text"
                placeholder="Enter Channel Name"
                onChange={handleInput}
              />

              <Form.Input
                value={channelAddState.Description}
                name="Description"
                onChange={handleInput}
                type="text"
                placeholder="User Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onSubmit}>
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

export default connect()(Channels);
