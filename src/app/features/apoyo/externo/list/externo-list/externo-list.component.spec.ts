import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternoListComponent } from './externo-list.component';

describe('ExternoListComponent', () => {
  let component: ExternoListComponent;
  let fixture: ComponentFixture<ExternoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
