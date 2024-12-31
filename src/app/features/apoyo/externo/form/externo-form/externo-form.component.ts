import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExternoService } from '../../../../../core/services/externo.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-externo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './externo-form.component.html',
  styleUrl: './externo-form.component.css'
})
export default class ExternoFormComponent {
private fb = inject(FormBuilder);
  private externoService = inject(ExternoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  externoForm: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    especialidad: ['']
  });

  editMode = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadExterno(+id);
    }
  }

  loadExterno(id: number): void {
    this.externoService.getById(id).subscribe(externo => {
      this.externoForm.patchValue(externo);
    });
  }

  onSubmit(): void {
    if (this.externoForm.valid) {
      const externo = this.externoForm.value;
      const operation = this.editMode
        ? this.externoService.update(externo.id, externo)
        : this.externoService.create(externo);

      operation.subscribe(() => {
        this.router.navigate(['/dashboard/apoyo/externos']);
      });
    }
  }
}
