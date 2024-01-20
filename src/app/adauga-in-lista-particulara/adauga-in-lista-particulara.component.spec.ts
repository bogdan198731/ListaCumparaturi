import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugaInListaParticularaComponent } from './adauga-in-lista-particulara.component';

describe('AdaugaInListaParticularaComponent', () => {
  let component: AdaugaInListaParticularaComponent;
  let fixture: ComponentFixture<AdaugaInListaParticularaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdaugaInListaParticularaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdaugaInListaParticularaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
