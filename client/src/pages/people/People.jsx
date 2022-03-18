import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './people.css'
import NavBar from '../../components/navbar/NavBar'
import SideBar from '../../components/sidebar/SideBar'


function People() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/get-users')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

return (
    <>
    <NavBar />
    <SideBar />
    <div className='people'>
        {users.map((user) => {
            return(
                <div >
                    <h3 >{user.username}</h3>
                </div>
            )
        })}
    </div>
    </>
)
    }

export default People
