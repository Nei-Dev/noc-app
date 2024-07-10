import mongoose from 'mongoose';
import { envs } from '../../config/envs.plugin';
import { MongoDatabase } from '../../data/mongo/init';
import { MongoLogDatasource } from './mongo-log.datasource';
import { LogEntity, LogSeverity } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo/index';

describe('Test on MongoLogDataSource', () => {

  const logDataSource = new MongoLogDatasource();
  const log = new LogEntity({
    message: 'Test message',
    level: LogSeverity.MEDIUM,
    origin: 'Test',
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      url: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('Should create a log', async () => {

    const logSpy = jest.spyOn(console, 'log');

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Log saved', expect.any(Object));

  });

  test('Should get logs', async () => {

    const logsEmpty = await logDataSource.getLogs(LogSeverity.MEDIUM);
    expect(logsEmpty).toHaveLength(0);

    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverity.MEDIUM);
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Test message');
    expect(logs[0].level).toBe(LogSeverity.MEDIUM);
    expect(logs[0].origin).toBe('Test');

  });
});