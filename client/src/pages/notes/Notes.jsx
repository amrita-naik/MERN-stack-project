import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import AddNote from './AddNote'
import './notes.css'
import { Delete } from '@material-ui/icons'


function Note() {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        axios.get('/get-notes')
            .then(response => {
                setNotes(response.data)
            })
    }, [])

    const createNote = (e) => {
        e.preventDefault()
        axios.post('/create-note', {title, text})
            .then((response) => {
                setNotes([...notes, {title, text}])
            })
    }

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note._id !== id));
      };

    return (
        <div className='notes'>
            <div className="notes-wrapper">
                <AddNote createNote={createNote} title={title} setTitle={setTitle} text={text} setText={setText}/>
                <div className='notes-container'>
                    {notes.map((note) => {
                        return(
                            <div className='note'>
                                <h3 className='note-title'>{note.title}</h3>
                                <p className='note-info'>{note.text}</p>
                                <Delete className='delete-icon'  onClick={() => deleteNote(note._id)}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Note
