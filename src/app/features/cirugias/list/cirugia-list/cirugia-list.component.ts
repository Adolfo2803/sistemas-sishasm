import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CirugiaService } from '../../../../core/services/cirugia.service';
import { CirugiaFiltros, EstadoCirugia } from '../../../../core/models/cirugia.model';
import { PersonalMedicoService } from '../../../../core/services/personal-medico.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  exportarExcel(): void {
    const datosParaExportar = this.cirugias.map(cirugia => ({
      'Número de Cirugía': cirugia.numeroCirugia,
      'Fecha': new Date(cirugia.fechaCirugia).toLocaleDateString(),
      'Hora': cirugia.iniciaAnestesia,
      'Quirófano': `Quirófano ${cirugia.numeroQuirofano}`,
      'Paciente': this.getPacienteNombre(cirugia.paciente),
      'Cirujano': this.getCirujanoNombre(cirugia.cirujano),
      'Tipo de Cirugía': cirugia.tipoCirugia,
      'Material': cirugia.material,
      'Medicamento': cirugia.medicamento,
      'Suturas': cirugia.suturas,
      'Inicio Anestesia': cirugia.iniciaAnestesia,
      'Fin Anestesia': cirugia.terminaAnestesia || 'No registrado'
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExportar);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cirugías');

    // Generar el archivo Excel
    XLSX.writeFile(wb, `Cirugias_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  exportarPDF(): void {
    const doc = new jsPDF();
    const rows = this.cirugias.map(cirugia => [
      cirugia.numeroCirugia,
      new Date(cirugia.fechaCirugia).toLocaleDateString(),
      cirugia.iniciaAnestesia,
      `Quirófano ${cirugia.numeroQuirofano}`,
      this.getPacienteNombre(cirugia.paciente),
      this.getCirujanoNombre(cirugia.cirujano),
      cirugia.tipoCirugia
    ]);

    //para otton pdf

    autoTable(doc, {
      head: [['Nº Cirugía', 'Fecha', 'Hora', 'Quirófano', 'Paciente', 'Cirujano', 'Tipo']],
      body: rows,
      didDrawPage: function(data) {
        // Header
        doc.setFontSize(20);
        doc.text('Reporte de Cirugías Programadas', 14, 15);

        // Footer
        doc.setFontSize(10);
        doc.text(
          `Fecha de generación: ${new Date().toLocaleDateString()}`,
          14,
          doc.internal.pageSize.height - 10
        );
      },
      margin: { top: 30 }
    });

    // Generar el archivo PDF
    doc.save(`Cirugias_${new Date().toISOString().split('T')[0]}.pdf`);
  }




}
