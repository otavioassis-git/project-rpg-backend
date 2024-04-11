import { Injectable } from '@nestjs/common';
import * as packageInfo from '../package.json';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return `Project RPG running! <br>Version ${packageInfo.version}`;
  }
}
