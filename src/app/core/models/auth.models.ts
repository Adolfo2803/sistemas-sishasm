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
  type: string;
  username: string;
  rol: string;
}

export interface Usuarios {
  id: number;
  username: string;

}

export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  role: string;
}
