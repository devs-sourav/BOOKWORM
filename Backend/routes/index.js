const express = require('express');
const router = express.Router();
const userRoute = require('./userRoutes')

router.use('/users',userRoute)

module.exports = router;