import mongoose from 'mongoose';

interface ConnectionOptions {
  url: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { url, dbName } = options;

    try {
      await mongoose.connect(url, {
        dbName,
      })
      console.log('MongoDB connected');
    } catch (e) {
      console.error(e);
      throw e;
    }

  }
}