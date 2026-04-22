import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReciverDetailsPopupComponent } from './edit-reciver-details-popup.component';

describe('EditReciverDetailsPopupComponent', () => {
  let component: EditReciverDetailsPopupComponent;
  let fixture: ComponentFixture<EditReciverDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReciverDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReciverDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
