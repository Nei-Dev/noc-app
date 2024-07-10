import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('Test check.service', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
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

    const wasOk = await checkService.execute('https://google.com');
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

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  }); 
});