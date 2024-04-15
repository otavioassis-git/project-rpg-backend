import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/models/image.model';
import { User } from 'src/models/user.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async crateImage(data, req) {
    try {
      // const image = await this.imageModel.create({
      //   name: data.name,
      //   value: data.value,
      // });
      const user = await this.userModel.findOne({
        where: {
          id: req.user.id,
        },
      });
      await user.$create('image', {
        name: data.name,
        value: data.value,
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
