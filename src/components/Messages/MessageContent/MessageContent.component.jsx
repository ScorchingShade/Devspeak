import React from 'react'
import { Comment } from 'semantic-ui-react'
import TimeAgo from 'javascript-time-ago'
import en from  "javascript-time-ago/locale/en"
import classes from "./MessageContent.component.module.css"


TimeAgo.locale(en)
const timeAgo = new TimeAgo();

function MessageContent(props) {



    

    return (
       <Comment>
           <Comment.Avatar src={props.message.user.avatar}/>
           <Comment.Content className={props.ownMessage?classes.ownMessage:null}>
               <Comment.Author as="a">{props.message.user.name}</Comment.Author>
               <Comment.Metadata>{timeAgo.format(props.message.timestamp)}</Comment.Metadata>
               <Comment.Text>{props.message.content}</Comment.Text>
           </Comment.Content>
       </Comment>
    )
}

export default MessageContent
