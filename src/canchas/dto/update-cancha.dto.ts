import { IsString, IsNumber, IsOptional, MaxLength, Min, IsPositive, IsIn } from 'class-validator';

export class UpdateCanchaDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacidad?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precioPorHora?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateEstadoCanchaDto {
  @IsIn(['disponible', 'mantenimiento', 'fuera_servicio'])
  estado: string;
}
