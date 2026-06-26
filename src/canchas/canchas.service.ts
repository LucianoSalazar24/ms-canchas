import {
  Injectable, NotFoundException, ConflictException, BadRequestException, InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from './entities/cancha.entity';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto, UpdateEstadoCanchaDto } from './dto/update-cancha.dto';

@Injectable()
export class CanchasService {
  constructor(
    @InjectRepository(Cancha) private canchaRepo: Repository<Cancha>,
  ) {}

  async findAll() {
    return this.canchaRepo.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number) {
    const cancha = await this.canchaRepo.findOne({ where: { id } });
    if (!cancha) throw new NotFoundException(`Cancha ${id} no encontrada`);
    return cancha;
  }

  async create(dto: CreateCanchaDto) {
    try {
      const cancha = this.canchaRepo.create({
        nombre: dto.nombre,
        capacidad: dto.capacidad ?? 22,
        precioPorHora: dto.precioPorHora,
        descripcion: dto.descripcion,
      });
      return await this.canchaRepo.save(cancha);
    } catch (error) {
      if (error.code === '23505') throw new ConflictException('Ya existe una cancha con ese nombre');
      throw new InternalServerErrorException('Error al crear la cancha');
    }
  }

  async update(id: number, dto: UpdateCanchaDto) {
    const cancha = await this.findOne(id);
    try {
      if (dto.nombre !== undefined) cancha.nombre = dto.nombre;
      if (dto.capacidad !== undefined) cancha.capacidad = dto.capacidad;
      if (dto.precioPorHora !== undefined) cancha.precioPorHora = dto.precioPorHora;
      if (dto.descripcion !== undefined) cancha.descripcion = dto.descripcion;
      return await this.canchaRepo.save(cancha);
    } catch (error) {
      if (error.code === '23505') throw new ConflictException('Ya existe una cancha con ese nombre');
      throw new InternalServerErrorException('Error al actualizar la cancha');
    }
  }

  async updateEstado(id: number, dto: UpdateEstadoCanchaDto) {
    const cancha = await this.findOne(id);
    cancha.estado = dto.estado;
    return this.canchaRepo.save(cancha);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.canchaRepo.delete(id);
  }
}
