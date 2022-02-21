import React from 'react';

function AddNote({createNote, text, setText, title, setTitle}) {
  
    return (
        <div>
            <form onSubmit={createNote}>
                <div className="note-form-control">
                    <textarea className='note-title-input'
                        type="text" 
                        placeholder='Add Title' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    <textarea  className='note-info-input'
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
