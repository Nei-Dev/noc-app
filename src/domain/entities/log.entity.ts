export enum LogSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverity;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  level: LogSeverity;
  message: string;
  createdAt: Date;
  origin: string;

  constructor (options: LogEntityOptions) {
    const { message, level, createdAt = new Date(), origin } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJSON = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    return new LogEntity({message, level, createdAt: new Date(createdAt), origin});
  };

  static fromObject = (object: {[key: string]: any}): LogEntity => {
    const { message, level, createdAt = new Date(), origin } = object;
    return new LogEntity({message, level, createdAt, origin});
  }
}