import { Check, Delete } from '@material-ui/icons'
import './tasks.css'

const Task = ({task,  tasks,setTasks}) => {

    const onCheck = () => {
        setTasks(tasks.map((item) => {
            if(item.id===task.id){
                return{
                    ...item, completed : !item.completed,
                };
            }
            return item;
        }))
    }

return (
    <div className='task'>
        <p className='title'>{task.text}</p>
        <div className="task-icons">
            <Check className={`check-icon ${tasks.completed ? "checked-task" : ''}`} onClick = {onCheck}/>
            <Delete className='delete-icon' />
        </div>
    </div>
);
}

export default Task