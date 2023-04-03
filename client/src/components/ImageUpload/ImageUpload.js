import React, { useState, } from 'react';
import userService from '../../services/user.service';

export default function ImageUpload() {

  const [imageFile, setImageFile] = useState();
  const [imageShown, setImageShown] = useState();
  const [imageName, setImagename] = useState();
  
  const inputImage = (e) => {
    setImageShown(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0]);
  }
  
  const inputName = (e) => {
    setImagename(e.target.value);
  }

  const processImageRequest = (e) => {
    e.preventDefault();
    let data = new FormData()
    data.append('name' , imageName)
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
        <input type='text' onChange={inputName} />
        <input type="submit" value="Process Image" />
      </form>
    </div>
  )
}
