import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculanteListComponent } from './circulante-list.component';

describe('CirculanteListComponent', () => {
  let component: CirculanteListComponent;
  let fixture: ComponentFixture<CirculanteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculanteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculanteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
