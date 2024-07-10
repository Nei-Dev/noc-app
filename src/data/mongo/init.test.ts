import mongoose from 'mongoose';
import { MongoDatabase } from './index';

describe('Test init.mongo', () => {

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('Should connect to MongoDB', async () => {
    const options = {
      url: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    };

    const connected = await MongoDatabase.connect(options);
    expect(connected).toBeTruthy();
  });

  test('Should throw error if not connect to MongoDB', async () => {
    const options = {
      url: 'mongodb://localhost:27017',
      dbName: 'NOC-TEST',
    };

    await expect(MongoDatabase.connect(options)).rejects.toThrow();

  });

});