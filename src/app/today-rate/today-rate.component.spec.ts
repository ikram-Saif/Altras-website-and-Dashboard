import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayRateComponent } from './today-rate.component';

describe('TodayRateComponent', () => {
  let component: TodayRateComponent;
  let fixture: ComponentFixture<TodayRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
