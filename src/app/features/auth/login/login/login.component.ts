import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/auth.models';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  successMessage: string = '';
  loginForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute  // Añadimos ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    // Verificar si viene de un registro exitoso
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = params['message'] || 'Registro exitoso. Por favor, inicia sesión.';
        // Limpiar los query params después de mostrar el mensaje
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true
        });
      }
    });
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.isLoading = true;
  //     this.error = '';

  //     this.authService.login(this.loginForm.value).subscribe({
  //       next: () => {
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (err) => {
  //         this.error = 'Error en la autenticación. Por favor, verifica tus credenciales.';
  //         this.isLoading = false;
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       }
  //     });
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

// login.component.ts
// onSubmit() {
//   if (this.loginForm.valid) {
//     const credentials: LoginRequest = {
//       username: this.loginForm.get('username')?.value,
//       password: this.loginForm.get('password')?.value
//     };

//     this.authService.login(credentials).subscribe({
//       next: (response) => {
//         console.log('Login exitoso:', response);
//         // Verificar token después del login
//         const token = localStorage.getItem('token');
//         console.log('Token después de login:', token);
//         this.router.navigate(['/dashboard']);
//       },
//       error: (error) => {
//         console.error('Error en login:', error);
//       }
//     });
//   }
// }


// login.component.ts
onSubmit() {
  if (this.loginForm.valid) {
    this.isLoading = true;
   
    const credentials: LoginRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    console.log('Enviando credenciales:', credentials);








    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        // Verificar token inmediatamente después del login
        const token = localStorage.getItem('token');
        console.log('Token después de login:', token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error en login:', error);
      }
    });
  }
}



}
