import chalk from 'chalk';

const SEPARATOR = '\n';

export default class LogService {

  static log = (...messages: string[]): void => {
    // tslint:disable-next-line:no-console
    console.log(`${LogService.formatMessages(messages)}`);
  };

  static debug = (...messages: string[]): void => {
    // tslint:disable-next-line:no-console
    console.log(`${chalk.gray.bold('debug')} ${LogService.formatMessages(messages)}`);
  };

  static success = (...messages: string[]): void => {
    // tslint:disable-next-line:no-console
    console.log(`${chalk.green.bold('success')} ${LogService.formatMessages(messages)}`);
  };

  static info = (...messages: string[]): void => {
    // tslint:disable-next-line:no-console
    console.log(`${chalk.cyan.bold('info')} ${LogService.formatMessages(messages)}`);
  };

  static warn = (...messages: string[]): void => {
    console.warn(`${chalk.yellow.bold('warn')} ${LogService.formatMessages(messages)}`);
  };

  static error = (...messages: string[]): void => {
    console.error(`${chalk.red.bold('error')} ${LogService.formatMessages(messages)}`);
  };

  private static formatMessages = (messages: string[]) => {
    return chalk.reset(messages.join(SEPARATOR));
  };
}
