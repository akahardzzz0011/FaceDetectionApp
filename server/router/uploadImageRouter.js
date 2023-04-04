import { Router } from 'express';
const router = Router();
import saveFileToPath from '../services/fileService.js';
import loadModel from '../imageDetection/processImage.js';

router.post('/', (req, res) => {
    console.log(req.files);

    let fileFormat = req.files.image.mimetype.split('/').pop();
    let acceptedFormats = ['png', 'jpg', 'jpeg'] 

    if(acceptedFormats.includes(fileFormat)) {
        saveFileToPath(req.files.image);
        loadModel();
        res.sendStatus(200);
    } else {
        res.send(400).send({
            message:"Invalid file fromat"
        });
    }
})

export default router