import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirugiaListComponent } from './cirugia-list.component';

describe('CirugiaListComponent', () => {
  let component: CirugiaListComponent;
  let fixture: ComponentFixture<CirugiaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirugiaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirugiaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
