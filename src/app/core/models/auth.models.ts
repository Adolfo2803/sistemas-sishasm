// src/app/models/auth.models.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  rol: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface Usuarios {
  id: number;
  username: string;
  
}
