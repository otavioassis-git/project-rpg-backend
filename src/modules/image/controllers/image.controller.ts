import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ImageService } from './../services/image.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  createImage(@Body() body, @Req() request) {
    return this.imageService.crateImage(body, request);
  }
}
