import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InternoService } from '../../../../../core/services/interno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interno-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './interno-form.component.html',
  styleUrl: './interno-form.component.css'
})
export default class InternoFormComponent {
 private fb = inject(FormBuilder);
  private internoService = inject(InternoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  internoForm: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    especialidad: ['']
  });

  editMode = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadInterno(+id);
    }
  }

  loadInterno(id: number): void {
    this.internoService.getById(id).subscribe(interno => {
      this.internoForm.patchValue(interno);
    });
  }

  onSubmit(): void {
    if (this.internoForm.valid) {
      const interno = this.internoForm.value;
      const operation = this.editMode
        ? this.internoService.update(interno.id, interno)
        : this.internoService.create(interno);

      operation.subscribe(() => {
        this.router.navigate(['/dashboard/apoyo/internos']);
      });
    }
  }
}
