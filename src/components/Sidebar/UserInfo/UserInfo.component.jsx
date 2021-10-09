import React, { useEffect, useState } from "react";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import classes from "./UserInfo.module.css";

import firebase from "../../../server/firebase";

function UserInfo(props) {
  const getDropDownOptions = () => {
    return [
      {
        key: "signout",
        text: <span onClick={signOut}>Sign Out</span>,
      },
    ];
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("user signed out"));
  };

  const [userPhoto, setUserPhoto] = useState(null)

  useEffect(() => {
    if(props.user){
      setUserPhoto(props.user.photoURL)
    }
  },[props.user])

  if (props.user) {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row className={classes.userInfoGridRow}>
            <Header inverted as="h2" className={classes.userInfoDisplayName}>
              <Icon name="slack" />
              <Header.Content>DevSpeaks</Header.Content>
            </Header>
            <Header inverted as="h4" className={classes.userInfoDisplayName}>
              <Dropdown
                trigger={
                  <span>
                    <Image
                      src={userPhoto}
                      avatar
                      className={classes.userInfoDisplayImg}
                    ></Image>
                    {props.user.displayName}
                  </span>
                }
                options={getDropDownOptions()}
              ></Dropdown>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }

  return null;
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(UserInfo);
