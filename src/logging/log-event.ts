import { LogLevel } from "./log-level";

export interface LogEvent {
  message: string;
  level: LogLevel;
  data?: Record<string, any>;
}
