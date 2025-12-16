const express = require("express");
const multer = require("multer");
const {CreateNewPost,getAllPost, optInToPost,optOutFromPost,likePost,unlikePost,addCommentToPost} = require("../controllers/post")

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});
const router = express.Router();

router.post('/create', upload.single('image'), CreateNewPost)

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ msg: 'File size too large. Maximum 10MB allowed.' });
    }
    return res.status(400).json({ msg: 'File upload error', error: err.message });
  } else if (err) {
    return res.status(400).json({ msg: 'File upload error', error: err.message });
  }
  next();
});

router.get('/fetch',getAllPost)
router.get('/optin/:postId', optInToPost);
router.get('/optout/:postId', optOutFromPost);
router.post('/like/:postId', likePost);
router.post('/unlike/:postId', unlikePost);
router.post('/comment/:postId', addCommentToPost);

module.exports = router