const express = require('express');
const router = express.Router();
const { submitScore, getAllScores } = require('../controllers/scoreController');
const requireAuth = require('../middleware/authMiddleware');

router.post('/', requireAuth, submitScore);
router.get('/', requireAuth, getAllScores);

module.exports = router;
