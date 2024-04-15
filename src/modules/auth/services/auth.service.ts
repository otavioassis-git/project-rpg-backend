import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../../models/user.model';
import { Optional } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { LoginDto } from '../dtos/loginDto';
import { CreateUserDto } from '../dtos/createUserDto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signup(
    user: Optional<CreateUserDto, keyof CreateUserDto>,
  ): Promise<AuthResponse> {
    try {
      user.password = bcrypt.hashSync(
        user.password,
        parseInt(process.env.LOGIN_TOKEN),
      );
      const newUser = await this.userModel.create(user);
      return {
        username: newUser.username,
        token: await this.jwtService.signAsync(newUser.dataValues),
      };
    } catch (error) {
      if (error.name == 'SequelizeUniqueConstraintError') {
        throw new HttpException(
          `${Object.keys(error.fields)[0]} ${error.fields[Object.keys(error.fields)[0]]} already taken!`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: LoginDto): Promise<AuthResponse> {
    try {
      const fUser = await this.userModel.findOne({
        where: {
          username: user.username,
        },
      });

      if (
        !fUser ||
        !(await bcrypt.compareSync(user.password, fUser.password))
      ) {
        throw new UnauthorizedException();
      }

      return {
        username: fUser.username,
        token: await this.jwtService.signAsync(fUser.dataValues),
      };
    } catch (error) {
      if (error.status == 401) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
