import React, { useState } from 'react'

export default function ImageUpload() {

  const [file, setFile] = useState();
  function changeHandler(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(file)
  }
  return (
    <div className='ImageUpload'>
      <input type='file' onChange={changeHandler} />
      <img alt='Uploaded' src={file} />
    </div>
  )
}
