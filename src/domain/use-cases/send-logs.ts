import { EmailService } from '../../presentation/email/email.service';
import { LogEntity, LogSeverity } from '../entities/log.entity';
import { LogRepository } from '../repository/log.repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]) {

    try{
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if(!sent) throw new Error('Error sending email');

      const log = new LogEntity({
        message: `Email send to: ${ to }`,
        level: LogSeverity.HIGH,
        origin: 'send-logs.ts'
      });
      await this.logRepository.saveLog(log);

      return true;
    } catch (e) {
      const log = new LogEntity({
        message: `${ e }`,
        level: LogSeverity.HIGH,
        origin: 'send-logs.ts'
      });
      await this.logRepository.saveLog(log);
      return false;
    }
  };
}