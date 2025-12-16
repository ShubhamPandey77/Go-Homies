const express = require("express");
const multer = require("multer");
const {
    createPackage,
    getAllPackages,
    getPackageById,
    addReview,
    savePackage,
    unsavePackage,
    comparePackages
} = require("../controllers/package");
const { restrictToLoggedInUserOnly } = require("../middleware/auth");

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

router.post('/create', restrictToLoggedInUserOnly, upload.single('coverImage'), createPackage);
router.get('/fetch', getAllPackages);
router.get('/compare', comparePackages);
router.get('/:id', getPackageById);
router.post('/:id/review', restrictToLoggedInUserOnly, addReview);
router.post('/:id/save', restrictToLoggedInUserOnly, savePackage);
router.post('/:id/unsave', restrictToLoggedInUserOnly, unsavePackage);

module.exports = router;
