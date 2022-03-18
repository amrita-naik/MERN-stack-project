import React from 'react'
import MainSide from '../../components/main-side/MainSide'
import Main from '../../components/main/Main'
import './home.css'


function Home({username}) {
    return (
        <div className='home'>
            <Main />
            <MainSide username={username}/>
            
        </div>
    )
}

export default Home
