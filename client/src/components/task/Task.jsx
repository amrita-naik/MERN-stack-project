import { useEffect, useState } from 'react';
import './task.css'
import axios from 'axios';

function Task() {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios.get("/get-tasks")
            .then((response) => {
                setTasks(response.data)
            })
    }, []);

    return (
        <div className='todo-container-main'>
            <div className="todo1-main">
                <h2>Upcoming Tasks:</h2>
                    {tasks.map((task) => {
                    return (
                        <div>
                            <p>{task.text}</p>
                        </div>
                    );
                    })}
            </div>
            <div className="todo2-main">
                <h2>Finished Tasks:</h2>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    )
}

export default Task
