import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ImageService } from './../services/image.service';
import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('comunity')
  findAll(@Req() request) {
    return this.imageService.findComunityImages(request);
  }
}
