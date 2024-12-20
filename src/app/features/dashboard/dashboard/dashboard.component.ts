import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isLoggingOut = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async logout(): Promise<void> {
    this.isLoggingOut = true;

    // Simulamos un pequeño delay para una mejor experiencia de usuario
    await new Promise(resolve => setTimeout(resolve, 800));

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
