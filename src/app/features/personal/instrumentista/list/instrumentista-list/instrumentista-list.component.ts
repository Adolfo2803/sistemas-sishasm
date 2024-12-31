import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Instrumentista } from '../../../../../core/models/personal-medico.model';
import { InstrumentistaService } from '../../../../../core/services/instrumentista.service';

@Component({
  selector: 'app-instrumentista-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './instrumentista-list.component.html',
  styleUrl: './instrumentista-list.component.css'
})
export default class InstrumentistaListComponent {
   private instrumentistaService = inject(InstrumentistaService);
    instrumentistas: Instrumentista[] = [];

    ngOnInit(): void {
      this.loadInstrumentista();
    }

    loadInstrumentista(): void {
      this.instrumentistaService.getAll()
        .subscribe(data => this.instrumentistas = data);
    }

    onDelete(id: number): void {
      if (confirm('¿Está seguro de eliminar esta instrumentista?')) {
        this.instrumentistaService.delete(id)
          .subscribe(() => {
            this.loadInstrumentista();
          });
      }
    }

}
