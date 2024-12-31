import { Component, inject } from '@angular/core';
import { ExternoService } from '../../../../../core/services/externo.service';
import { ApoyoExterno } from '../../../../../core/models/personal-medico.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-externo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './externo-list.component.html',
  styleUrl: './externo-list.component.css'
})
export default class ExternoListComponent {
 private externoService = inject(ExternoService);
  externos: ApoyoExterno[] = [];

    ngOnInit(): void {
      this.loadExternos();
    }

    loadExternos(): void {
      this.externoService.getAll()
        .subscribe(data => this.externos = data);
    }

    onDelete(id: number): void {
      if (confirm('¿Está seguro de eliminar este Medico de Apoyo Externo?')) {
        this.externoService.delete(id)
          .subscribe(() => {
            this.loadExternos();
          });
      }
    }
}
