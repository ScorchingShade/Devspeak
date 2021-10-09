import React, { useState } from "react";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import mime from "mime-types";

function ImageUpload(props) {
  const [fileState, setFileState] = useState(null);

  const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];

  const onFileAdded = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileState(file);
    }
  };

  const submit = () => {
    if (fileState && acceptedTypes.includes(mime.lookup(fileState.name))) {
      props.uploadImage(fileState, mime.lookup(fileState.name));
      props.onClose();
      setFileState(null);
    }
  };

  return (
    <Modal basic open={props.open} onClose={props.onClose}>
      <Modal.Header>Select a Image</Modal.Header>
      <Modal.Content>
        <Input
          type="file"
          name="file"
          onChange={onFileAdded}
          label="File Type (png , jpeg)"
          fluid={true}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button color="green" onClick={submit}>
          <Icon name="checkmark" />
          Add
        </Button>

        <Button color="red" onClick={props.onClose}>
          <Icon name="remove" />
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ImageUpload;
