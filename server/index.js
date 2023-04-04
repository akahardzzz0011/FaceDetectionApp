import express from 'express';
import cors from 'cors';
import { loadLayersModel } from '@tensorflow/tfjs';
import { promises as fs } from 'fs';
import { io } from '@tensorflow/tfjs-node-gpu';
const app = express();
import upload from 'express-fileupload';

const handler = io.fileSystem('saved_model_tfjs/model.json');
const port = 3003
const filePath = './uploads/'
import uploadRouter from './router/uploadImageRouter.js';

app.use(cors());
app.use('/static', express.static('uploads'));
app.use(upload());
app.use('/faceDetection', uploadRouter);

async function getFileFromPath(fileName) {
  try {
    let data = await fs.readFile(filePath + fileName);
    return data;
  } catch (error) {
    console.error(`Error occured when reading the file ${error.message}`)
  }
}

async function loadModel() {
  const model = await loadLayersModel(handler);
  
  let imageFile = await getFileFromPath('test01.jpg')
  console.log(imageFile);
  //model.predict(tf.tensor4d([[[imageFile]]], [1, 128, 128, 3]))

}

loadModel()

app.get('/', (req, res) => {
  res.send("Home of the DNN!")
});

app.listen(port || 3001, () => {
  console.log(`Listening on port ${port}`);
});