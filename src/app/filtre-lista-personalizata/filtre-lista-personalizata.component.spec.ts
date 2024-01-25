import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreListaPersonalizataComponent } from './filtre-lista-personalizata.component';

describe('FiltreListaPersonalizataComponent', () => {
  let component: FiltreListaPersonalizataComponent;
  let fixture: ComponentFixture<FiltreListaPersonalizataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltreListaPersonalizataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltreListaPersonalizataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
