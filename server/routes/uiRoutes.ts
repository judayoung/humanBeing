import express from 'express';

const router = express.Router();

// UI Routes
router
    .get('/test', (req, res) => {
        res.sendFile('test.html', { root: 'public/ui/pages' });
    })
    .get('/', (req, res) => {
        res.sendFile('index.html', { root: 'public' });
    });

export default router;
