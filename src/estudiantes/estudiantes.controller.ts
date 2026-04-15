import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ESTUDIANTE_SERVICE } from 'src/config/service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(
    @Inject(ESTUDIANTE_SERVICE) private readonly estudianteClient: ClientProxy,
  ) {}

  @Get()
  getAll() {
    return this.estudianteClient.send({ cmd: 'get_all_students' }, {});
  }

  @Post()
  create(@Body() estudianteDto: CreateEstudianteDto) {
    return this.estudianteClient.send({ cmd: 'create_student' }, estudianteDto);
  }
}
