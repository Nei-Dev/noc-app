import { PrismaClient } from '@prisma/client';
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/mongo/init';
import { LogSeverity } from './domain/entities/log.entity';
import { MongoLogDatasource } from './infraestructure/datasources/mongo-log.datasource';
import { ServerApp } from './presentation/server-app';

const main = async () => {
  ServerApp.start();
};

(async () => {
  await MongoDatabase.connect({
    url: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  await main();

})();
