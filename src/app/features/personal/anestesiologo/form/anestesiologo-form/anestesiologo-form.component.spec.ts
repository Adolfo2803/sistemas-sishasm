import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnestesiologoFormComponent } from './anestesiologo-form.component';

describe('AnestesiologoFormComponent', () => {
  let component: AnestesiologoFormComponent;
  let fixture: ComponentFixture<AnestesiologoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnestesiologoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnestesiologoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
