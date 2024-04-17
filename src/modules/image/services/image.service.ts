import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/models/image.model';
import { User } from 'src/models/user.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
  ) {}

  async findComunityImages(req) {
    const images = await this.imageModel
      .findAll({
        attributes: ['id', 'value'],
        include: {
          model: User,
          attributes: ['username'],
          through: { attributes: [] },
        },
      })
      .then((images) => {
        let indexes: number[] = [];
        for (let [idx, image] of images.entries()) {
          const index = image.dataValues.users.findIndex(
            (user) => user.username == req.user.username,
          );
          if (index >= 0) {
            indexes.push(idx);
          }
          delete image.dataValues['users'];
        }

        for (let [idx, index] of indexes.entries()) {
          images.splice(index - idx, 1);
        }
        return images;
      });

    return images;
  }
}
