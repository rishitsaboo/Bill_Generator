const express = require('express')

const router = express.Router();

const { registerAdmin, loginAdmin } = require('../controllers/authControllers');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.get('/login', (_req, res) => {
  res.status(405).json({ error: 'Method not allowed. Use POST /api/auth/login' });
});

router.get('/register', (_req, res) => {
  res.status(405).json({ error: 'Method not allowed. Use POST /api/auth/register' });
});

module.exports = router;