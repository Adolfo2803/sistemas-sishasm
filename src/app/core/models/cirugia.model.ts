// core/models/cirugia.model.ts
// core/models/cirugia.model.ts
import { Paciente } from './paciente.model';
import {
    Cirujano,
    Anestesiologo,
    Instrumentista,
    Circulante,
    Residente,
    Interno,
    ApoyoExterno
} from './personal-medico.model';
import { Usuario } from './usuario.model';

export enum EstadoCirugia {
    PROGRAMADA = 'PROGRAMADA',
    EN_PROCESO = 'EN_PROCESO',
    COMPLETADA = 'COMPLETADA',
    CANCELADA = 'CANCELADA'
}

export interface Cirugia {
  numeroCirugia: string;
  numeroQuirofano: number;
  fechaCirugia: string;
  iniciaAnestesia: string;
  terminaAnestesia: string;
  material: string;
  medicamento: string;
  suturas: string;
  tipoCirugia:string;
  paciente: { id: number };
  cirujano: { id: number };
  anestesiologo: { id: number };
  instrumentista: { id: number };
  circulante: { id: number };
  residentes: { id: number }[];
  internos: { id: number }[];
  apoyoExterno: { id: number }[];
}

export interface CirugiaFiltros {
    fecha?: Date;
    numeroQuirofano?: number;
    estado?: EstadoCirugia;
    cirujanoId?: number;
    pacienteId?: number;
}
