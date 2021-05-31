import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CommonService {
  loggerContext = null;
  constructor(props: { context: string }) {
    this.loggerContext = props.context;
  }

  makeId(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  throwStringError(message: string) {
    throw new Error(message);
  }

  log(message: string) {
    const logger = new Logger(this.loggerContext);

    return logger.error(message);
  }
}