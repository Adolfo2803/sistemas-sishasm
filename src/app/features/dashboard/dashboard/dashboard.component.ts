import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuarios } from '../../../core/models/auth.models';
import { RolUsuario } from '../../../core/models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent implements OnInit {
  isLoggingOut = false;
usuario: string='';
currentUser:any= '';
currentUser1:Usuarios | null = null;
imageUrl = "../../assets/images/logo.jpg";
actual :string = '';
  constructor(
    public authService: AuthService,
    private router: Router
  ) {

  }




  ngOnInit(): void {
    this.authService.usuarioActual$.subscribe(usuario => {
      this.currentUser1 = usuario;
    });

    this.currentUser = this.authService.getCurrentUser()?.id

    // Verificar token al cargar el dashboard
  const token = localStorage.getItem('token');
  console.log('Token en dashboard:', token);
  if (!token) {

    this.router.navigate(['/login']);
  }





  }

  async logout(): Promise<void> {
    this.isLoggingOut = true;

    // Simulamos un pequeño delay para una mejor experiencia de usuario
    await new Promise(resolve => setTimeout(resolve, 400));

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
