import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentistaListComponent } from './instrumentista-list.component';

describe('InstrumentistaListComponent', () => {
  let component: InstrumentistaListComponent;
  let fixture: ComponentFixture<InstrumentistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentistaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
