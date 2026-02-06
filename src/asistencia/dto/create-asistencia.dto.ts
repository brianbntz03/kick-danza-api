export class CreateAsistenciaDto {
    alumnoId: number;
    claseId: number;
    pago: boolean;
    tipoPago?: 'MENSUAL' | 'CLASE';
    observacion?: string;
}