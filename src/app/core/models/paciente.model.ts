// core/models/paciente.model.ts
import { Usuario } from './usuario.model';

export enum TipoSexo {
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO'
}

export enum StatusPaciente {
    ACTIVO = 'ACTIVO',
    INACTIVO = 'INACTIVO'
}

export interface Paciente {
    id?: number;
    expediente: string;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    sexo: TipoSexo;
    edad: number;
    curp: string;
    domicilio?: string;
    telefono?: string;
    ubicacion?: string;
    fechaElab: Date;
    status: StatusPaciente;
    elaboro: Usuario;
    createdAt?: Date;
    updatedAt?: Date;
}
