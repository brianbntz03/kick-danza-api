import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagos } from './pagos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagos])],
  providers: [PagosService],
  controllers: [PagosController],
})
export class PagosModule {}
