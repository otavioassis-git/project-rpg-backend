import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/models/image.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
  ) {}

  async crateImage(data) {
    try {
      const image = await this.imageModel.create({
        name: data.name,
        value: data.value,
      });
      return image;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
