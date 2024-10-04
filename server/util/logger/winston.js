import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import util from 'util';
import path from 'path';
import { getDir } from '../getDir.ts';

const { format } = winston;
const { combine, timestamp, metadata, printf, colorize, errors } = format;

const BASE_DIR_NAME = 'server'; // 로그 파일에 출력할 경로의 기준이 되는 디렉토리 이름.
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'; // 시간 출력 포맷

// 로그 사용시 생성되는 json은 winston에서 로그 파일의 맵을 만드는 데 사용한다. (ex. 날짜 갱신기능)

// 로그 파일 저장 경로.
const logDir = path.join(`${getDir()}/../logs`);

// 사용자 정의 로그 레벨 설정
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
        trace: 7, // trace 레벨 추가
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'orange',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'gray',
        trace: 'white', // trace 레벨 색상 추가
    },
};

/** ********
 * 먼저 파일에 저장하고, 후에 콘솔에 출력한다.
 * 그래서 logFormatFile은 metadata를 쓰고, logFormat은 metadata.metadata 를 쓴다.
 * ********* */
// 로그 출력 포맷 정의 함수
const humanReadableFileFormatter = ({
    level,
    message,
    timestamp,
    metadata,
    fileName,
    lineNumber,
}) => {
    // message는 그대로 출력하고,
    // metadata는 json 형태를 한줄씩 출력한다.
    if (metadata === undefined || Object.keys(metadata).length === 0) {
        return `[${timestamp}] | ${level} | ${fileName}:${lineNumber} | ${message} `;
    }
    return `[${timestamp}] | ${level} | ${fileName}:${lineNumber} | ${util.inspect(
        message,
    )} \n${JSON.stringify(metadata)}`;
};
const humanReadableFormatter = ({
    level,
    message,
    timestamp,
    metadata,
    fileName,
    lineNumber,
}) => {
    // message는 그대로 출력하고,
    // metadata는 json 형태를 한줄씩 출력한다.
    if (
        metadata === undefined ||
        metadata.metadata === undefined ||
        Object.keys(metadata.metadata).length === 0
    ) {
        return `[${timestamp}] | ${level} | ${fileName}:${lineNumber} | ${message}`;
    }
    return `[${timestamp}] | ${level} | ${fileName}:${lineNumber} | ${message}
    ${util.inspect(metadata.metadata, {
        showHidden: false,
        depth: null,
    })}`;
};

// tracer 모듈 참고.
const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;

const getFileNameAndLineNumber = function () {
    const oldStackTrace = Error.prepareStackTrace;
    // console.log('oldStackTrace', oldStackTrace);

    try {
        const error = new Error();
        const stacklist = error.stack.split('\n').slice(3);
        // console.log('stacklist', stacklist);

        const s = stacklist[0];
        // console.log('s', s);
        const sp = stackReg.exec(s) || stackReg2.exec(s);
        // console.log('sp', sp);

        let fileName = 'unknownFile';
        let lineNumber = 0;
        if (sp && sp.length === 5) {
            fileName = sp[2];
            lineNumber = sp[3];

            fileName = fileName.includes(BASE_DIR_NAME)
                ? fileName.substring(
                      fileName.indexOf(BASE_DIR_NAME) +
                          BASE_DIR_NAME.length +
                          1,
                  )
                : fileName;
        }

        return { fileName, lineNumber };
    } finally {
        Error.prepareStackTrace = oldStackTrace;
    }
};

export default function () {
    const { fileName, lineNumber } = getFileNameAndLineNumber();

    const newLogger = winston.createLogger({
        levels: customLevels.levels, // 사용자 정의 레벨 사용
        level: 'trace', // 최소 레벨
        format: combine(
            errors({ stack: true }),
            timestamp({
                format: TIME_FORMAT,
            }),
            metadata({
                fillExcept: ['message', 'level', 'timestamp', 'label'],
            }),

            printf((info) =>
                humanReadableFileFormatter({ ...info, fileName, lineNumber }),
            ),
            // colorize({ all: true }), // 파일에는 색상 적용 안함.
        ),
        // 실제 로그를 어떻게 기록을 한 것인가 정의
        transports: [
            // maxFiles: 30, // 하루당 30개 로그 파일 저장
            // maxSize: 10000000, // 10MB 파일 사이즈가 넘어가면 새로운 파일 생성
            // debug 레벨 로그를 저장할 파일 설정
            new WinstonDaily({
                level: 'debug',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: '%DATE%.debug.log',
                maxFiles: 30,
                maxSize: 10000000,
                zippedArchive: true,
            }),
            // info 레벨 로그를 저장할 파일 설정
            new WinstonDaily({
                level: 'info',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: '%DATE%.log',
                maxFiles: 30,
                maxSize: 10000000,
                zippedArchive: true,
            }),
            // error 레벨 로그를 저장할 파일 설정
            new WinstonDaily({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: '%DATE%.error.log',
                maxFiles: 30,
                maxSize: 10000000,
                zippedArchive: true,
            }),
            // trace 레벨 로그를 저장할 파일 설정
            new WinstonDaily({
                level: 'trace',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: '%DATE%.trace.log',
                maxFiles: 30,
                maxSize: 10000000,
                zippedArchive: true,
            }),
        ],
        // uncaughtException 발생시 파일 설정.
        exceptionHandlers: [
            // TODO TODO 예외 발생시 이메일알림 등 추가하기.
            new WinstonDaily({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: '%DATE%.exception.log',
                maxFiles: 30,
                maxSize: 10000000,
                zippedArchive: true,
            }),
        ],
        exitOnError: false,
    });

    // 개발환경에서는 콘솔로도 출력
    newLogger.add(
        new winston.transports.Console({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            format: combine(
                errors({ stack: true }),
                timestamp({
                    format: TIME_FORMAT,
                }),
                metadata({
                    fillExcept: ['message', 'level', 'timestamp', 'label'],
                }),
                printf((info) =>
                    humanReadableFormatter({ ...info, fileName, lineNumber }),
                ),
                colorize({ all: true }),
            ),
        }),
    );

    // 사용자 정의 레벨 색상 적용
    winston.addColors(customLevels.colors);

    return newLogger;
}
