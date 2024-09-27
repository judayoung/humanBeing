import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

type Process = typeof process & {
    pkg: boolean;
};

// pkg로 exe 만들경우 사용.
export function getDir() {
    // if ((process as myProcess).pkg) {
    // if (process.pkg) {
    if ((process as Process).pkg) {
        return path.resolve(`${process.execPath}/..`);
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return path.join(__dirname, '../');
}
