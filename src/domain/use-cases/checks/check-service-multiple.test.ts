import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { CheckServiceMultiple } from './check-service-multiple';

describe('Test check.service', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const arrMocks: LogRepository[] = [ mockRepository, mockRepository2, mockRepository3 ];

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    arrMocks,
    successCallback,
    errorCallback,
  );

  beforeEach(() => {
    mockRepository.saveLog.mockClear();
    mockRepository.getLogs.mockClear();
    successCallback.mockClear();
    errorCallback.mockClear();
  });

  test('Should call successCallback when return true', async  () => {

    const wasOk = await checkService.execute('http://google.com');
    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  test('Should call errorCallback when return false', async  () => {

    const wasOk = await checkService.execute('http://google.com/notfound');
    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    arrMocks.forEach(mockRepo => {
      expect(mockRepo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

  }); 
});