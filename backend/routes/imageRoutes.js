const express = require('express');
const { uploadImages } = require('../controllers/imageController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Route to upload images (multipart form-data)
router.post('/upload', upload.array('images', 10), uploadImages);  // Limit to 10 images

module.exports = router;
