import React, { useState, } from 'react';
import userService from '../../services/user.service';
import Resizer from 'react-image-file-resizer';

export default function ImageUpload() {

  const [imageFile, setImageFile] = useState();
  const [imageShown, setImageShown] = useState();
  
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file",
        100,
        100
      );
    });

  const inputImage = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setImageShown(URL.createObjectURL(image));
      setImageFile(e.target.files[0]); 
    } catch (error) {
      console.log(error);
    }

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
