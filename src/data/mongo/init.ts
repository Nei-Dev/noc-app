import mongoose from 'mongoose';

interface ConnectionOptions {
  url: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions): Promise<boolean> {
    const { url, dbName } = options;

    try {
      await mongoose.connect(url, {
        dbName,
      });

      return true;
    } catch (e) {
      throw e;
    }

  }
}