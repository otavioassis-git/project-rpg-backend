import { CreateUserDto } from '../dtos/createUserDto';
import { LoginDto } from '../dtos/loginDto';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }
}
