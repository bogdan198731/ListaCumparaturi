import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeziDetaliiComponent } from './vezi-detalii.component';

describe('VeziDetaliiComponent', () => {
  let component: VeziDetaliiComponent;
  let fixture: ComponentFixture<VeziDetaliiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeziDetaliiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeziDetaliiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
