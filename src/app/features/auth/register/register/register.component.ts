import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

enum UserRole {
  USUARIO = 'USUARIO',
  ADMIN = 'ADMIN',
  INVITADO = 'INVITADO'
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;
  isLoading: boolean = false;
  roles: string[] = Object.values(UserRole);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      rol: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = null;
      const successMessage = 'Usuario registrado exitosamente';

      const registerData = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        rol: this.registerForm.get('rol')?.value
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
        
          this.isLoading = false;
          this.error = 'Error en el registro. Por favor, intenta nuevamente.';
        },
        error: (err) => {

          this.router.navigate(['/login'], {
            queryParams: {
              registered: 'true',
              message: 'Usuario registrado exitosamente'
            }
          });
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
