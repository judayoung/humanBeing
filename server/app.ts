//Import express
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { getDir } from './util/getDir.ts'; // TODO TODO 에러나고 있음

dotenv.config({
    // path: `${path.join(`${__dirname}/..`)}/.env`,
    path: path.join(`${getDir()}/../.env`),
});

// Create the Express app
const app = express();

// Set the port used for server traffic.
const port = process.env.PORT || 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static('public')); // 현재 보여주고 있는 정적 파일.

//Step 3 code goes here
//Initialize file system module
// Middleware to serve static files from 'songs' directory
// Middleware for parsing JSON files
// API endpoint to get songs folder
// File directory endpoint to get list of file names
// Read file names into a JSON object - throw error otherwise

//Run server at port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// API endpoint to get list of songs
app.get('/songs', (req, res) => {
    fs.readdir('songs', (err, files) => {
        if (err) {
            res.status(500).send('Error reading song files');
        } else {
            res.json({ files });
        }
    });
});
