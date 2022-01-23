

const Task = ({task, tasks,setTasks}) => {

    // const onCheck = () => {
    //     setTasks(tasks.map((item) => {
    //         if(item.id===task.id){
    //             return{
    //                 ...item, completed : !item.completed,
    //             };
    //         }
    //         return item;
    //     }))
    // }


    // //Toggle reminder
    // const toggleReminder = () => {
    //     setTasks(tasks.map((item) =>{
    //         if(item.id===task.id){
    //             return {
    //                 ...task, reminder: !item.reminder,
    //             };
    //         }
    //         return item;
    //     }))
    // }

    // const rem = () => {
    //     if (task.reminder === true) {
    //         return <BiBell className={`bell ${task.completed ? "completed-bell" : ""}`} onClick={toggleReminder}/>
    //     }      
    //     else {
    //         return <BiBellOff className={`bell-off ${task.completed ? "completed-bell" : ""}`} onClick={toggleReminder}/>
    //     }
    // }

    return (
        <div className='task'>
            {/* <div className='icons'>
                {rem()}           
            </div>
            
            <div className='icons'>
                <BiCheck className={`check ${task.completed ? "completed" : ""}`}
                    onClick = {onCheck}
                />
            </div>
            
            <h2 className={`${task.completed ? "completed-text" : ""}`}>
                {task.text} 
            </h2>
            
            <div className='icons'>
                <BiTrash className='trash' style={{ cursor:'pointer'}}
                onClick={() => onDelete(task.id)} />
            </div>

            <p className={`${task.completed ? "completed-text" : ""}`}>{task.day}</p> */}
        </div>
    )
}

export default Task