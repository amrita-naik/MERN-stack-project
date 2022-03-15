import React from 'react'
import MainSide from '../../components/main-side/MainSide'
import Main from '../../components/main/Main'
import './home.css'

function Home() {
    return (
        <div className='home'>
            <Main />
            <MainSide />
            
        </div>
    )
}

export default Home
