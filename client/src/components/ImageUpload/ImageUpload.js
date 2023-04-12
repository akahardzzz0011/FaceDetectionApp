import React, { useState, } from 'react';
import userService from '../../services/user.service';
import Resizer from 'react-image-file-resizer';
import './ImageUpload.css';

export default function ImageUpload() {

  const [imageFile, setImageFile] = useState('');
  const [imageShown, setImageShown] = useState('');
  const [predictionResults, setPredictionResults] = useState([]);
  
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
      setPredictionResults(results.data);
      console.log(predictionResults);
    });
  }

  return (
    <div className='main'>
      <div className='main-container'>
        <div className='secondary-container'>
          <div className='image-container'>
            <img src={imageShown} />
          </div>
          <div>
            <form onSubmit={processImageRequest}>
              <div className='button'>
                <input type='file' accept='.jpg, .png, .jpeg' required onChange={inputImage} />
              </div>
              <input className='button' type='submit' value='Process Image' />
            </form>
          </div>
        </div>
        <div className='result-main-container'>
          <div className='result-container'>
            <span>Results</span>
          </div>
          <div className='result-container'>
            <span>Age:</span>
            <span className='results'>{predictionResults[0]}</span>
          </div>
          <div className='result-container'>
            <span>Gender:</span>
            <span className='results'>{predictionResults[1]}</span>
          </div>
          <div className='result-container'>
            <span>Ethnicity:</span>
            <span className='results'>{predictionResults[2]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
