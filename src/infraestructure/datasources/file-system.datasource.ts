import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverity } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = 'logs/';
  private readonly lowLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor () {
    this.createLogFiles();
  }

  private createLogFiles = () => {

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [ this.lowLogsPath, this.mediumLogsPath, this.highLogsPath ].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
      }
    });

  };

  private getPathByLevel = (level: LogSeverity): string => {
    if (level === LogSeverity.LOW) return this.lowLogsPath;
    if (level === LogSeverity.MEDIUM) return this.mediumLogsPath;
    if (level === LogSeverity.HIGH) return this.highLogsPath;
    throw new Error('Invalid log level');
  };

  private getLogsFromFile = (path: string): string[] => {
    return fs.readFileSync(path, 'utf-8').split('\n');
  };

  async saveLog(log: LogEntity): Promise<void> {
    const path = this.getPathByLevel(log.level);
    fs.appendFileSync(path, `${ JSON.stringify(log) }\n`);
  }

  async getLogs(level: LogSeverity): Promise<LogEntity[]> {
    const path = this.getPathByLevel(level);
    const logs = this.getLogsFromFile(path);
    return logs.map(LogEntity.fromJSON);
  }
}