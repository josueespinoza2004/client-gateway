import {
  Controller,
  Delete,
  Get,
  HttpException,
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
import { firstValueFrom } from 'rxjs';

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
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const result = await firstValueFrom(
      this.fileClient.send({ cmd: 'get_file' }, id),
    );

    if (result?.error) {
      throw new HttpException(
        result.message || 'Archivo no encontrado',
        result.statusCode || 404,
      );
    }

    return result;
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
