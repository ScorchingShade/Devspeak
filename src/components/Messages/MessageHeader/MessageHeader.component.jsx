import React from 'react'
import {Header, Icon, Input, Segment} from 'semantic-ui-react'

function MessageHeader() {
    return (
       <Segment clearing>

           <Header floated="left" fluid="true" as="h2">
               <span>
                   CHANNEL
                   <Icon name="star outline" />
               </span>
               <Header.Subheader>3 Users</Header.Subheader>

           </Header>
           <Header floated="right">
               <Input
                    name="search"
                    icon="search"
                    placeholder="Search Messages"
                    size="mini"

               />

           </Header>

       </Segment>
    )
}

export default MessageHeader
