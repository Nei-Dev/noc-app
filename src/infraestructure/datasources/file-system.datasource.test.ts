import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverity } from '../../domain/entities/log.entity';
import { LogDatasource } from '../../domain/datasources/log.datasource';
describe('FileSystemDataSource', () => {

  const logPath = path.join(__dirname, '../../../logs');
  const logFiles = [ 'logs-high.log', 'logs-low.log', 'logs-medium.log' ];

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test('Should create log files if not exists', () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    expect(files).toHaveLength(3);
    expect(files).toEqual(logFiles);
  });

  test('Should save a log in the correct file', async () => {
    const [ logFileHigh, logFileLow, logFileMedium ] = logFiles;
    const dataSource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test message',
      level: LogSeverity.LOW,
      origin: 'Test',
    });

    await dataSource.saveLog(log);
    const logsLow = fs.readFileSync(path.join(logPath, logFileLow), 'utf-8');
    expect(logsLow).toBe(`${ JSON.stringify(log) }\n`);

    log.level = LogSeverity.MEDIUM;

    await dataSource.saveLog(log);
    const logsMedium = fs.readFileSync(path.join(logPath, logFileMedium), 'utf-8');
    expect(logsMedium).toBe(`${ JSON.stringify(log) }\n`);

    log.level = LogSeverity.HIGH;

    await dataSource.saveLog(log);
    const logsHigh = fs.readFileSync(path.join(logPath, logFileHigh), 'utf-8');
    expect(logsHigh).toBe(`${ JSON.stringify(log) }\n`);

  });

  test('Should get logs from the correct file', async () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      message: 'Test message',
      level: LogSeverity.LOW,
      origin: 'Test',
    });

    await logDatasource.saveLog(log);
    const logsLow = await logDatasource.getLogs(LogSeverity.LOW);
    expect(logsLow).toEqual([ log ]);

    log.level = LogSeverity.MEDIUM;

    await logDatasource.saveLog(log);
    const logsMedium = await logDatasource.getLogs(LogSeverity.MEDIUM);
    expect(logsMedium).toEqual([ log ]);

    log.level = LogSeverity.HIGH;

    await logDatasource.saveLog(log);
    const logsHigh = await logDatasource.getLogs(LogSeverity.HIGH);
    expect(logsHigh).toEqual([ log ]);

  });

  test('Should throw an error if the log level is invalid', async () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test message',
      level: 'invalid' as LogSeverity,
      origin: 'Test',
    });

    await expect(logDatasource.saveLog(log)).rejects.toThrow('Invalid log level');
  });
});