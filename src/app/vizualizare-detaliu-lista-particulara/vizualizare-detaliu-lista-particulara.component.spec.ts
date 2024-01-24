import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizareDetaliuListaParticularaComponent } from './vizualizare-detaliu-lista-particulara.component';

describe('VizualizareDetaliuListaParticularaComponent', () => {
  let component: VizualizareDetaliuListaParticularaComponent;
  let fixture: ComponentFixture<VizualizareDetaliuListaParticularaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizareDetaliuListaParticularaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VizualizareDetaliuListaParticularaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
