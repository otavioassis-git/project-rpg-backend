import { Injectable } from '@nestjs/common';
import * as packageInfo from '../package.json';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private db: Sequelize) {}

  getHello(): string {
    return `Project RPG running! <br>Version ${packageInfo.version}`;
  }

  getTest() {
    return this.db.query('SELECT * FROM Users');
  }
}
