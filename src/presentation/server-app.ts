import { envs } from '../config/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/send-logs';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infraestructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infraestructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infraestructure/repository/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());

const emailService = new EmailService();

export class ServerApp {
  static start() {
    console.log('Server started');

    // !Send logs
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'galvisdeveloper@gmail.com',
    //   'gersongm0011@gmail.com',
    // ]);

    // Send email
    // const emailService = new EmailService(logRepository);
    // emailService.sendEmail({
    //   to: [ 'galvisdeveloper@gmail.com', 'gersongm0011@gmail.com' ],
    //   subject: 'Hello Madafakas',
    //   htmlBody: '<h1>Cachooooonessssssss</h1>'
    // });
    // emailService.sendEmailWithFileSystemLogs([ 
    //   'galvisdeveloper@gmail.com', 
    //   'gersongm0011@gmail.com' 
    // ]);

    // !Check service
    // CronService.createJob('*/5 * * * * *', () => {

    //   const url = 'https://google.com';

    //   new CheckService(fileSystemLogRepository,
    //     () => console.log(`Success on check service: ${ url }`),
    //     (error) => console.error(error)
    //   ).execute(url);
    // });

    // !Check service multiple
    CronService.createJob('*/5 * * * * *', () => {

      const url = 'https://google.com';

      new CheckServiceMultiple([fileSystemLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`Success on check service: ${ url }`),
        (error) => console.error(error)
      ).execute(url);
    });

  }
}