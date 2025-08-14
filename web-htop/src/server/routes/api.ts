import express from 'express';
import { getSystemStats } from '../services/systemInfo';

const router = express.Router();

router.get('/system-stats', async (req, res) => {
    try {
        console.log('API endpoint called');
        const stats = await getSystemStats();
        console.log('Stats retrieved:', stats);
        res.json(stats);
    } catch (error) {
        console.error('Error in API:', error);
        res.status(500).json({ error: 'Failed to fetch system stats' });
    }
});

export default router;