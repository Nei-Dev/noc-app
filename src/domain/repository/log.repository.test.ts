import { LogEntity, LogSeverity } from '../entities/log.entity';

describe('Test log.repository', () => {
  
  const newLog = new LogEntity({
    message: 'test',
    level: LogSeverity.LOW,
    origin: 'test',
  });

  class MockLogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverity): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('Should test the abstract class', async () => {
    const mockLogRepository = new MockLogRepository();
    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
    expect(mockLogRepository).toHaveProperty('saveLog');
    expect(mockLogRepository).toHaveProperty('getLogs');

    await mockLogRepository.saveLog(newLog);
    const logs = await mockLogRepository.getLogs(LogSeverity.LOW);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});