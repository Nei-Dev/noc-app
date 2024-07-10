import mongoose from 'mongoose';
import { LogModel } from '../index';
import { MongoDatabase } from '../init';

describe('Test log model', () => {

  beforeAll(async () => {
    await MongoDatabase.connect({
      url: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('Should return LogModel', async () => {
    const logData = {
      message: 'Test message',
      level: 'low',
      origin: 'log-model.te',
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(expect.objectContaining({
      ...logData,
      _id: expect.any(mongoose.Types.ObjectId),
      createdAt: expect.any(Date),
    }));

    await LogModel.deleteOne({ _id: log._id });

  });

  test('Should return the schema object', () => {
    const schema = LogModel.schema.obj;
    expect(schema).toEqual({
      message: { type: expect.any(Function), required: true },
      level: {
        type: expect.any(Function),
        enum: {
          LOW: 'low',
          MEDIUM: 'medium',
          HIGH: 'high',
          CRITICAL: 'critical'
        },
        default: 'low'
      },
      createdAt: expect.any(Object),
      origin: { type: expect.any(Function) }
    });
  });
});