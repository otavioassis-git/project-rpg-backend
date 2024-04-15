import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
