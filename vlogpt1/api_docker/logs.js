import { appendFile } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

const captureAndLogRequests = (request, response, proceed) => {
    const originalWrite = response.write;
    const originalEnd = response.end;

    let bodyChunks = [];
    
    response.write = (chunk, ...writeArgs) => {
        bodyChunks.push(chunk);
        return originalWrite.apply(response, [chunk, ...writeArgs]);
    };

    response.end = (chunk, ...endArgs) => {
        if (chunk) {
            bodyChunks.push(chunk);
        }
        const combinedBody = Buffer.concat(bodyChunks).toString('utf8');
        writeToLog(request, combinedBody);
        originalEnd.apply(response, [chunk, ...endArgs]);
    };

    proceed();
};


const writeToLog = (request, responseBody) => {
    const currentTime = new Date();
    const logMessage = `
        Timestamp: ${currentTime.toISOString()}
        URL: ${request.originalUrl}
        HTTP Method: ${request.method}
        Request Body: ${JSON.stringify(request.body)}
        Response Body: ${responseBody}
        ------------------------------
    `;

    appendFile(join(currentDir, 'access-log.txt'), logMessage, error => {
        if (error) {
            console.error('Failed to write to log file:', error);
        }
    });
};

export { captureAndLogRequests };
