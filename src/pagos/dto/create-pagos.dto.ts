export class CreatePagoDto {
  alumnoId: number;
  tipo: 'MENSUAL' | 'CLASE';
  monto: number;

  mes?: number;
  año?: number;
  actividadId?: number;

  claseId?: number;
}
