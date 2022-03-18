import React from 'react'
import MainSide from '../../components/main-side/MainSide'
import Main from '../../components/main/Main'
import './home.css'
import NavBar from '../../components/navbar/NavBar'
import SideBar from '../../components/sidebar/SideBar'


function Home({username}) {
    return (
        <>
        <NavBar />
        <SideBar />
        <div className='home'>
            <Main />
            <MainSide username={username}/>
            
        </div>
        </>
    )
}

export default Home
