import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../../core/models/paciente.model';
import { PacienteService } from '../../../../core/services/paciente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, ],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.css'
})
export default class PacienteListComponent implements OnInit {
  pacientes: any[] = [];
  pacienteSeleccionado: Paciente | null = null;
  pacientesFiltrados: any[] = [];
  filtros = {
    expediente: '',
    curp: '',
    nombre:''
  };

   // Pagination properties
   currentPage = 1;
   pageSize = 5;
   totalItems = 0;

  constructor(
    private pacienteService: PacienteService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data.filter(paciente => paciente.status === 'ACTIVO');
        this.pacientesFiltrados = this.pacientes;
        this.totalItems = this.pacientesFiltrados.length;
        this.updatePaginatedItems();
      },
      error: (error) => console.error('Error cargando pacientes:', error)
    });
  }


  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pacientesFiltrados = this.pacientes.slice(startIndex, endIndex);
  }


  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  getNombreCompleto(paciente: Paciente): string {
    return `${paciente.nombre} ${paciente.apPaterno} ${paciente.apMaterno}`;
  }


  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }



  // buscarPaciente() {
  //   if (this.filtros.expediente) {
  //     this.pacienteService.buscarPorExpediente(this.filtros.expediente).subscribe({
  //       next: (paciente) => {
  //         this.pacientes = [paciente];
  //       },
  //       error: () => {
  //         this.pacientes = [];
  //       }
  //     });
  //   } else if (this.filtros.curp) {
  //     this.pacienteService.buscarPorCurp(this.filtros.curp).subscribe({
  //       next: (paciente) => {
  //         this.pacientes = [paciente];
  //       },
  //       error: () => {
  //         this.pacientes = [];
  //       }
  //     });
  //   }else if (this.filtros.nombre) {
  //     this.pacienteService.buscarPorNombre(this.filtros.nombre).subscribe({
  //       next: (paciente) => {
  //         this.pacientes = [paciente];
  //       },
  //       error: () => {
  //         this.pacientes = [];
  //       }
  //     });
  //   }  else {
  //     this.cargarPacientes();
  //   }
  // }

  buscarPaciente() {
    if (this.filtros.expediente) {
      this.pacienteService.buscarPorExpediente(this.filtros.expediente).subscribe({
        next: (paciente) => {
          this.pacientes = [paciente];
          this.pacientesFiltrados = this.pacientes;
          this.totalItems = this.pacientesFiltrados.length;
          this.currentPage = 1;
          this.updatePaginatedItems();
        },
        error: () => {
          this.pacientes = [];
          this.pacientesFiltrados = [];
          this.totalItems = 0;
        }
      });
    } else if (this.filtros.curp) {
          this.pacienteService.buscarPorCurp(this.filtros.curp).subscribe({
            next: (paciente) => {
              this.pacientes = [paciente];
              this.pacientesFiltrados = this.pacientes;
              this.totalItems = this.pacientesFiltrados.length;
              this.currentPage = 1;
              this.updatePaginatedItems();
            },
            error: () => {
              this.pacientes = [];
              this.pacientesFiltrados = [];
              this.totalItems = 0;
            }
          });
        }else if (this.filtros.nombre) {
              this.pacienteService.buscarPorNombre(this.filtros.nombre).subscribe({
                next: (paciente) => {
                  this.pacientes = [paciente];
                  this.pacientesFiltrados = this.pacientes;
                  this.totalItems = this.pacientesFiltrados.length;
                  this.currentPage = 1;
                  this.updatePaginatedItems();
                },
                error: () => {
                  this.pacientes = [];
                  this.pacientesFiltrados = [];
                  this.totalItems = 0;
                }
              });
            }

    else {
      this.cargarPacientes();
    }
  }








  verDetalle(paciente: Paciente, modal: any) {
    this.pacienteSeleccionado = paciente;
    this.modalService.open(modal, { size: 'lg' });
  }

  eliminarPaciente(id: number ) {

    if (confirm('¿Está seguro de eliminar esta cirugía?')) {
      this.pacienteService.deletePaciente(id).subscribe({
        next: () => this.cargarPacientes(),
        error: (error) => console.error('Error eliminando cirugía:', error)
      });
    }
  }


}
