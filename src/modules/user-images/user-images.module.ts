import { Module } from '@nestjs/common';
import { UserImagesController } from './controllers/user-images.controller';
import { UserImagesService } from './services/user-images.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from 'src/models/image.model';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UserImagesController],
  providers: [UserImagesService],
})
export class UserImagesModule {}
