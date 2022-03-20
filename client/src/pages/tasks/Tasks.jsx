import './tasks.css'
import { useState, useEffect } from 'react'
import AddTask from './AddTask';
import axios from 'axios'
import Task from './Task'
import NavBar from '../../components/navbar/NavBar'
import SideBar from '../../components/sidebar/SideBar'


function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get("/get-tasks")
            .then((response) => {
                setTasks(response.data)
            })
            console.log(tasks)
    }, []);

    const createTask = (e) => {
        e.preventDefault()
        axios.post("/create-task", {text })
          .then((response) => {
            setTasks([...tasks, {text}])
            setText("")
          })
        
        if(!text){
            alert('Please add a task')
            return
        }  
    }

    return (
        <div className='todo-container'>
                <AddTask setText={setText} text={text} createTask={createTask}/>
            
                <div className="tasks-display">
                    <h2>Tasks:</h2>
                    {tasks.map((task) => (
                        <Task  task = {task} key={task._id}
                        tasks={tasks} setTasks={setTasks}/>
                    ))}
                </div> 
        </div>
    )
}

export default Tasks
