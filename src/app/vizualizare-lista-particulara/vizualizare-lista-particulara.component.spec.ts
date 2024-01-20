import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizareListaParticularaComponent } from './vizualizare-lista-particulara.component';

describe('VizualizareListaParticularaComponent', () => {
  let component: VizualizareListaParticularaComponent;
  let fixture: ComponentFixture<VizualizareListaParticularaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizareListaParticularaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VizualizareListaParticularaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
