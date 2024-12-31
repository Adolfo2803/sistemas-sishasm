import { Component, inject } from '@angular/core';
import { InternoService } from '../../../../../core/services/interno.service';
import { Interno } from '../../../../../core/models/personal-medico.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-interno-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './interno-list.component.html',
  styleUrl: './interno-list.component.css'
})
export default class InternoListComponent {
  private internoService = inject(InternoService);
  internos: Interno[] = [];

    ngOnInit(): void {
      this.loadInternos();
    }

    loadInternos(): void {
      this.internoService.getAll()
        .subscribe(data => this.internos = data);
    }

    onDelete(id: number): void {
      if (confirm('¿Está seguro de eliminar este Interno?')) {
        this.internoService.delete(id)
          .subscribe(() => {
            this.loadInternos();
          });
      }
    }


}
