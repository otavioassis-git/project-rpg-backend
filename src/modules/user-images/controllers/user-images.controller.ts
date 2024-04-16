import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserImagesService } from './../services/user-images.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UploadUserImageDto } from '../dtos/uploadUserImageDto';

@Controller('user/images')
@UseGuards(AuthGuard)
export class UserImagesController {
  constructor(private userImagesService: UserImagesService) {}

  @Get()
  getUserImages(@Req() request) {
    return this.userImagesService.getUserImages(request);
  }

  @Post()
  uploadUserImage(@Body() body: UploadUserImageDto, @Req() request) {
    return this.userImagesService.uploadUserImage(body, request);
  }
}
