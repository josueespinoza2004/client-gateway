import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEstudianteDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  paterno: string;

  @IsString()
  @IsOptional()
  materno: string;

  @IsNumber()
  @IsNotEmpty()
  readonly sexo_id: number;

  @IsString()
  @IsNotEmpty()
  direccion: string;

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

export class UpdateEstudianteDto extends CreateEstudianteDto {}
