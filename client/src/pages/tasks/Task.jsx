import { Check, Delete } from '@material-ui/icons'
import './tasks.css'

const Task = ({task,  tasks,setTasks}) => {

    //const id = task._id

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
         setTasks(tasks.filter(task => task._id !== id));
       };

return (
    <div className='task'>
        <p className={`title ${task.completed ? "checked-task" : ' '}`}>{task.text}</p>
        <div className="task-icons">
            <Check className='check-icon' onClick = {onCheck}/>
            <Delete className='delete-icon'  onClick={() => deleteTask(task._id)}/>
        </div>
    </div>
);
}

export default Task