import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './file.css'

const File = () => {

    const [files, setFiles] = useState([])
// const handleUpload = (e) => {
//     const dataForm = new FormData();
//     dataForm.append('file', e.target.files[0]);  
//         axios
//         .post('/upload', dataForm)
//         .then(res => {

//         })
//         .catch(err => console.log(err));      
// }  
useEffect(() => {
    axios.get('/getFiles')
        .then(response => {
            setFiles(response.data.files)
        })
}, [])

  return (
    <div className='file'>
        <form action="/upload" enctype="multipart/form-data" method="POST">
            <input type="file" className="admin__input" id="myFile" name="myFile" />
            <input className="admin__submit" type="submit" />
        </form>
        <div className='files-display'>
            {files.map((file) => {
                return(
                    <div key={file._id} className='file'>
                        <a href={file.name}><h3 className='note-title'>{file.name}</h3></a>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default File