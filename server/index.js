const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs').promises;

const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node-gpu');
const handler = tfn.io.fileSystem('saved_model_tfjs/model.json');

const filePath = './uploads/'
const testImage = 3
app.use(cors());

async function getFileFromPath(fileName) {
  try {
    const data = await fs.readFile(filePath + fileName);
    console.log(data);
  } catch (error) {
    console.error(`Error occured when reading the file ${error.message}`)
  }
}

async function loadModel() {
  const model = await tf.loadLayersModel(handler);
  //model.predict(tf.tensor4d([1], [1, 128, 128, 3])).print();
  //model.predict(tf.tensor1d([testImage], [128, 128, 3])).print();
}

loadModel()
getFileFromPath('test01.jpg')
