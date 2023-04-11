import { io, loadLayersModel, node, argMax } from '@tensorflow/tfjs-node-gpu';
const handler = io.fileSystem('saved_model_tfjs/model.json');
import sharp from 'sharp'
import { AGE_MAP, GENDER_MAP, ETHNICITY_MAP } from './imageClasses.js';

const model = await loadLayersModel(handler);

async function getFileFromPath(fileName) {
    const resizedImage = sharp(`uploads/${fileName}`)
    .resize(128, 128)
    .toBuffer();
    return resizedImage;
}

async function parsePredictionResults(pred) {
    let classificationArray = [];
    let responseArray = [];
    for(let i = 1; i < pred.length; i++) {
        let predictedValue = pred[i].arraySync();
        predictedValue = argMax(predictedValue[0]).arraySync();
        classificationArray.push(predictedValue);
    }
    responseArray.push(AGE_MAP[classificationArray[0]]);
    responseArray.push(GENDER_MAP[classificationArray[1]]);
    responseArray.push(ETHNICITY_MAP[classificationArray[2]]);

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