const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs').promises;

const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node-gpu');
const handler = tfn.io.fileSystem('saved_model_tfjs/model.json');

const filePath = './uploads/'
app.use(cors());

async function getFileFromPath(fileName) {
  try {
    let data = await fs.readFile(filePath + fileName);
    return data;
  } catch (error) {
    console.error(`Error occured when reading the file ${error.message}`)
  }
}

async function loadModel() {
  const model = await tf.loadLayersModel(handler);
  
  let imageFile = await getFileFromPath('test01.jpg')
  console.log(imageFile);
  //model.predict(tf.tensor4d([[[imageFile]]], [1, 128, 128, 3]))

}

loadModel()
