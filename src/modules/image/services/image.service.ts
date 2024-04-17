import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/models/image.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
  ) {}

  async findAllImages() {
    return await this.imageModel.findAll({ attributes: ['id', 'value'] });
  }
}
