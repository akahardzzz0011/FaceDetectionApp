const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log(req);
    res.sendStatus(200);
});
router.post('/', (req, res) => {
    console.log(req.file);
    res.sendStatus(200);
});

module.exports = router;