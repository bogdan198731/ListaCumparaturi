import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautareListeParticulareComponent } from './cautare-liste-particulare.component';

describe('CautareListeParticulareComponent', () => {
  let component: CautareListeParticulareComponent;
  let fixture: ComponentFixture<CautareListeParticulareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CautareListeParticulareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CautareListeParticulareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
