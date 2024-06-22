import { LogModel } from '../../data/mongo/index';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverity } from '../../domain/entities/log.entity';

export class MongoLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    const logModel = await LogModel.create(log);
    console.log('Log saved', logModel);
  }

  async getLogs(level: LogSeverity): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level });
    return logs.map(LogEntity.fromObject);
  }
}