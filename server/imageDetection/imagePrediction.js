import { promises } from 'fs';
import { io, loadLayersModel, node, tensor1d } from '@tensorflow/tfjs-node-gpu';
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
async function imagePrediction(imageName) {
    const imageFile = await getFileFromPath(imageName);
    try {
        const tfImage = await node.decodeImage(imageFile);
        const pred = model.predict(tfImage.reshape([1, 128, 128, 3]));
        for(let i = 0; i < pred.length; i++) {
            const predictedValue = pred[i].arraySync();
            console.log(predictedValue);

        }
        /*
        let x = tensor1d([1,2,3,4,5])
        let a = x.argMax().print();
        console.log(a);
        */
       return pred;
    } catch(err) {
        console.log(err);
        return -1;
    }
}

export default imagePrediction;