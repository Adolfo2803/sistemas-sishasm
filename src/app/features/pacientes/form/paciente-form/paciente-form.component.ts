import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PacienteService } from '../../../../core/services/paciente.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Paciente, StatusPaciente, TipoSexo } from '../../../../core/models/paciente.model';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export default class PacienteFormComponent implements OnInit, OnDestroy {
//   pacienteForm: FormGroup;
//   isEditing = false;
//   isSubmitting = false;
//   TipoSexo = TipoSexo;
//   StatusPaciente = StatusPaciente;

//   constructor(
//     private fb: FormBuilder,
//     private pacienteService: PacienteService,
//     private authService: AuthService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     // Inicializar el formulario
//     this.pacienteForm = this.fb.group({
//       expediente: ['', Validators.required],
//       nombre: ['', Validators.required],
//       apPaterno: ['', Validators.required],
//       apMaterno: ['', Validators.required],
//       sexo: ['', Validators.required],
//       edad: ['', [Validators.required, Validators.min(0)]],
//       curp: ['', Validators.required],
//       domicilio: [''],
//       telefono: [''],
//       ubicacion: [''],
//       fechaElab: [new Date().toISOString().split('T')[0]], // Formato YYYY-MM-DD
//       status: [StatusPaciente.ACTIVO]
//     });
//   }
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   onSubmit() {
//     if (this.pacienteForm.valid) {
//       this.isSubmitting = true;
//       const formValue = this.pacienteForm.value;

//       // Construir el objeto paciente exactamente como lo espera el backend
//       const pacienteData: Paciente = {
//         expediente: formValue.expediente,
//         nombre: formValue.nombre,
//         apPaterno: formValue.apPaterno,
//         apMaterno: formValue.apMaterno,
//         sexo: formValue.sexo,
//         edad: Number(formValue.edad),
//         curp: formValue.curp,
//         domicilio: formValue.domicilio || '',
//         telefono: formValue.telefono || '',
//         ubicacion: formValue.ubicacion || '',
//         fechaElab: formValue.fechaElab,
//         status: formValue.status,
//         elaboro: {
//           id: this.authService.getCurrentUser()?.id || 11 // ID del usuario actual
//         }
//       };

//       // Si estamos editando, incluir el ID
//       if (this.isEditing) {
//         pacienteData.id = +this.route.snapshot.paramMap.get('id')!;
//       }

//       console.log('Datos a enviar:', pacienteData);

//       const observable = this.isEditing
//         ? this.pacienteService.actualizarPaciente(pacienteData.id!, pacienteData)
//         : this.pacienteService.crearPaciente(pacienteData);

//       observable.subscribe({
//         next: (response) => {
//           console.log('Paciente guardado:', response);
//           this.router.navigate(['/dashboard/pacientes']);
//         },
//         error: (error) => {
//           console.error('Error:', error);
//           this.isSubmitting = false;
//         }
//       });
//     }
//   }
//   cargarPaciente(id: number) {
//     this.pacienteService.obtenerPaciente(id).subscribe({
//       next: (paciente) => {
//         this.pacienteForm.patchValue(paciente);
//       },
//       error: (error) => console.error('Error cargando paciente:', error)
//     });
//   }

// //   onSubmit() {
// //     if (this.pacienteForm.valid) {
// //       this.isSubmitting = true;
// //       const pacienteData = {
// //         ...this.pacienteForm.value,
// //         elaboro: {
// //           id: this.authService.getCurrentUser()?.id  // Obtén el ID del usuario actual
// //         }
// //       };

// //  // Log para ver exactamente qué estamos enviando
// //  console.log('Datos del paciente a enviar:', JSON.stringify(pacienteData));




// //       const observable = this.isEditing
// //         ? this.pacienteService.actualizarPaciente(
// //             +this.route.snapshot.paramMap.get('id')!,
// //             pacienteData
// //           )
// //         : this.pacienteService.crearPaciente(pacienteData);

// //       observable.subscribe({
// //         next: () => {
// //           this.router.navigate(['/dashboard/pacientes']);
// //         },
// //         error: (error) => {
// //           console.error('Error guardando paciente:', error);
// //           this.isSubmitting = false;
// //         }
// //       });
// //     } else {
// //       Object.keys(this.pacienteForm.controls).forEach(key => {
// //         const control = this.pacienteForm.get(key);
// //         if (control?.invalid) {
// //           control.markAsTouched();
// //         }
// //       });
// //     }
// //   }

pacienteForm: FormGroup;
  isEditing = false;
  isSubmitting = false;
  TipoSexo = TipoSexo;
  StatusPaciente = StatusPaciente;
  private expedienteSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pacienteForm = this.fb.group({
      expediente: ['', Validators.required],
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      curp: ['', Validators.required],
      domicilio: [''],
      telefono: [''],
      ubicacion: ['']
    });

 // Subscribe to expediente changes
 this.expedienteSubscription = this.pacienteForm.get('expediente')?.valueChanges
 .pipe(
   debounceTime(500),
   distinctUntilChanged()
 )
 .subscribe(value => {
   if (value && value.length > 0) {
     this.buscarPorExpediente(value);
   }
 });

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cargarPaciente(+id);
    }
  }

  ngOnDestroy(): void {
    this.expedienteSubscription?.unsubscribe();
  }


  cargarPaciente(id: number) {
    this.pacienteService.obtenerPaciente(id).subscribe({
      next: (paciente) => {
        this.pacienteForm.patchValue({
          expediente: paciente.expediente,
          nombre: paciente.nombre,
          apPaterno: paciente.apPaterno,
          apMaterno: paciente.apMaterno,
          sexo: paciente.sexo,
          edad: paciente.edad,
          curp: paciente.curp,
          domicilio: paciente.domicilio,
          telefono: paciente.telefono,
          ubicacion: paciente.ubicacion
        });
      },
      error: (error) => console.error('Error cargando paciente:', error)
    });
  }

  private buscarPorExpediente(expediente: string) {
    this.pacienteService.buscarPorExpediente(expediente).subscribe({
      next: (paciente) => {
        if (paciente) {
          this.pacienteForm.patchValue({
            nombre: paciente.nombre,
            apPaterno: paciente.apPaterno,
            apMaterno: paciente.apMaterno
          });
        }
      },
      error: (error) => console.error('Error buscando paciente:', error)
    });
  }





  onSubmit() {
    if (this.pacienteForm.valid) {
      this.isSubmitting = true;
      const formValue = this.pacienteForm.value;

      const pacienteData: Paciente = {
        expediente: formValue.expediente,
        nombre: formValue.nombre,
        apPaterno: formValue.apPaterno,
        apMaterno: formValue.apMaterno,
        sexo: formValue.sexo,
        edad: Number(formValue.edad),
        curp: formValue.curp,
        domicilio: formValue.domicilio || '',
        telefono: formValue.telefono || '',
        ubicacion: formValue.ubicacion || '',
        fechaElab: new Date().toISOString().split('T')[0], // Formato "YYYY-MM-DD"
        status: 'ACTIVO',
        elaboro: { id: Number( this.authService.getCurrentUser()?.id) }
      };

      console.log('Datos a enviar:', JSON.stringify(pacienteData, null, 2));

      const observable = this.isEditing
        ? this.pacienteService.actualizarPaciente(
            +this.route.snapshot.paramMap.get('id')!,
            pacienteData
          )        : this.pacienteService.crearPaciente(pacienteData);

      observable.subscribe({
        next: (response) => {
          console.log('Paciente guardado exitosamente:', response);
          this.router.navigate(['/dashboard/pacientes']);
        },
        error: (error) => {
          console.error('Error al guardar paciente:', error);
          if (error.status === 400) {
            alert(error.error);
          }
          this.isSubmitting = false;
        }
      });
    }
  }


}
