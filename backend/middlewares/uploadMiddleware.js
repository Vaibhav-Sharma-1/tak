const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const timestamp = date.toISOString().replace(/[-T:\.Z]/g, '');  // Format: YYYYMMDDHHMMSS
    const ext = path.extname(file.originalname);  // Get the file extension
    const filename = `${timestamp}${ext}`;  // Combine timestamp and original file name

    cb(null, filename);  // Save the file with the new name
  },
});

// File type validation (Allow JPEG, PNG)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Only accept images
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },  // Limit file size to 1MB
  fileFilter: fileFilter,
});

module.exports = upload;
