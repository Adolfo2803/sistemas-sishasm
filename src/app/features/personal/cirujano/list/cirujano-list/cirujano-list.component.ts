import { Component, inject } from '@angular/core';
import { Cirujano } from '../../../../../core/models/personal-medico.model';
import { CirujanoService } from '../../../../../core/services/cirujano.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cirujano-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cirujano-list.component.html',
  styleUrl: './cirujano-list.component.css'
})
export default class CirujanoListComponent {
   private cirujanoService = inject(CirujanoService);
    cirujanos: Cirujano[] = [];

    ngOnInit(): void {
      this.loadCirujanos();
    }

    loadCirujanos(): void {
      this.cirujanoService.getAll()
        .subscribe(data => this.cirujanos = data);
    }

    onDelete(id: number): void {
      if (confirm('¿Está seguro de eliminar este cirujano?')) {
        this.cirujanoService.delete(id)
          .subscribe(() => {
            this.loadCirujanos();
          });
      }
    }

}
