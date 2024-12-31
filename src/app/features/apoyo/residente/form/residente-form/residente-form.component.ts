import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResidenteService } from '../../../../../core/services/residente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-residente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './residente-form.component.html',
  styleUrl: './residente-form.component.css'
})
export default class ResidenteFormComponent {
private fb = inject(FormBuilder);
  private residenteService = inject(ResidenteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  residenteForm: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    especialidad: ['']
  });

  editMode = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadResidentes(+id);
    }
  }

  loadResidentes(id: number): void {
    this.residenteService.getById(id).subscribe(residente => {
      this.residenteForm.patchValue(residente);
    });
  }

  onSubmit(): void {
    if (this.residenteForm.valid) {
      const residente = this.residenteForm.value;
      const operation = this.editMode
        ? this.residenteService.update(residente.id, residente)
        : this.residenteService.create(residente);

      operation.subscribe(() => {
        this.router.navigate(['/dashboard/apoyo/residentes']);
      });
    }
  }
}
