const express = require('express');
const cors = require('cors');
const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node-gpu');
const handler = tfn.io.fileSystem('saved_model_tfjs/model.json')
const app = express();
app.use(cors());


async function loadModel() {
  const model = await tf.loadLayersModel(handler);
  
 // let pred = model.predict(tf.tensor2d([[5, 3, 4, 6]], [1, 4]))
  
}

loadModel()
