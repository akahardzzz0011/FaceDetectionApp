const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/', (req, res) => {
    console.log(req.files);
    if(req.body) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

module.exports = router