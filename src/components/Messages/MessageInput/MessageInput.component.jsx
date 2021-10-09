import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Input, Segment } from "semantic-ui-react";
import firebase from "../../../server/firebase";
import ImageUpload from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";

function MessageInput(props) {
  const messageRef = firebase.database().ref("messages");
  const storageRef = firebase.storage().ref();

  const [messageState, setMessageState] = useState("");
  const [fileDialogState, setFileDialogState] = useState(false);

  const createMessageInfo = (downloadUrl) => {
    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: messageState,
      image:downloadUrl||"",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const sendMessage = (downloadUrl) => {
    if (messageState || downloadUrl) {
      messageRef
        .child(props.channel.id)
        .push()
        .set(createMessageInfo(downloadUrl))
        .then(() => setMessageState(""))
        .catch((err) => console.log(err));
    }
  };

  const onMessageChange = (e) => {
    const target = e.target;
    setMessageState(target.value);
  };

  const createActionButtons = () => {
    return (
      <>
        <Button icon="send" onClick={()=>{sendMessage()}} />
        <Button icon="upload" onClick={() => setFileDialogState(true)} />
      </>
    );
  };

  const uploadImage = (file, contentType) => {
    const filePath = `chat/images/${uuidv4()}.jpg`;

    storageRef
      .child(filePath)
      .put(file, { contentType: contentType })
      .then((data) => {
          data.ref.getDownloadURL().then((url)=>{
              sendMessage(url)
          })
      })
      .catch((err) => console.log(err));

      
  };

  return (
    <Segment>
      <Input
        onChange={onMessageChange}
        fluid={true}
        name="message"
        value={messageState}
        label={createActionButtons()}
        labelPosition="right"
      />

      <ImageUpload
      uploadImage={uploadImage}
        open={fileDialogState}
        onClose={() => setFileDialogState(false)}
      />
    </Segment>
  );
}

const mapStateToProps = (state) => {
  return {
      
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
