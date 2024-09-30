import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/songs', (req, res) => {
    fs.readdir('songs', (err, files) => {
        if (err) {
            res.status(500).send('Error reading song files');
        } else {
            res.json({ files });
        }
    });
});

export default router;
