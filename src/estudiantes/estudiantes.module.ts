import { Module } from '@nestjs/common';
import { EstudiantesController } from './estudiantes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ESTUDIANTE_SERVICE } from 'src/config/service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ESTUDIANTE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.ESTUDIANTES_SERVICE_HOST,
          port: Number(process.env.ESTUDIANTES_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [EstudiantesController],
  providers: [],
})
export class EstudiantesModule {}
