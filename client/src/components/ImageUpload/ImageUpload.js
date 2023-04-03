import React, { useState, } from 'react';
import userService from '../../services/user.service';

export default function ImageUpload() {

  const [imageFile, setImageFile] = useState();
  const [imageShown, setImageShown] = useState();
  
  const inputImage = (e) => {
    setImageFile(e.target.files[0]);
    setImageShown(URL.createObjectURL(e.target.files[0]));
  }

  const processImageRequest = (e) => {
    e.preventDefault();
    let data = new FormData()
    data.append('image', imageFile)

    userService.processImageRequest(data).then(results => {
      console.log(results);
    });
  }

  return (
    <div className='ImageUpload'>
        <img alt='Uploaded' src={imageShown} />
      <form onSubmit={processImageRequest}>
        <input type='file' required onChange={inputImage} />
        <input type="submit" value="Process Image" />
      </form>
    </div>
  )
}
