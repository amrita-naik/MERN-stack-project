import './navbar.css'
import { CalendarTodayOutlined, FaceOutlined, NotificationsOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function NavBar({handleLogout, socket, user}) {

    const [showCalendar, setShowCalendar] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        socket.on('get_notification', (data) => {
            setNotifications((prev) => [...prev, data])
        })
        console.log('get notif')
    }, [socket])

    const displayNotification = (senderName, n) => {
        console.log('display')
        return (
          <span className="notification">{`${senderName} sent a new message`}</span>
        );
      };

    return (
        <div className='navbar'>
            <div className="nav-icons">
                <NotificationsOutlined className='nav-icon' onClick={() => {setShowNotifications(!showNotifications)}} />
                <CalendarTodayOutlined className='nav-icon' onClick={() => {setShowCalendar(!showCalendar)}} />
                <FaceOutlined className='nav-icon' onClick={() => {setShowProfile(!showProfile)}} />
                {showCalendar && <div className='calendar-container'> <Calendar className='calendar' /> </div>}
                {showProfile && <div className='logout'><button className='logout-btn' onClick={handleLogout}>Logout</button> </div>}
                {showNotifications && 
                    <div className="notifications">
                        {notifications.map((n) => displayNotification(n))}
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar
