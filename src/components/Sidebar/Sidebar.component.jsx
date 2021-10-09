import React from 'react'
import { Menu } from 'semantic-ui-react'
import Channels from './Channels/Channels.component'
import PrivateChat from './PrivateChat/PrivateChat.component'
import classes from './Sidebar.module.css'
import UserInfo from './UserInfo/UserInfo.component'


function Sidebar() {
    return (
        <Menu vertical fixed="left" borderless size="large" className={classes.sideBar}>
            <UserInfo/>
            <Channels/>
            <PrivateChat/>
            
        </Menu>
    )
}

export default Sidebar
