import { IsString, IsNumber, IsOptional, MaxLength, Min, IsPositive } from 'class-validator';

export class CreateCanchaDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacidad?: number;

  @IsNumber()
  @IsPositive()
  precioPorHora: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
