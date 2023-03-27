import React, { useState, useEffect } from 'react'
import UserService from '../../services/user.service';

export default function ImageUpload() {

  const [file, setFile] = useState();
  const [sendSwitch, setSendSwitch] = useState(false);

  function changeHandler(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    UserService.processImageRequest().then(results => {
      console.log(results);
    });
  }, [sendSwitch]);

  return (
    <div className='ImageUpload'>
      <input type='file' onChange={changeHandler} />
      <img alt='Uploaded' src={file} />
      <input type="submit" value="Process Image" onClick={() => setSendSwitch(!sendSwitch)} />
    </div>
  )
}
