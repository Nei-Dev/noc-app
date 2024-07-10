import { LogEntity, LogSeverity } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('Test log.datasource', () => {

  const newLog = new LogEntity({
    message: 'test',
    level: LogSeverity.LOW,
    origin: 'test',
  });

  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverity): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('Should test the abstract class', async () => {
    const mockLogDatasource = new MockLogDatasource();
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(mockLogDatasource).toHaveProperty('saveLog');
    expect(mockLogDatasource).toHaveProperty('getLogs');

    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverity.LOW);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});