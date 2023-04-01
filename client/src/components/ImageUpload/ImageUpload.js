import React, { useState, } from 'react';
import userService from '../../services/user.service';

export default function ImageUpload() {

  const [imageFile, setImageFile] = useState();
  
  const inputImage = (e) => {
    setImageFile(e.target.files[0]);
  }

  const processImageRequest = (e) => {
    e.preventDefault();
    let data = new FormData()
    data.append('image', imageFile)

    userService.processImageRequest(imageFile).then(results => {
      console.log(results);
    });
  }

  return (
    <div className='ImageUpload'>
      <form onSubmit={processImageRequest}>
        <input type='file' required onChange={inputImage} />
        <img alt='Uploaded' src={imageFile} />
        <input type="submit" value="Process Image" />
      </form>
    </div>
  )
}
