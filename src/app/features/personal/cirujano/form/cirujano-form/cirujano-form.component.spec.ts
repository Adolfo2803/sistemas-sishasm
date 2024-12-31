import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirujanoFormComponent } from './cirujano-form.component';

describe('CirujanoFormComponent', () => {
  let component: CirujanoFormComponent;
  let fixture: ComponentFixture<CirujanoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirujanoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirujanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
