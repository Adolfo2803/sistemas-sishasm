import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnestesiologoService } from '../../../../../core/services/anestesiologo.service';

@Component({
  selector: 'app-anestesiologo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './anestesiologo-form.component.html',
  styleUrl: './anestesiologo-form.component.css'
})
export default class AnestesiologoFormComponent {
  private fb = inject(FormBuilder);
  private anestesiologoService = inject(AnestesiologoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  anestesiologoForm: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    especialidad: ['']
  });

  editMode = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadAnestesiologo(+id);
    }
  }

  loadAnestesiologo(id: number): void {
    this.anestesiologoService.getById(id).subscribe(anestesiologo => {
      this.anestesiologoForm.patchValue(anestesiologo);
    });
  }

  onSubmit(): void {
    if (this.anestesiologoForm.valid) {
      const anestesiologo = this.anestesiologoForm.value;
      const operation = this.editMode
        ? this.anestesiologoService.update(anestesiologo.id, anestesiologo)
        : this.anestesiologoService.create(anestesiologo);

      operation.subscribe(() => {
        this.router.navigate(['/dashboard/personal/anestesiologos']);
      });
    }
  }
}
