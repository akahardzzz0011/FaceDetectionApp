import { promises } from 'fs';
import { io, loadLayersModel, node } from '@tensorflow/tfjs-node-gpu';
const handler = io.fileSystem('saved_model_tfjs/model.json');
import sharp from 'sharp'

async function getFileFromPath(fileName) {
    try {
        let imageData = await promises.readFile(`uploads/${fileName}`);
        return imageData;
    } catch (error) {
        console.error(`Error occured when reading the file ${error.message}`)
    }
}
/*
async function getMetaData(fileName) {
    try {
        const metaData = await sharp(`uploads/${fileName}`)
          .resize(128, 128)
         // .toFile(`uploads/${fileName}`);
        console.log(metaData);
       return metaData
    } catch (error) {
        console.error(`Error occured when reading the file ${error.message}`)
    }
}
*/
async function imagePrediction(imageName) {
    const model = await loadLayersModel(handler);
    
    let imageFile = await getFileFromPath(imageName);
    let tfImage = node.decodeImage(imageFile);
    let pred = model.predict(tfImage.reshape([1, 128, 128, 3]));
    return pred;
}

export default imagePrediction