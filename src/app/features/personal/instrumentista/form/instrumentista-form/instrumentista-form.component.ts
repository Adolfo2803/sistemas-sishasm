import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InstrumentistaService } from '../../../../../core/services/instrumentista.service';

@Component({
  selector: 'app-instrumentista-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './instrumentista-form.component.html',
  styleUrl: './instrumentista-form.component.css'
})
export default class InstrumentistaFormComponent {

   private fb = inject(FormBuilder);
    private instrumentistaService = inject(InstrumentistaService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    instrumentistaForm: FormGroup = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      especialidad: ['']
    });

    editMode = false;

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.editMode = true;
        this.loadInstrumentista(+id);
      }
    }

    loadInstrumentista(id: number): void {
      this.instrumentistaService.getById(id).subscribe(instrumentista => {
        this.instrumentistaForm.patchValue(instrumentista);
      });
    }

    onSubmit(): void {
      if (this.instrumentistaForm.valid) {
        const instrumentista = this.instrumentistaForm.value;
        const operation = this.editMode
          ? this.instrumentistaService.update(instrumentista.id, instrumentista)
          : this.instrumentistaService.create(instrumentista);

        operation.subscribe(() => {
          this.router.navigate(['/dashboard/personal/instrumentistas']);
        });
      }
    }
}
