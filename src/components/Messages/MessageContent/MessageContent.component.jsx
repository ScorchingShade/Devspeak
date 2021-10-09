import React from 'react'
import { Comment } from 'semantic-ui-react'

function MessageContent(props) {
    return (
       <Comment>
           <Comment.Avatar src={props.message.user.avatar}/>
           <Comment.Content>
               <Comment.Author>{props.message.user.name}</Comment.Author>
               <Comment.Metadata>{props.message.user.name}</Comment.Metadata>
               <Comment.Text>{props.message.content}</Comment.Text>
           </Comment.Content>
       </Comment>
    )
}

export default MessageContent
