import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  isLoggingOut = false;
username: any="Ing. adolfo";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async logout(): Promise<void> {
    this.isLoggingOut = true;

    // Simulamos un pequeño delay para una mejor experiencia de usuario
    await new Promise(resolve => setTimeout(resolve, 400));

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
