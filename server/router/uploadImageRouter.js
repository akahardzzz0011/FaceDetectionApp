const express = require('express');
const router = express.Router();
const fileService = require('../services/fileService');

router.post('/', (req, res) => {
    console.log(req.files);

    let fileFormat = req.files.image.mimetype.split('/').pop();
    let acceptedFormats = ['png', 'jpg', 'jpeg'] 

    if(acceptedFormats.includes(fileFormat)) {
        fileService(req.files.image)
        res.sendStatus(200);
    } else {
        res.send(400).send({
            message:"Invalid file fromat"
        });
    }
})

module.exports = router