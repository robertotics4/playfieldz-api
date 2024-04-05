import { IDatabaseConnection } from '@/domain';
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

export class SingletonConnection
  implements IDatabaseConnection<ConnectOptions, Mongoose>
{
  private static instance: SingletonConnection;

  private mongooseInstance: Mongoose;

  private constructor() {
    this.mongooseInstance = mongoose;
    this.connect(process.env.DATABASE_URL || '', {});
  }

  public static getInstance(): SingletonConnection {
    if (!SingletonConnection.instance) {
      SingletonConnection.instance = new SingletonConnection();
    }
    return SingletonConnection.instance;
  }

  public async connect(uri: string, options?: ConnectOptions): Promise<void> {
    try {
      await this.mongooseInstance.connect(uri, options);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  public disconnect(): void {
    this.mongooseInstance.disconnect();
    console.log('Disconnected from MongoDB');
  }

  public getConnection(): Mongoose {
    return this.mongooseInstance;
  }
}
