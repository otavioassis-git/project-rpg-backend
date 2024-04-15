import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UpdatePasswordDto } from '../dtos/updatePasswordDto';
import { UserService } from './../services/user.service';
import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Put('/update-password')
  updatePassword(@Body() body: UpdatePasswordDto, @Req() req) {
    return this.userService.updatePassword(body, req);
  }
}
