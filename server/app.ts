//Import express
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import requestIp from 'request-ip';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import { getDir } from './util/getDir.ts';
import router from './routes/v1Routes.ts';
import uiRouter from './routes/uiRoutes.ts';
import logger from './util/logger/winston.js';

const API_VERSION = '/v1';

dotenv.config({
    // path: `${path.join(`${__dirname}/..`)}/.env`,
    path: path.join(`${getDir()}/../.env`),
});

// 라이브 서버 설정
const liveServer = livereload.createServer({
    // 변경시 다시 로드할 파일 확장자들 설정
    exts: ['html', 'css', 'ejs'],
    debug: true,
});

liveServer.watch(getDir());

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
    logger().info(`Server running at http://localhost:${port}`);
});

// 미들웨어 설정
app.use(livereloadMiddleware());

// API logging
app.use((req, res, next) => {
    const ip = requestIp.getClientIp(req);
    logger().info(`${ip} ${req.method} ${req.path}`);
    const isApi = req.path.startsWith(API_VERSION);
    if (Object.keys(req.params).length !== 0) {
        // 여기에서는 req.params가 없음. 라우팅 된 곳에 있음.
        logger().info(
            `REQ PARAMS ${JSON.stringify(req.params)?.substring(0, 5000)}`,
        );
    }
    if (Object.keys(req.query).length !== 0) {
        logger().info(
            `REQ QUERY ${JSON.stringify(req.query)?.substring(0, 5000)}`,
        );
    }
    if (isApi && req.body && Object.keys(req.body).length !== 0) {
        logger().info(
            `REQ BODY ${JSON.stringify(req.body)?.substring(0, 5000)}`,
        );
    }
    next();
});

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));
app.use('/', uiRouter);

// API Routes
app.use(API_VERSION, router);
