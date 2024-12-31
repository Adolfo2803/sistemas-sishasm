import { Component, inject } from '@angular/core';
import { Circulante } from '../../../../../core/models/personal-medico.model';
import { CirculanteService } from '../../../../../core/services/circulante.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-circulante-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './circulante-list.component.html',
  styleUrl: './circulante-list.component.css'
})
export default class CirculanteListComponent {
  private circulanteService = inject(CirculanteService);
  circulantes: Circulante[] = [];

  ngOnInit(): void {
    this.loadCirculantes();
  }

  loadCirculantes(): void {
    this.circulanteService.getAll()
      .subscribe(data => this.circulantes = data);
  }

  onDelete(id: number): void {
    if (confirm('¿Está seguro de eliminar este circulante?')) {
      this.circulanteService.delete(id)
        .subscribe(() => {
          this.loadCirculantes();
        });
    }
  }

}
