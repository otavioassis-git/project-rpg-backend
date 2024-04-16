import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ImageService } from './../services/image.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  createImage(@Body() body) {
    return this.imageService.crateImage(body);
  }
}
