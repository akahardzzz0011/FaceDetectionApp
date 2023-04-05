import { loadLayersModel, tensor4d, zeros } from '@tensorflow/tfjs';
import { promises as fs } from 'fs';
import { io } from '@tensorflow/tfjs-node-gpu';
const handler = io.fileSystem('saved_model_tfjs/model.json');
import processImage from './data.js';

async function getFileFromPath(fileName) {
    try {
        let data = await fs.readFile(`uploads/${fileName}`)
        return data;
    } catch (error) {
        console.error(`Error occured when reading the file ${error.message}`)
    }
}

async function loadModel(imageName) {
    const model = await loadLayersModel(handler);

    let imageFile = await getFileFromPath(imageName);
    console.log(imageFile);
    imageFile = await processImage(imageFile);
    //let pred = model.predict(tensor4d([[[imageFile]]], [1, 128, 128, 3]))
    let pred = model.predict(zeros([1, 128, 128, 3]));
    console.log(pred);

}

export default loadModel