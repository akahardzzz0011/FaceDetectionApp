import { loadLayersModel } from '@tensorflow/tfjs';
import { promises as fs } from 'fs';
import { io } from '@tensorflow/tfjs-node-gpu';
const handler = io.fileSystem('saved_model_tfjs/model.json');

async function getFileFromPath(fileName) {
    try {
        //let data = await fs.readFile(filePath + fileName);
        let data = await fs.readFile(`uploads/${fileName}`)
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
  
export default loadModel