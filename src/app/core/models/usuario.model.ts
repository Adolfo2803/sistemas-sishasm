// core/models/usuario.model.ts
export enum RolUsuario {
  ADMIN = 'ADMIN',
  USUARIO = 'USUARIO',
  INVITADO = 'INVITADO'
}

export interface Usuario {
  id?: number;
  username: string;
  rol: RolUsuario;
  createdAt?: Date;
  lastLogin?: Date;
}
