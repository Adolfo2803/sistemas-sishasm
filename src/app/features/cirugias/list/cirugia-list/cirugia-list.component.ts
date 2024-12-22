import { Component, OnInit } from '@angular/core';
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

import { NgbCarouselConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cirugia-list',
  standalone: true,
  imports: [RouterLink,CommonModule, RouterModule, FormsModule,NgbModule ],
  templateUrl: './cirugia-list.component.html',
  styleUrl: './cirugia-list.component.css'
})
export default class CirugiaListComponent implements OnInit {
  cirugias: any[] = [];
  cirujanos: any[] = [];
  logoUrl='./assets/images/logo.png'
  cirugiaSeleccionada: any;

  filtros = {
    fecha: '',
    numeroQuirofano: '',
    cirujanoId: ''
  };

  constructor(
    private cirugiaService: CirugiaService,
    private personalMedicoService: PersonalMedicoService,
    private modalService: NgbModal
  ) {


  }

  verDetalle(cirugia: any, modal: any) {
    this.cirugiaSeleccionada = cirugia;
    this.modalService.open(modal, { size: 'lg' });
}

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
    return `${paciente.nombre} ${paciente.apPaterno} ${paciente.apMaterno} - ${paciente.expediente}`;
  }

  getCirujanoNombre(cirujano: any): string {
    if (!cirujano) return 'N/A';
    return `${cirujano.nombre} - ${cirujano.especialidad}`;
  }

  aplicarFiltros() {
    let filtrosAplicados: any = {};

    // Solo aplicar el filtro que tenga valor
    if (this.filtros.fecha) {
      filtrosAplicados.fecha = this.filtros.fecha;
    } else if (this.filtros.numeroQuirofano) {
      filtrosAplicados.numeroQuirofano = this.filtros.numeroQuirofano;
    } else if (this.filtros.cirujanoId) {
      filtrosAplicados.cirujanoId = this.filtros.cirujanoId;
    }

    this.cirugiaService.getCirugias(filtrosAplicados).subscribe({
      next: (data) => {
        console.log('Cirugías filtradas:', data);
        this.cirugias = data;
      },
      error: (error) => {
        console.error('Error al filtrar cirugías:', error);
      }
    });
  }


  limpiarFiltros() {
    this.filtros = {
      fecha: '',
      numeroQuirofano: '',
      cirujanoId: ''
    };
    this.cargarCirugias(); // Volver a cargar todas las cirugías
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


    // Logo en base64 (este es un ejemplo, deberás reemplazarlo con tu logo real)
    //private readonly LOGO = 'data:assets/images;base64,logo';
   // const LOGO = 'assets/images/logo.png';






   async exportarPDF():Promise<void> {
    const doc = new jsPDF();

 // Configuración de la página
 const pageWidth = doc.internal.pageSize.width;
 const pageHeight = doc.internal.pageSize.height;
 const margin = 20;

 // Agregar membrete

 //para otton pdf
 await this.agregarMembrete(doc);






    autoTable(doc, {
      head: [['Nº Cirugía', 'Fecha', 'Hora', 'Quirófano', 'Paciente', 'Cirujano', 'Tipo']],
      body: this.cirugias.map(cirugia => [
        cirugia.numeroCirugia,
        new Date(cirugia.fechaCirugia).toLocaleDateString(),
        cirugia.iniciaAnestesia,
        `Quirófano ${cirugia.numeroQuirofano}`,
        this.getPacienteNombre(cirugia.paciente),
        this.getCirujanoNombre(cirugia.cirujano),
        cirugia.tipoCirugia
      ]),
      startY: 45, // Empezar después del membrete
      didDrawPage: (data) => {
        // Agregar membrete en cada nueva página
        if (data.pageNumber > 1) {
          this.agregarMembrete(doc);
        }

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(
          `Página ${data.pageNumber} de ${data.pageCount}`,
          data.settings.margin.left,
          pageHeight - 10
        );
        doc.text(
          `Generado el ${new Date().toLocaleDateString()}`,
          pageWidth - 70,
          pageHeight - 10
        );
      },
      margin: { top: margin }
    });

    // Generar el archivo PDF
    doc.save(`Cirugias_${new Date().toISOString().split('T')[0]}.pdf`);
  }


  private async agregarMembrete(doc: jsPDF): Promise<void> {
    return new Promise((resolve) => {
        const pageWidth = doc.internal.pageSize.width;

        // Agregar solo el texto del membrete primero
        try {
            // Título de la institución
            doc.setFontSize(16);
            doc.setTextColor(0);
            doc.setFont('helvetica', 'bold');
            doc.text('HOSPITAL GENERAL DE TUXPAN', pageWidth / 2, 15, { align: 'center' });

            // Subtítulo
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.text('DEPARTAMENTO DE CIRUGÍA', pageWidth / 2, 25, { align: 'center' });

            // Título del reporte
            doc.setFontSize(12);
            doc.text('REPORTE DE CIRUGÍAS PROGRAMADAS', pageWidth / 2, 35, { align: 'center' });

            // Línea separadora
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.line(20, 38, pageWidth - 20, 38);

        } catch (error) {
            console.error('Error al agregar membrete:', error);
        }
        resolve();
    });
}



}

