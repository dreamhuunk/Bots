//Contains all the route files

const express = require('express');

const router = express.Router();

const FB = require('../controller/fb.controller');


router.get("/webhook",FB.verifyHook);
router.post("/webhook",FB.processWebhook);

module.exports = router;
