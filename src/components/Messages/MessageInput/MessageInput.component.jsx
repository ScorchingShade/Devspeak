import React from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

function MessageInput() {

    const createActionButtons=()=>{
        return <>
            <Button icon="send"/>
            <Button icon ="upload"/>
        </>
    }


    return (
        <Segment>
            <Input
                fluid="true"
                name="message"
                value="test message"
                label={createActionButtons()}
                labelPosition="right"
            
            />
        </Segment>
    )
}

export default MessageInput
