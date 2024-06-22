import { LogEntity, LogSeverity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor (
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) { }

  private callLogs(log: LogEntity) {
    this.logRepositories.forEach(logRepository => {
      logRepository.saveLog(log);
    })
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on check service: ${ url }`);

      const log = new LogEntity({
        message: `Service ${ url } is working`,
        level: LogSeverity.LOW,
        origin: 'check-service.ts',
      });

      this.callLogs(log);
      this.successCallback && this.successCallback();
      return true;

    } catch (error) {
      const log = new LogEntity({
        message: `Error on check service: ${ url }: ${ error }`,
        level: LogSeverity.HIGH,
        origin: 'check-service.ts',
      });

      this.callLogs(log);
      this.errorCallback && this.errorCallback(`${ error }`);
      return false;
    }
  }

}