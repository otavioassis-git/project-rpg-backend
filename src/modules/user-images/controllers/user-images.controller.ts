import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserImagesService } from './../services/user-images.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UploadUserImageDto } from '../dtos/uploadUserImageDto';
import { LinkUserImageDto } from '../dtos/linkUserImageDto';

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

  @Post('/link')
  linkUserImage(@Body() body: LinkUserImageDto, @Req() request) {
    return this.userImagesService.linkUserImage(body, request);
  }

  @Delete(':id')
  deleteUserImage(@Param() params: any, @Req() request) {
    return this.userImagesService.deleteUserImage(params.id, request);
  }
}
