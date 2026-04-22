import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciverDetailsPopupComponent } from './reciver-details-popup.component';

describe('ReciverDetailsPopupComponent', () => {
  let component: ReciverDetailsPopupComponent;
  let fixture: ComponentFixture<ReciverDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciverDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciverDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
