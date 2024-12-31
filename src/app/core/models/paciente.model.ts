// core/models/paciente.model.ts
export enum TipoSexo {
  MASCULINO = 'M',
  FEMENINO = 'F'
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
  fechaElab?: string;  // Como string para enviar al backend
  status?: StatusPaciente | any;
  elaboro: {
      id: number;  // Solo necesitamos el ID del usuario
  };
}
