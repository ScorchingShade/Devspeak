import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import classes from "../Auth.module.css"
import firebase from "../../../server/firebase.js";
import {Link} from 'react-router-dom'

function Register() {
  const user = {
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  let errors = [];
  let userCollectionRef = firebase.database().ref("users");

  const [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInput = (event) => {
    let target = event.target;

    setuserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
    });
  };

  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmpassword.length ||
      !userState.email.length
    );
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      seterrorState((error) =>
        error.concat({
          message: "Given password is not valid, lenght must be greater than 8",
        })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      seterrorState((error) =>
        error.concat({ message: "Passwords do not match!" })
      );
      return false;
    }

    return true;
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please fill in all fields" })
      );
      return false;
    } else if (!checkPassword()) {
      return false;
    }

    return true;
  };

  const onSubmit = (event) => {
    seterrorState(() => []);
    setIsSuccess(false)
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createUser) => {
          setIsLoading(false);
          updateuserDetails(createUser);
        })
        .catch((servererror) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(servererror));
          console.error(servererror);
        });
    } else {
    }
  };

  const updateuserDetails = (createdUser) => {
    if (createdUser) {
      setIsLoading(true);
      createdUser.user
        .updateProfile({
          displayName: userState.userName,
          photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
        })
        .then(() => {
          setIsLoading(false);
          saveUserInDB(createdUser);
        })
        .catch((servererror) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(servererror));
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    setIsLoading(true);
    userCollectionRef
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((servererror) => {
        setIsLoading(false);
        seterrorState((error) => error.concat(servererror));
      });
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid
      verticalAlign="middle"
      textAlign="center"
      className={classes.gridForm}
    >
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h1">
          <Icon name="slack" />
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            {/* name and value needs to be the same as specified in the state json object */}
            <Form.Input
              name="userName"
              value={userState.userName}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />

            <Form.Input
              value={userState.email}
              name="email"
              icon="mail"
              iconPosition="left"
              type="email"
              placeholder="User Email"
              onChange={handleInput}
            />

            <Form.Input
              value={userState.password}
              name="password"
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />

            <Form.Input
              value={userState.confirmpassword}
              name="confirmpassword"
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
          </Segment>
          <Button
            className={classes.btnSubmit}
            disabled={isLoading}
            loading={isLoading}
          >
            Submit
          </Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
         { isSuccess && (
          <Message success>
            <h3>Successfully registered!</h3>
            {formaterrors()}
          </Message>
        )}

        <Message>
          Already an User? <Link to="/login">Login here!</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
