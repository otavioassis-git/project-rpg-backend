import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { Image } from 'src/models/image.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
