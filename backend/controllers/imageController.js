const asyncHandler = require('express-async-handler');
const path = require('path');

// Function to handle multiple image uploads
const uploadImages = asyncHandler(async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    res.status(400);
    throw new Error('No files uploaded');
  }

  // Return the URLs of uploaded images
  const uploadedImages = files.map((file) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    return {
      filename: file.filename,
      url: fileUrl,
      message: `${file.originalname} uploaded successfully`,
    };
  });

  res.status(200).json({
    message: 'Images uploaded successfully',
    images: uploadedImages,
  });
});

module.exports = { uploadImages };
