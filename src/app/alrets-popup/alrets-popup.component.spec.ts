import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlretsPopupComponent } from './alrets-popup.component';

describe('AlretsPopupComponent', () => {
  let component: AlretsPopupComponent;
  let fixture: ComponentFixture<AlretsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlretsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlretsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
