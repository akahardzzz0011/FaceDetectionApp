import { Router } from 'express';
const router = Router();
import saveFileToPath from '../services/fileService.js';
import imagePrediction from '../imageDetection/imagePrediction.js';


router.post('/', async (req, res) => {
    try {
        const fileFormat = req.files.image.mimetype.split('/').pop();
        const acceptedFormats = ['png', 'jpg', 'jpeg']

        if(acceptedFormats.includes(fileFormat.toLowerCase())) {
            await saveFileToPath(req.files.image);
            const predictionResults = await imagePrediction(req.files.image.name);
            if (predictionResults === -1) {
                res.sendStatus(400)
            } else {
                res.json(predictionResults);
            }
        } else {
            res.status(400).send({
                message:"Invalid file format"
            });
        }
    } catch (error) {
        res.sendStatus(400)
    }

})

export default router