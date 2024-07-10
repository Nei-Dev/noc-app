import { EmailService } from '../../presentation/email/email.service';
import { LogEntity } from '../entities/log.entity';
import { SendEmailLogs } from './send-logs';

describe('Test send logs use case', () => {

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  } as unknown as EmailService;

  const sendLogs = new SendEmailLogs(
    mockEmailService,
    mockLogRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should call sendEmailWithFileSystemLogs and save log', async () => {

    const wasOk = await sendLogs.execute([ 'galvisdeveloper@gmail.com' ]);
    expect(wasOk).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  test('Should throw a error and save log', async () => {

    // This is a fucking shit of Javascript
    mockEmailService.sendEmailWithFileSystemLogs = jest.fn().mockRejectedValue(false);

    const wasOk = await sendLogs.execute([ 'abc@mail.com' ]);
    expect(wasOk).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });
});