import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CirugiaService } from '../../../../core/services/cirugia.service';
import { CirugiaFiltros, EstadoCirugia } from '../../../../core/models/cirugia.model';
import { PersonalMedicoService } from '../../../../core/services/personal-medico.service';

@Component({
  selector: 'app-cirugia-list',
  standalone: true,
  imports: [RouterLink,CommonModule, RouterModule, FormsModule],
  templateUrl: './cirugia-list.component.html',
  styleUrl: './cirugia-list.component.css'
})
export default class CirugiaListComponent {
  cirugias: any[] = [];
  cirujanos: any[] = [];
  filtros = {
    fecha: '',
    numeroQuirofano: '',
    cirujanoId: ''
  };

  constructor(
    private cirugiaService: CirugiaService,
    private personalMedicoService: PersonalMedicoService
  ) {}

  ngOnInit() {
    this.cargarCirugias();
    this.cargarCirujanos();
  }

  cargarCirugias() {
    this.cirugiaService.getCirugias().subscribe({
      next: (data) => {
        console.log('Cirugías cargadas:', data);
        this.cirugias = data;
      },
      error: (error) => console.error('Error cargando cirugías:', error)
    });
  }

  cargarCirujanos() {
    this.personalMedicoService.getCirujanos().subscribe({
      next: (data: any[]) => {
        console.log('Cirujanos cargados:', data);
        this.cirujanos = data;
      },
      error: (error: any) => console.error('Error cargando cirujanos:', error)
    });
  }

  getPacienteNombre(paciente: any): string {
    if (!paciente) return 'N/A';
    return `${paciente.nombre} ${paciente.apPaterno} ${paciente.apMaterno}`;
  }

  getCirujanoNombre(cirujano: any): string {
    if (!cirujano) return 'N/A';
    return `${cirujano.nombre} - ${cirujano.especialidad}`;
  }

  aplicarFiltros() {
    let filtrosAplicados: any = {};

    if (this.filtros.fecha) {
      filtrosAplicados.fecha = this.filtros.fecha;
    }
    if (this.filtros.numeroQuirofano) {
      filtrosAplicados.numeroQuirofano = this.filtros.numeroQuirofano;
    }
    if (this.filtros.cirujanoId) {
      filtrosAplicados.cirujanoId = this.filtros.cirujanoId;
    }

    this.cirugiaService.getCirugias(filtrosAplicados).subscribe({
      next: (data) => {
        this.cirugias = data;
      },
      error: (error) => console.error('Error aplicando filtros:', error)
    });
  }

  eliminarCirugia(id: number) {
    if (confirm('¿Está seguro de eliminar esta cirugía?')) {
      this.cirugiaService.deleteCirugia(id).subscribe({
        next: () => this.cargarCirugias(),
        error: (error) => console.error('Error eliminando cirugía:', error)
      });
    }
  }
}
