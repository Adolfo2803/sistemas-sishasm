import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternoFormComponent } from './externo-form.component';

describe('ExternoFormComponent', () => {
  let component: ExternoFormComponent;
  let fixture: ComponentFixture<ExternoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
