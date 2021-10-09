import React from 'react'
import {Header, Icon, Input, Segment} from 'semantic-ui-react'

function MessageHeader(props) {
    return (
       <Segment clearing>

           <Header floated="left" fluid="true" as="h2">
               <span>
                   {props.channelName}
                   <Icon name="star outline" />
               </span>
               {props.uniqueUsers>1?<Header.Subheader>{props.uniqueUsers} Users</Header.Subheader>:
               <Header.Subheader>{props.uniqueUsers} User</Header.Subheader>
               }

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
    )
}

export default MessageHeader
