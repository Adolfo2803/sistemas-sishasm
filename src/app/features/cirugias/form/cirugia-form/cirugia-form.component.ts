import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cirugia, EstadoCirugia } from '../../../../core/models/cirugia.model';
import { CommonModule } from '@angular/common';
import { CirugiaService } from '../../../../core/services/cirugia.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Paciente } from '../../../../core/models/paciente.model';
import { Anestesiologo, ApoyoExterno, Circulante, Cirujano, Instrumentista, Interno, PersonalMedico, Residente } from '../../../../core/models/personal-medico.model';
import { PersonalMedicoService } from '../../../../core/services/personal-medico.service';
import { PacienteService } from '../../../../core/services/paciente.service';
import { HttpClientModule } from '@angular/common/http';
 // Ajusta la ruta si es necesario
@Component({
  selector: 'app-cirugia-form',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule],
  templateUrl: './cirugia-form.component.html',
  styleUrl: './cirugia-form.component.css'
})
export default class CirugiaFormComponent implements OnInit {
  edit = false; // Se actualizará según la ruta
  cirugiaForm: FormGroup;
  isEditing = false;
  isSubmitting = false;

  // Listas para los selects
  pacientes: Paciente[] = [];
  cirujanos: Cirujano[] = [];
  anestesiologos: Anestesiologo[] = [];
  instrumentistas: Instrumentista[] = [];
  circulantes: Circulante[] = [];
  residentes: Residente[] = [];
  internos: Interno[] = [];
  apoyoExterno: ApoyoExterno[] = [];

  constructor(
    private fb: FormBuilder,
    private cirugiaService: CirugiaService,
    private personalMedicoService: PersonalMedicoService,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cirugiaForm = this.fb.group({
      numeroCirugia: ['', Validators.required],
      numeroQuirofano: ['', Validators.required],
      fechaCirugia: ['', Validators.required],
      iniciaAnestesia: ['', Validators.required],
      terminaAnestesia: [''],
      material: [''],
      medicamento: [''],
      suturas: [''],
      tipoCirugia: [''],
      paciente: ['', Validators.required],
      cirujano: ['', Validators.required],
      anestesiologo: ['', Validators.required],
      instrumentista: ['', Validators.required],
      circulante: ['', Validators.required],
      residentes: [[]],
      internos: [[]],
      apoyoExterno: [[]]
    });
  }

  ngOnInit() {
    console.log('Inicializando componente...');
    this.cargarPacientes();
    this.cargarCirujanos();
    this.cargarAnestesiologos();
    this.cargarInstrumentistas();
    this.cargarCirculantes();
    this.cargarResidentes();
    this.cargarInternos();
    this.cargarApoyoExternos();



    // Verificar si estamos en modo edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cargarCirugia(+id);
    }
  }

  cargarPacientes() {
    console.log('Cargando pacientes...');
    this.pacienteService.getPacientesConLog().subscribe({
      next: (data) => {
        console.log('Pacientes cargados:', data);
        this.pacientes = data;
      },
      error: (error) => {
        console.error('Error cargando pacientes:', error);
      }
    });
  }

  cargarCirujanos() {
    console.log('Cargando cirujanos...');
    this.personalMedicoService.getCirujanos() .subscribe({
      next: (data) => {
        console.log('cirujanos cargados:', data);
        this.cirujanos = data;
      },
      error: (error) => {
        console.error('Error cargando cirujanos:', error);
      }
    });
  }


  cargarAnestesiologos() {
    console.log('Cargando anestesiologos...');
    this.personalMedicoService.getAnestesiologos() .subscribe({
      next: (data) => {
        console.log('anestesiologos cargados:', data);
        this.anestesiologos = data;
      },
      error: (error) => {
        console.error('Error cargando anestesiologos:', error);
      }
    });
  }

  cargarInstrumentistas(){
    console.log('Cargando instrumentistas...');
    this.personalMedicoService.getInstrumentistas() .subscribe({
      next: (data) => {
        console.log('instrumentistas cargados:', data);
        this.instrumentistas = data;
      },
      error: (error) => {
        console.error('Error cargando instrumentistas:', error);
      }
    });
  }

  cargarCirculantes(){
    console.log('Cargando circulantes...');
    this.personalMedicoService.getCirculantes() .subscribe({
      next: (data) => {
        console.log('circulantes cargados:', data);
        this.circulantes = data;
      },
      error: (error) => {
        console.error('Error cargando circulantes:', error);
      }
    });
  }

  cargarResidentes(){
    console.log('Cargando residentes...');
    this.personalMedicoService.getResidentes() .subscribe({
      next: (data) => {
        console.log('residentes cargados:', data);
        this.residentes = data;
      },
      error: (error) => {
        console.error('Error cargando residentes:', error);
      }
    });
  }

  cargarInternos(){
    console.log('Cargando internos...');
    this.personalMedicoService.getInternos() .subscribe({
      next: (data) => {
        console.log('internos cargados:', data);
        this.internos = data;
      },
      error: (error) => {
        console.error('Error cargando internos:', error);
      }
    });

  }

  cargarApoyoExternos(){
    console.log('Cargando apoyo...');
    this.personalMedicoService.getApoyoExterno() .subscribe({
      next: (data) => {
        console.log('apoyo cargados:', data);
        this.apoyoExterno = data;
      },
      error: (error) => {
        console.error('Error cargando apoyo:', error);
      }
    });

  }

  cargarCirugia(id: number) {
    this.cirugiaService.getCirugiaById(id).subscribe({
      next: (cirugia) => {
        this.cirugiaForm.patchValue({
          ...cirugia,
          fecha: this.formatDate(new Date(cirugia.fechaCirugia))
        });
      },
      error: (error) => {
        console.error('Error cargando cirugía:', error);
        // Aquí podríamos mostrar un mensaje de error
      }
    });
  }

  onSubmit() {
    this.cargarCatalogos();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cargarCirugia(+id);
    }



    if (this.cirugiaForm.valid) {
      this.isSubmitting = true;
      const formValue = this.cirugiaForm.value;


      const cirugiaData: Cirugia = {
        numeroCirugia: formValue.numeroCirugia!,
        numeroQuirofano: Number(formValue.numeroQuirofano),
        fechaCirugia: formValue.fechaCirugia!,
        iniciaAnestesia: formValue.iniciaAnestesia!,
        terminaAnestesia: formValue.terminaAnestesia || '',
        material: formValue.material || '',
        medicamento: formValue.medicamento || '',
        suturas: formValue.suturas || '',
        tipoCirugia: formValue.tipoCirugia || '',
        paciente: { id: Number(formValue.paciente) },
        cirujano: { id: Number(formValue.cirujano) },
        anestesiologo: { id: Number(formValue.anestesiologo) },
        instrumentista: { id: Number(formValue.instrumentista) },
        circulante: { id: Number(formValue.circulante) },
        residentes: (formValue.residentes || []).map((id: any) => ({ id: Number(id) })),
        internos: (formValue.internos || []).map((id: any) => ({ id: Number(id) })),
        apoyoExterno: (formValue.apoyoExterno || []).map((id: any) => ({ id: Number(id) }))
      };

      console.log('Datos a enviar:', cirugiaData);

      const observable = this.isEditing
        ? this.cirugiaService.updateCirugia(
            +this.route.snapshot.paramMap.get('id')!,
            cirugiaData
          )
        : this.cirugiaService.createCirugia(cirugiaData);

        observable.subscribe({
          next: (response) => {
            console.log('Cirugía guardada exitosamente:', response);
            this.router.navigate(['/dashboard/cirugias']);
          },
          error: (error) => {
            console.error('Error al guardar la cirugía:', error);
            this.isSubmitting = false;
          }
        });
    } else {
      Object.keys(this.cirugiaForm.controls).forEach(key => {
        const control = this.cirugiaForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  cargarCatalogos() {
    // Cargamos todos los catálogos necesarios
    this.pacienteService.getPacientes()
      .subscribe(data => this.pacientes = data);

      this.personalMedicoService.getCirujanos().subscribe({
        next: (data) => this.cirujanos = data,
        error: (error) => console.error('Error cargando cirujanos:', error)
      });

      this.personalMedicoService.getAnestesiologos().subscribe({
        next: (data) => this.anestesiologos = data,
        error: (error) => console.error('Error cargando anestesiólogos:', error)
      });

    this.personalMedicoService.getInstrumentistas().subscribe({
      next: (data) => this.instrumentistas = data,
      error: (error) => console.error('Error cargando instrumentistas:', error)
    });

    this.personalMedicoService.getCirculantes().subscribe({
      next: (data) => this.circulantes = data,
      error: (error) => console.error('Error cargando circulantes:', error)
    });

    this.personalMedicoService.getResidentes().subscribe({
      next: (data) => this.residentes = data,
      error: (error) => console.error('Error cargando residentes:', error)
    });

    this.personalMedicoService.getInternos().subscribe({
      next: (data) => this.internos = data,
      error: (error) => console.error('Error cargando internos:', error)
    });

    this.personalMedicoService.getApoyoExterno().subscribe({
      next: (data) => this.apoyoExterno = data,
      error: (error) => console.error('Error cargando apoyoExterno:', error)
    });
  }

 // Métodos helper para mostrar nombres
 getPersonalMedicoDisplay(personal: PersonalMedico): string {
  if (!personal) return '';
  return `${personal.nombre} - ${personal.especialidad}`;
}



  // Método helper para mostrar nombres completos en los selects
 getNombreCompleto(paciente: Paciente): string {
  return `${paciente.nombre} ${paciente.apPaterno} ${paciente.apMaterno}`;
}

getCirujanoCompleto(cirujano: Cirujano): string {
  if (!cirujano) return '';
  return `${cirujano.nombre} - ${cirujano.especialidad}`;
}

getAnestesiologoCompleto(anestesiologo: Anestesiologo): string {
  if (!anestesiologo) return '';
  return `${anestesiologo.nombre} - ${anestesiologo.especialidad}`;
}

getInstrumentistaCompleto(instrumentista: Instrumentista): string {
  if (!instrumentista) return '';
  return `${instrumentista.nombre} - ${instrumentista.especialidad}`;
}

getCirculanteCompleto(circulante: Circulante): string {
  if (!circulante) return '';
  return `${circulante.nombre} - ${circulante.especialidad}`;
}

getResiCompleto(residente: Residente): string {
  if (!residente) return '';
  return `${residente.nombre} - ${residente.especialidad}`;
}

getInternoCompleto(interno: Interno): string {
  if (!interno) return '';
  return `${interno.nombre} - ${interno.especialidad}`;
}

getApoyoExternoCompleto(apoyo: ApoyoExterno): string {
  if (!apoyo) return '';
  return `${apoyo.nombre} - ${apoyo.especialidad}`;
}



  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

}
