import { Signal } from "../common/signal";
import { LogEvent } from "./log-event";
import { LogLevel } from "./log-level";

export class LoggingModule {
  public logSignal = new Signal<LogEvent>();

  public emitLogLine(
    level: LogLevel,
    message: string,
    ...dataObjects: Array<Record<string, any>>
  ): void {
    const data =
      dataObjects.length === 0
        ? undefined
        : dataObjects.length === 1
        ? dataObjects[0]
        : { objects: dataObjects };
    this.logSignal.emit({ message, level, data });
  }

  public info(
    message: string,
    ...dataObjects: Array<Record<string, any>>
  ): void {
    this.emitLogLine(LogLevel.Info, message, ...dataObjects);
  }

  public warn(
    message: string,
    ...dataObjects: Array<Record<string, any>>
  ): void {
    this.emitLogLine(LogLevel.Warn, message, ...dataObjects);
  }

  public error(
    message: string,
    ...dataObjects: Array<Record<string, any>>
  ): void {
    this.emitLogLine(LogLevel.Error, message, ...dataObjects);
  }

  public debug(
    message: string,
    ...dataObjects: Array<Record<string, any>>
  ): void {
    this.emitLogLine(LogLevel.Debug, message, ...dataObjects);
  }

  public log(
    message: string,
    ...dataObjects: Array<Record<string, any>>
  ): void {
    this.emitLogLine(LogLevel.Log, message, ...dataObjects);
  }
}
