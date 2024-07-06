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
  limits: { fileSize: 1000000000 }, // 1GB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /mp4|avi|mkv|jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Invalid file type!');
  }
}

module.exports = upload;