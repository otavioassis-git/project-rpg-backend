import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/models/image.model';
import { User } from 'src/models/user.model';
import { UploadUserImageDto } from '../dtos/uploadUserImageDto';
import { Optional } from 'sequelize';
import { UserImages } from 'src/models/userImages.model';
import { LinkUserImageDto } from '../dtos/linkUserImageDto';

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
        attributes: ['value', 'id'],
      })
      .then((images) => {
        for (let image of images) {
          image.dataValues.value = image.dataValues.value.toString('base64');
          image.dataValues.name = image.dataValues.UserImages.imageName;
          delete image.dataValues['UserImages'];
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
    if (!image) image = await this.imageModel.create({ value: data.value });

    const user = await this.userModel.findOne({
      where: {
        username: req.user.username,
      },
    });

    await user.$add('images', image, { through: { imageName: data.name } });
    return image;
  }

  async linkUserImage(data: LinkUserImageDto, req) {
    const image = await this.imageModel.findOne({
      where: {
        id: data.id,
      },
    });

    const user = await this.userModel.findOne({
      where: {
        username: req.user.username,
      },
    });

    await user.$add('images', image, { through: { imageName: data.name } });
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
