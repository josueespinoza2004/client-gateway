import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_SERVICE } from 'src/config/service';

@Controller('files')
export class FilesController {
  constructor(@Inject(FILE_SERVICE) private readonly fileClient: ClientProxy) {}

  @Post('upload/:modelId')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Param('modelId', ParseIntPipe) modelId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileClient.send(
      { cmd: 'upload_file' },
      {
        buffer: Array.from(file.buffer),
        mime: file.mimetype,
        fileName: file.originalname,
        modelId,
      },
    );
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.fileClient.send({ cmd: 'get_file' }, id);
  }

  @Get('model/:modelId')
  getByModel(@Param('modelId', ParseIntPipe) modelId: number) {
    return this.fileClient.send({ cmd: 'get_file_by_model' }, modelId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fileClient.send({ cmd: 'delete_file' }, id);
  }
}
