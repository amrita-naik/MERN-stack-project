function AddTask( {setText, text, createTask}) {

    return (
        
        <div>
            <form className="form-control" onSubmit={createTask}>
                <div className='add-task'>
                    <textarea placeholder='Add a Task' required className="input-title" value={text}
                    onChange={(e) => setText(e.target.value)} />
                    <button className="custom-btn save-btn">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddTask
