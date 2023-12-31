import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCumparaturiComponent } from './lista-cumparaturi.component';

describe('ListaCumparaturiComponent', () => {
  let component: ListaCumparaturiComponent;
  let fixture: ComponentFixture<ListaCumparaturiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCumparaturiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCumparaturiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
