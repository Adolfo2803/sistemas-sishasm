import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnestesiologoListComponent } from './anestesiologo-list.component';

describe('AnestesiologoListComponent', () => {
  let component: AnestesiologoListComponent;
  let fixture: ComponentFixture<AnestesiologoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnestesiologoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnestesiologoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
