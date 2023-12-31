import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugaInListaComponent } from './adauga-in-lista.component';

describe('AdaugaInListaComponent', () => {
  let component: AdaugaInListaComponent;
  let fixture: ComponentFixture<AdaugaInListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdaugaInListaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdaugaInListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
