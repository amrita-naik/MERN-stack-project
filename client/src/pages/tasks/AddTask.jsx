function AddTask( {setText, text, createTask}) {

    return (
        
        <div>
            <form className="add-form" onSubmit={createTask}>
                <div className='form-control'>
                    <input type='text' placeholder='Add Task' value={text}
                    onChange={(e) => setText(e.target.value)} />
                </div>
                
                <input type='submit' value='Save Task' className='btn btn-block'></input>
            </form>
            
        </div>
    )
}

export default AddTask
