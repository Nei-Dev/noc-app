import { CronService } from './cron-service';

describe('Cron Service', () => {

  const mockTick = jest.fn();

  test('Should create a job', (done) => {
    const job = CronService.createJob('* * * * * *', mockTick);
    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });

  test('Should call cron job with correct values', () => {
    const job = CronService.createJob('* * * * * *', mockTick);
    expect(job.cronTime.source).toBe('* * * * * *');
    job.stop();
  });
});