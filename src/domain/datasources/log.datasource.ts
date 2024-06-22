import { LogEntity, LogSeverity } from '../entities/log.entity';

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(level: LogSeverity): Promise<LogEntity[]>;
}