// core/models/personal-medico.model.ts

// Interface base para personal médico
export interface PersonalMedico {
  id?: number;
  nombre: string;
  especialidad: string;
  createdAt?: Date;
  numeroColegiado?:string;
}

export interface Cirujano extends PersonalMedico {}
export interface Anestesiologo extends PersonalMedico {}
export interface Instrumentista extends PersonalMedico {}
export interface Circulante extends PersonalMedico {} //ya
export interface Residente extends PersonalMedico {}
export interface Interno extends PersonalMedico {}
export interface ApoyoExterno extends PersonalMedico {}
