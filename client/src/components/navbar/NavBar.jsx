import './navbar.css'
import { CalendarToday, Face, Notifications } from '@material-ui/icons'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function NavBar({handleLogout}) {

    const [showCalendar, setShowCalendar] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    return (
        <div className='navbar'>
            <div className="nav-icons">
                <Notifications className='nav-icon' />
                <CalendarToday className='nav-icon' onClick={() => {setShowCalendar(!showCalendar)}} />
                <Face className='nav-icon' onClick={() => {setShowProfile(!showProfile)}} />
                {showCalendar && <div className='calendar-container'> <Calendar className='calendar' /> </div>}
                {showProfile && <div className='logout'><button className='logout-btn' onClick={handleLogout}>Logout</button> </div>}
            </div>
        </div>
    )
}

export default NavBar
