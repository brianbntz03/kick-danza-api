import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NombreClaseService } from './nombre-clase.service';
import { CreateNombreClaseDto } from './dto/create-nombreclase.dto';
import { UpdateNombreClaseDto } from './dto/update-nombreclase.dto';

@Controller('nombre-clase')
export class NombreClaseController {
  constructor(private readonly nombreClaseService: NombreClaseService) {}

  @Get()
  findAll() {
    return this.nombreClaseService.findAll();
  }

  @Post()
  create(@Body() dto: CreateNombreClaseDto) {
    return this.nombreClaseService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNombreClaseDto) {
    return this.nombreClaseService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nombreClaseService.remove(+id);
  }
}
