import { Check, Delete } from '@material-ui/icons'
import axios from 'axios'
import './tasks.css'

const Task = ({task,  tasks,setTasks}) => {
    
    const onCheck = () => {
        setTasks(tasks.map(item => {
            if(item._id===task._id){
                return{
                    ...item, completed : !item.completed,
                };
            }
            return item;
        }))
    }

    const deleteTask = (id) => {
        axios.delete(`/delete-task/${id}`)
        .then(() => {
            setTasks(tasks.filter(task => task._id !== id));
        })
       };

return (
    <div className='task'>
        <p key={task._id} className={`title ${task.completed ? "checked-task" : ' '}`}>{task.text}</p>
        <div className="task-icons">
            <Check className='check-icon' onClick = {onCheck}/>
            <Delete className='delete-icon'  onClick={() => deleteTask(task._id)}/>
        </div>
    </div>
);
}

export default Task