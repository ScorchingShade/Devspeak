import React from 'react'
import { Menu } from 'semantic-ui-react'
import classes from './Sidebar.module.css'
import UserInfo from './UserInfo/UserInfo.component'


function Sidebar() {
    return (
        <Menu vertical fixed="left" borderless size="large" className={classes.sideBar}>
            <UserInfo/>
            
        </Menu>
    )
}

export default Sidebar
