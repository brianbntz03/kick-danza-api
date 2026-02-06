import { PartialType } from "@nestjs/swagger";
import { createActividadDto } from "./create-actividad.dto";

export class UpdateActividadDto extends PartialType(createActividadDto) {}