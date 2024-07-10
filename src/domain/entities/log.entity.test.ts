import { LogEntity, LogSeverity } from './log.entity';

describe('Test log.entity', () => {
  const date = new Date();
  const logWithDate = new LogEntity({
    message: 'test',
    level: LogSeverity.LOW,
    origin: 'test',
    createdAt: date,
  });

  test('Should test the entity from object', () => {

    const logWithDateObject = LogEntity.fromObject({
      message: 'test',
      level: LogSeverity.LOW,
      origin: 'test',
      createdAt: date,
    });

    expect(logWithDateObject).toBeInstanceOf(LogEntity);
    expect(logWithDateObject.message).toBe('test');
    expect(logWithDateObject.level).toBe(LogSeverity.LOW);
    expect(logWithDateObject.origin).toBe('test');
    expect(logWithDateObject.createdAt).toBeInstanceOf(Date);
    expect(logWithDateObject.createdAt).toEqual(date);

  });

  test('Should test the entity from JSON', () => {
    const logWithDateJSON = JSON.stringify(logWithDate);
    const parsedLogWithDate = LogEntity.fromJSON(logWithDateJSON);
    expect(parsedLogWithDate).toBeInstanceOf(LogEntity);
    expect(parsedLogWithDate.message).toBe(logWithDate.message);
    expect(parsedLogWithDate.level).toBe(LogSeverity.LOW);
    expect(parsedLogWithDate.level).toBe(logWithDate.level);
    expect(parsedLogWithDate.createdAt).toBeInstanceOf(Date);
    expect(parsedLogWithDate.createdAt).toEqual(date);
  });
});