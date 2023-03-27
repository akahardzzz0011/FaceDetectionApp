import axios from 'axios';
import React, { useState, useEffect } from 'react'
import userService from '../../services/user.service';
const API_URL = process.env.REACT_APP_SERVER_HOST_ADDRESS;
export default function ImageUpload() {

  const [file, setFile] = useState();
  const [sendSwitch, setSendSwitch] = useState(false);
  let imageData = new FormData();
  

  function changeHandler(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    console.log("FILE HERE", file);
    userService.processImageRequest(file).then(results => {
      console.log(results);
    });
  }, [sendSwitch]);
/*
  useEffect(() => {
    const postRequest = async () => {
      const results = await axios.post(API_URL + "faceDetection", file)
        console.log(results);
        console.log(API_URL);
       }
    postRequest()
  }, [sendSwitch]);
*/
  return (
    <div className='ImageUpload'>
      <input type='file' onChange={changeHandler} />
      <img alt='Uploaded' src={file} />
      <input type="submit" value="Process Image" onClick={() => setSendSwitch(!sendSwitch)} />
    </div>
  )
}
