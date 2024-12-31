import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculanteFormComponent } from './circulante-form.component';

describe('CirculanteFormComponent', () => {
  let component: CirculanteFormComponent;
  let fixture: ComponentFixture<CirculanteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculanteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculanteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
