import './profile.css'
import React from 'react'

function Profile({username}) {
    return (
        <div className='profile'>
            <h2>Name: {username}</h2>
            <h3>Course: </h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, earum.</p>
        </div>
    )
}

export default Profile
