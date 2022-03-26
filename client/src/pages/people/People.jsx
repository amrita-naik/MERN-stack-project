import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './people.css'

function People() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/get-users')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

return (
    <div className='people'>
        <div className='people-container' >
        <h1>Users:</h1>
        {users.map((user) => {
            return(
                    <div key={user._id} className='person'>
                        <h3 >{user.username}</h3>
                    </div>
            )
        })}
        </div>
    </div>
)
    }

export default People
