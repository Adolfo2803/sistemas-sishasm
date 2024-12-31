import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirujanoListComponent } from './cirujano-list.component';

describe('CirujanoListComponent', () => {
  let component: CirujanoListComponent;
  let fixture: ComponentFixture<CirujanoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirujanoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirujanoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
