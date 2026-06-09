import { Module } from '@nestjs/common';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { DocentesModule } from './docentes/docentes.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [EstudiantesModule, DocentesModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
