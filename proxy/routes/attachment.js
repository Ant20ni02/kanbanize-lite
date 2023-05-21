const express = require('express');
const router = express.Router();
const attachmentController = require('../controller/attachmentController');

router.post('/uploadAttachment/:host', attachmentController.uploadAttachment);
router.get('/downlodAttachment/:id', attachmentController.downloadAttachment);

module.exports = router;