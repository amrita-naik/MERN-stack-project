import './navbar.css'
import { CalendarToday, Face, Notifications } from '@material-ui/icons'
import React from 'react'

function NavBar() {
    return (
        <div className='navbar'>
            <div className="nav-icons">
                <Notifications className='nav-icon' />
                <CalendarToday className='nav-icon'/>
                <Face className='nav-icon'/>
            </div>
        </div>
    )
}

export default NavBar
