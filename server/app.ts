//Import express
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import requestIp from 'request-ip';
import { getDir } from './util/getDir.ts';
import router from './routes/v1Routes.ts';
import uiRouter from './routes/uiRoutes.ts';

const API_VERSION = '/v1';

dotenv.config({
    // path: `${path.join(`${__dirname}/..`)}/.env`,
    path: path.join(`${getDir()}/../.env`),
});

// Create the Express app
const app = express();

// Set the port used for server traffic.
const port = process.env.PORT || 3000;

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

// log
app.use((req, res, next) => {
    const ip = requestIp.getClientIp(req);
    console.log(`${ip} ${req.method} ${req.path}`);
    const isApi = req.path.startsWith(API_VERSION);
    if (Object.keys(req.params).length !== 0) {
        // 여기에서는 req.params가 없음. 라우팅 된 곳에 있음.
        console.log(
            `REQ PARAMS ${JSON.stringify(req.params)?.substring(0, 5000)}`,
        );
    }
    if (Object.keys(req.query).length !== 0) {
        console.log(
            `REQ QUERY ${JSON.stringify(req.query)?.substring(0, 5000)}`,
        );
    }
    if (isApi && Object.keys(req.body).length !== 0) {
        console.log(`REQ BODY ${JSON.stringify(req.body)?.substring(0, 5000)}`);
    }
    next();
});

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));
app.use('/', uiRouter);

// API Routes
app.use(API_VERSION, router);
