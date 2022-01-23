import './tasks.css'
import { useState, useEffect } from 'react'
import AddTask from './AddTask';
import axios from 'axios'

function Tasks() {

    const [showAddTask ,setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get("/get-tasks")
            .then((response) => {
                setTasks(response.data)
            })
    }, []);

    const createTask = (e) => {
        e.preventDefault()
        axios.post("/create-task", {text })
          .then((response) => {
            setTasks([...tasks, {text}])
          })
        
        if(!text){
            alert('Please add a task')
            return
        }  
    }

    return (
        <div className='todo'>
            <button className="todo-btn" onClick={() => setShowAddTask(!showAddTask)}>Add Task +</button>
            
            {showAddTask && <AddTask setText={setText} text={text} createTask={createTask}/>}
            <div className="usersDisplay">
                <h2>Tasks:</h2>
                {tasks.map((task) => {
                return (
                    <div>
                        <h3>{task.text}</h3>
                    </div>
                );
                })}
            </div>
        </div>
    )
}

export default Tasks
