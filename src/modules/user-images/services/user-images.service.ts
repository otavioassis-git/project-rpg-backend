import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/models/image.model';
import { User } from 'src/models/user.model';
import { UploadUserImageDto } from '../dtos/uploadUserImageDto';
import { Optional } from 'sequelize';

@Injectable()
export class UserImagesService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Image) private imageModel: typeof Image,
  ) {}

  async getUserImages(req): Promise<Image[]> {
    const user = await this.userModel.findOne({
      where: {
        username: req.user.username,
      },
    });

    const images = await user
      .$get('images', {
        attributes: ['name', 'value', 'id'],
      })
      .then((images: any) => {
        for (let image of images) {
          image.value = image.value.toString('base64');
        }
        return images;
      });

    return images;
  }

  async uploadUserImage(
    data: Optional<UploadUserImageDto, keyof UploadUserImageDto>,
    req,
  ): Promise<Image> {
    let image: Image;

    image = await this.imageModel.findOne({
      where: {
        value: data.value,
      },
    });
    if (!image) image = await this.imageModel.create(data);

    const user = await this.userModel.findOne({
      where: {
        username: req.user.username,
      },
    });

    await user.$add('images', image);
    return image;
  }

  async deleteUserImage(id: number, req) {
    const image = await this.imageModel.findOne({
      where: {
        id,
      },
    });

    const user = await this.userModel.findOne({
      where: {
        username: req.user.username,
      },
    });

    if ((await image.$count('users')) == 1) {
      await user.$remove('images', image);
      await image.destroy();
    } else await user.$remove('images', image);
  }
}
