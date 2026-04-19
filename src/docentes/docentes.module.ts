import { Module } from '@nestjs/common';
import { DocentesController } from './docentes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DOCENTE_SERVICE } from 'src/config/service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: DOCENTE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.DOCENTES_SERVICE_HOST,
          port: Number(process.env.DOCENTES_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [DocentesController],
  providers: [],
})
export class DocentesModule {}
