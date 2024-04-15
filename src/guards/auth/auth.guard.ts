import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.LOGIN_TOKEN,
      });
      request['user'] = payload;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
