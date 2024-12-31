import { Component, inject } from '@angular/core';
import { ResidenteService } from '../../../../../core/services/residente.service';
import { Residente } from '../../../../../core/models/personal-medico.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-residente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './residente-list.component.html',
  styleUrl: './residente-list.component.css'
})
export default class ResidenteListComponent {
  private residenteService = inject(ResidenteService);
  residentes: Residente[] = [];

    ngOnInit(): void {
      this.loadResidentes();
    }

    loadResidentes(): void {
      this.residenteService.getAll()
        .subscribe(data => this.residentes = data);
    }

    onDelete(id: number): void {
      if (confirm('¿Está seguro de eliminar este Residente?')) {
        this.residenteService.delete(id)
          .subscribe(() => {
            this.loadResidentes();
          });
      }
    }
}
