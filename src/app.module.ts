import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosModule } from './alumnos/alumnos.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { ActividadesModule } from './actividades/actividades.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { NombreClaseModule } from './nombre-clase/nombre-clase.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'fast',
      password: 'fast123',
      database: 'mydb',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AlumnosModule,
    ActividadesModule,
    ProfesoresModule,
    NombreClaseModule,
    AsistenciaModule,
    PagosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
