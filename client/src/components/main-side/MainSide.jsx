import React from 'react'
import './mainside.css'
import Profile from '../profile/Profile'
import Task from '../task/Task'

function MainSide() {
    return (
        <div className='main-side'>
           <Profile />
           <Task />
        </div>
    )
}

export default MainSide
