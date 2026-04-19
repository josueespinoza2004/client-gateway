import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDocenteDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsNumber()
  @IsNotEmpty()
  readonly sexo_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly cargo_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly etnia_id: number;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;
}

export class UpdateDocenteDto extends CreateDocenteDto {}
