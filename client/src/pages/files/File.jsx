import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './file.css'

const File = () => {

    const [files, setFiles] = useState([])
    useEffect(() => {
        axios.get('/getFiles')
            .then(response => {
                setFiles(response.data.files)
            })
    }, [])


  return (
    <div className='file'>
        <form action="/upload" enctype="multipart/form-data" method="POST">
            <input type="file" className="admin__input" id="myFile" name="File"/>
            <input className="admin__submit" type="submit" />
        </form>
        <div className='files-display'>
            {files.map((file) => {
                return(
                    <div key={file._id} className='file'>
                        <a href={file.name} target="_blank" rel='noopener'><h3 className='note-title'>{file.name}</h3></a>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default File