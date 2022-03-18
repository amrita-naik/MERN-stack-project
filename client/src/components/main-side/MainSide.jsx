import React from 'react'
import './mainside.css'
import Profile from '../profile/Profile'
import Task from '../task/Task'

function MainSide({username}) {
    return (
        <div className='main-side'>
           <Profile username={username}/>
           <Task />
        </div>
    )
}

export default MainSide
