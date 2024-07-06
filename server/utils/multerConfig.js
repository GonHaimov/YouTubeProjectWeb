const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'videoFile') {
      cb(null, './uploads/videos');
    } else if (file.fieldname === 'thumbnail') {
      cb(null, './uploads/thumbnails');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 1000000000, // 1GB limit for individual files
    fieldSize: 1024 * 1024 * 50 // Increase field size limit to 50MB for fields
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

// Check file type
function checkFileType(file, cb) {
  // Allowed file types
  const filetypes = /mp4|avi|mkv|jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Invalid file type!');
  }
}

module.exports = upload;
