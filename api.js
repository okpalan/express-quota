var express = require('express');
var router = express.Router();


router.post('/users', function (req, res) {
    res.json({
        message: 'Hello ' + req.body.name
    });
})

module.exports = router;