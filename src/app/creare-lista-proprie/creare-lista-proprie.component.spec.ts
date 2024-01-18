import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareListaProprieComponent } from './creare-lista-proprie.component';

describe('CreareListaProprieComponent', () => {
  let component: CreareListaProprieComponent;
  let fixture: ComponentFixture<CreareListaProprieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreareListaProprieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreareListaProprieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
