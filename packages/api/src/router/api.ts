import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// This route is protected
router.get('/me', authenticateToken, (req, res) => {
  // The user object is attached to the request by the authenticateToken middleware
  res.json({ user: req.user });
});

export default router;
