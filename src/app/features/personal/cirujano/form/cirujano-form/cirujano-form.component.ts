import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CirujanoService } from '../../../../../core/services/cirujano.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cirujano-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './cirujano-form.component.html',
  styleUrl: './cirujano-form.component.css'
})
export default class CirujanoFormComponent {

   private fb = inject(FormBuilder);
    private cirujanoService = inject(CirujanoService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    cirujanoForm: FormGroup = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      especialidad: ['']
    });

    editMode = false;

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.editMode = true;
        this.loadCirujano(+id);
      }
    }

    loadCirujano(id: number): void {
      this.cirujanoService.getById(id).subscribe(cirujano => {
        this.cirujanoForm.patchValue(cirujano);
      });
    }

    onSubmit(): void {
      if (this.cirujanoForm.valid) {
        const cirujano = this.cirujanoForm.value;
        const operation = this.editMode
          ? this.cirujanoService.update(cirujano.id, cirujano)
          : this.cirujanoService.create(cirujano);

        operation.subscribe(() => {
          this.router.navigate(['/dashboard/personal/cirujanos']);
        });
      }
    }

}
