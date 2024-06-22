import { LogRepository } from '../../domain/repository/log.repository';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverity } from '../../domain/entities/log.entity';

export class LogRepositoryImpl implements LogRepository {

  constructor (
    private readonly logDatasource: LogDatasource,
  ) { }

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log);
  }

  async getLogs(level: LogSeverity): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(level);
  }
}