import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './models/user.model';
import { UserModule } from './modules/user/user.module';
import { Image } from './models/image.model';
import { UserImages } from './models/userImages.model';
import { ImageModule } from './modules/image/image.module';
import { UserImagesModule } from './modules/user-images/user-images.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Image, UserImages],
    }),
    AuthModule,
    UserModule,
    ImageModule,
    UserImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
