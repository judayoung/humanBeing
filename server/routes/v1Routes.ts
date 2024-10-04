import express from 'express';
import fs from 'fs';

const router = express.Router();

router
    .get('/songs', (req, res) => {
        fs.readdir('songs', (err, files) => {
            if (err) {
                res.status(500).send('Error reading song files');
            } else {
                res.json({ files });
            }
        });
    })
    .get('/users', (req, res) => {
        // db/user 에 있는 json 파일 이름들을 가져와 array로 전달한다.
        fs.readdir('db/user', (err, users) => {
            if (err) {
                res.status(500).send('Error reading user files');
            } else {
                res.json(users.map((user) => user.replace('.json', '')));
            }
        });
    })
    .get('/users/:user', (req, res) => {
        const { user } = req.params;
        fs.readFile(`db/user/${user}.json`, (err, data) => {
            if (err) {
                res.status(500).send('Error reading user file');
            } else {
                res.json(JSON.parse(data.toString()));
            }
        });
    });

export default router;
