import { Router } from 'express';
const router = Router();
import saveFileToPath from '../services/fileService.js';
import imagePrediction from '../imageDetection/imagePrediction.js';

router.post('/', async (req, res) => {

    let fileFormat = req.files.image.mimetype.split('/').pop();
    let acceptedFormats = ['png', 'jpg', 'jpeg']

    if(acceptedFormats.includes(fileFormat)) {
        saveFileToPath(req.files.image);
        let predictionResults = await imagePrediction(req.files.image.name);
        res.json(predictionResults);
    } else {
        res.send(400).send({
            message:"Invalid file format"
        });
    }
})

export default router