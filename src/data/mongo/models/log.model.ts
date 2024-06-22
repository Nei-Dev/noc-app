import mongoose from 'mongoose';
import { LogSeverity } from '../../../domain/entities/log.entity';

const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  level: { type: String, enum: LogSeverity, default: LogSeverity.LOW},
  createdAt: { type: Date, default: new Date() },
  origin: { type: String }
});

export const LogModel = mongoose.model('Log', logSchema);