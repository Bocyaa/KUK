import fs from 'fs';
import path from 'path';

/**
 * Logs data to a central log file with timestamp and file context.
 * @param fileName - The name of the file where the log originates.
 * @param message - The log message or data to log.
 */
export function logToFile(fileName: string, message: any) {
  const logFilePath = path.resolve(__dirname, '../../log.txt');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${fileName}] ${JSON.stringify(message)}\n`;

  fs.appendFileSync(logFilePath, logEntry, 'utf8');
}
