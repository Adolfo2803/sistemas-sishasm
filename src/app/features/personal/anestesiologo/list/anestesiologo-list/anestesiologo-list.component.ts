import { Component, inject } from '@angular/core';
import { AnestesiologoService } from '../../../../../core/services/anestesiologo.service';
import { Anestesiologo } from '../../../../../core/models/personal-medico.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anestesiologo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './anestesiologo-list.component.html',
  styleUrl: './anestesiologo-list.component.css'
})
export default class AnestesiologoListComponent {
  private anestesiologoService = inject(AnestesiologoService);
  anestesiologos: Anestesiologo[] = [];

  ngOnInit(): void {
    this.loadAnestesiologo();
  }

  loadAnestesiologo(): void {
    this.anestesiologoService.getAll()
      .subscribe(data => this.anestesiologos = data);
  }

  onDelete(id: number): void {
    if (confirm('¿Está seguro de eliminar este Anestesiologo?')) {
      this.anestesiologoService.delete(id)
        .subscribe(() => {
          this.loadAnestesiologo();
        });
    }
  }
}
