import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunVenitComponent } from './bun-venit.component';

describe('BunVenitComponent', () => {
  let component: BunVenitComponent;
  let fixture: ComponentFixture<BunVenitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BunVenitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BunVenitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
