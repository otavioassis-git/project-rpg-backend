import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ImageService } from './../services/image.service';
import { Body, Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  findAll() {
    return this.imageService.findAllImages();
  }
}
