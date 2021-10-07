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
import classes from "../Auth.module.css";
import firebase from "../../../server/firebase.js";
import { Link } from "react-router-dom";

function Login() {
  const user = {
    email: "",
    password: "",
  };

  let errors = [];

  const [errorState, seterrorState] = useState(errors);
  const [userState, setuserState] = useState(user);
  const [isLoading, setIsLoading] = useState(false);



  const handleInput = (event) => {
    let target = event.target;

    setuserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
    });
  };

  const onSubmit = (event) => {
    seterrorState(() => []);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then((user) => {
          setIsLoading(false);
          console.log(user);
        })
        .catch((servererror) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(servererror));
          console.error(servererror);
        });
    } else {
    }
  };

  const isFormEmpty = () => {
    return !userState.password.length || !userState.email.length;
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please fill in all fields" })
      );
      return false;
    }
    return true;
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
          Login
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            {/* name and value needs to be the same as specified in the state json object */}

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
          </Segment>
          <Button
            className={classes.btnSubmit}
            disabled={isLoading}
            loading={isLoading}
          >
            Login
          </Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}

        <Message>
          Not a User? <Link to="/register">Register here!</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
