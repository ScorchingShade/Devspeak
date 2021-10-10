import React from "react";
import { Header, Icon, Image, Input, Segment } from "semantic-ui-react";

function MessageHeader(props) {
  return (
    <Segment clearing>
      <Header floated="left" fluid="true" as="h2">
        <span>
          {props.isPrivateChat ? (
            <span>
              <Image src={props.user.photoURL} avatar></Image>{" "}
              {props.channelName}
            </span>
          ) : (
            "# " + props.channelName
          )}

          {!props.isPrivateChat && (
            <Icon
              onClick={props.starChange}
              name={props.starred ? "star" : "star outline"}
              color={props.starred ? "yellow" : "black"}
              style={{pointer:'cursor !important'}}
            />
          )}
        </span>

        {props.isPrivateChat ? (
          ""
        ) : props.uniqueUsers > 1 ? (
          <Header.Subheader>{props.uniqueUsers} Users</Header.Subheader>
        ) : (
          <Header.Subheader>{props.uniqueUsers} User</Header.Subheader>
        )}
      </Header>
      <Header floated="right">
        <Input
          name="search"
          icon="search"
          placeholder="Search Messages"
          size="mini"
          onChange={props.searchTermChange}
        />
      </Header>
    </Segment>
  );
}

export default MessageHeader;
