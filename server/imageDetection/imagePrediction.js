import { promises } from 'fs';
import { io, loadLayersModel, node, argMax } from '@tensorflow/tfjs-node-gpu';
const handler = io.fileSystem('saved_model_tfjs/model.json');

const model = await loadLayersModel(handler);

async function getFileFromPath(fileName) {
    try {
        const imageData = await promises.readFile(`uploads/${fileName}`);
        return imageData;
    } catch (error) {
        console.error(`Error occured when reading the file in get file ${error.message}`)
    }
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