import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiMoneyLunduringComponent } from './anti-money-lunduring.component';

describe('AntiMoneyLunduringComponent', () => {
  let component: AntiMoneyLunduringComponent;
  let fixture: ComponentFixture<AntiMoneyLunduringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiMoneyLunduringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiMoneyLunduringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
