import './tasks.css'
import { useState, useEffect } from 'react'
import AddTask from './AddTask';
import axios from 'axios'
import { Check, Delete } from '@material-ui/icons'

function Tasks() {

    const [tasks, setTasks] = useState([
        {
            isCompleted: false,
        }
    ]);
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

    // const onCheck = () => {
    //     setTasks(tasks.map((item) => {
    //             return{
    //                 ...item, completed: !item.completed,
    //             };
    //         return item;
    //     }))
    // }

    const onCheck = index => {
        const newTasks = [...tasks];
        newTasks[index].isCompleted = true;
        setTasks(newTasks);
    };

    return (
        <div className='todo-container'>
            <div className="todo-wrapper">
                <h2>Add a Task</h2>
                <AddTask setText={setText} text={text} createTask={createTask}/>
            </div>
            
            <div className="todo-wrapper">
                <div className="tasksDisplay">
                    <h2>Tasks:</h2>
                    {tasks.map((task) => {
                    return (
                        <div className='task'>
                            <p className='title'>{task.text}</p>
                            <div className="task-icons">
                                <Check className={`check-icon ${tasks.isCompleted ? "checked-task" : ''}`} onClick = {onCheck}/>
                                <Delete className='delete-icon' />
                            </div>
                        </div>
                    );
                    })}
                </div>
            </div>   
        </div>
    )
}

export default Tasks
