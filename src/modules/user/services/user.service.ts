import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdatePasswordDto } from '../dtos/updatePasswordDto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async updatePassword(data: UpdatePasswordDto, req) {
    try {
      const fUser = await this.userModel.findOne({
        where: {
          username: req.user.username,
        },
      });

      if (
        !fUser ||
        !(await bcrypt.compareSync(data.password, fUser.password))
      ) {
        throw new HttpException(
          'Wrong password provided!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      fUser.password = await bcrypt.hashSync(
        data.newPassword,
        parseInt(process.env.LOGIN_TOKEN),
      );

      return await fUser.save();
    } catch (error) {
      if (error.status == 401) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
