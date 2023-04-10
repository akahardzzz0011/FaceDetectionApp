import { promises } from 'fs';
import { io, loadLayersModel, node, argMax } from '@tensorflow/tfjs-node-gpu';
const handler = io.fileSystem('saved_model_tfjs/model.json');
import sharp from 'sharp'

const model = await loadLayersModel(handler);

async function getFileFromPath(fileName) {
    const resizedImage = sharp(`uploads/${fileName}`)
    .resize(128, 128)
    .toBuffer();
    return resizedImage;
}

async function parsePredictionResults(pred) {
    let responseArray = [];
    
    for(let i = 0; i < pred.length; i++) {
        let predictedValue = pred[i].arraySync();
        predictedValue = argMax(predictedValue[0]).arraySync();
        responseArray.push(predictedValue);
    }

    for(let i = 0; i < responseArray.length; i++) {
        console.log(responseArray[i]);
    }
   return responseArray;
}

async function imagePrediction(imageName) {
    const imageFile = await getFileFromPath(imageName);
    try {
        const tfImage = node.decodeImage(imageFile);
        const pred = model.predict(tfImage.reshape([1, 128, 128, 3]));
        return parsePredictionResults(pred);
    } catch(err) {
        console.log(err);
        return -1;
    }
}

export default imagePrediction;