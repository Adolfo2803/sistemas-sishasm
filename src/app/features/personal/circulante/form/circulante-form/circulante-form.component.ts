import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CirculanteService } from '../../../../../core/services/circulante.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-circulante-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './circulante-form.component.html',
  styleUrl: './circulante-form.component.css'
})
export default class CirculanteFormComponent {
  private fb = inject(FormBuilder);
  private circulanteService = inject(CirculanteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  circulanteForm: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    especialidad: ['']
  });

  editMode = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadCirculante(+id);
    }
  }

  loadCirculante(id: number): void {
    this.circulanteService.getById(id).subscribe(circulante => {
      this.circulanteForm.patchValue(circulante);
    });
  }

  onSubmit(): void {
    if (this.circulanteForm.valid) {
      const circulante = this.circulanteForm.value;
      const operation = this.editMode
        ? this.circulanteService.update(circulante.id, circulante)
        : this.circulanteService.create(circulante);

      operation.subscribe(() => {
        this.router.navigate(['/dashboard/personal/circulantes']);
      });
    }
  }
}
