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
        {users.map((user) => {
            return(
                <div >
                    <h3 >{user.username}</h3>
                </div>
            )
        })}
    </div>
)
    }

export default People
