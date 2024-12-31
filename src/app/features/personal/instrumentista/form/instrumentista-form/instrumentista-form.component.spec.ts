import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentistaFormComponent } from './instrumentista-form.component';

describe('InstrumentistaFormComponent', () => {
  let component: InstrumentistaFormComponent;
  let fixture: ComponentFixture<InstrumentistaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentistaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
