import { LevelSeverity, PrismaClient } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogSeverity, LogEntity } from '../../domain/entities/log.entity';

const prismaClient = new PrismaClient();

const severityEnum = {
  low: LevelSeverity.LOW,
  medium: LevelSeverity.MEDIUM,
  high: LevelSeverity.HIGH,
  critical: LevelSeverity.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {

  async getLogs(logLevel: LogSeverity): Promise<LogEntity[]> {
    const level = severityEnum[ logLevel ];
    const dbLogs = await prismaClient.logModel.findMany({
      where: {
        level,
      }
    });
    return dbLogs.map(LogEntity.fromObject);
  }

  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[ log.level ];
    await prismaClient.logModel.create({
      data: {
        message: log.message,
        level,
        origin: log.origin,
        createdAt: log.createdAt,
      }
    });
  }
}