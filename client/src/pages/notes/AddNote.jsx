import React from 'react';

function AddNote({createNote, text, setText, title, setTitle}) {
  
    return (
        <div>
            <form onSubmit={createNote}>
                <div className="form-control">
                    <input 
                        type="text" 
                        placeholder='Add Title' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    <input 
                        type="text" 
                        placeholder='Add Text' 
                        value={text}
                        onChange={(e) => setText(e.target.value)}/>
                </div>
                <input type="submit" value='Save Note'/>
            </form>
        </div>
    )
}

export default AddNote;
