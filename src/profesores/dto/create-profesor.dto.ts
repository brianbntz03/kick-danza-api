import { IsString, MinLength } from "class-validator";

export class CreateProfesorDto {
    @IsString()
    @MinLength(2)
    nombre: string;

    @IsString()
    telefono: string;

    @IsString()
    especialidad: string;
}