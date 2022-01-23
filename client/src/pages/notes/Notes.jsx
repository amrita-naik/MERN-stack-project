import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import AddNote from './AddNote'
import './notes.css'

function Note() {
    const [showAddNote, setShowAddNote] = useState(false)
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

    return (
        <div className='notes'>
            <button className='note-btn' onClick={() => setShowAddNote(!showAddNote)}>Add Note+</button>
            {showAddNote && <AddNote createNote={createNote} title={title} setTitle={setTitle} text={text} setText={setText}/>}
            <div>
                <h2>Notes:</h2>
                {notes.map((note) => {
                    return(
                        <div>
                            <h3>{note.title}</h3>
                            <p>{note.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Note
