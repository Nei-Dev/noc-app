import { LogEntity, LogSeverity } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl';

describe('LogRepositoryImpl', () => {

  const spyLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepository = new LogRepositoryImpl(spyLogDatasource);

  test('saveLog should call logDatasource.saveLog', () => {
    const log = new LogEntity({
      message: 'Test message',
      level: LogSeverity.LOW,
      origin: 'Test origin',
    });

    logRepository.saveLog(log);

    expect(spyLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test('getLogs should call logDatasource.getLogs', () => {
    const level = LogSeverity.LOW;

    logRepository.getLogs(level);

    expect(spyLogDatasource.getLogs).toHaveBeenCalledWith(level);
  });
});