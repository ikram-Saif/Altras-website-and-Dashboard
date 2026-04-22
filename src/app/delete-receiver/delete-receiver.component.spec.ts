import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReceiverComponent } from './delete-receiver.component';

describe('DeleteReceiverComponent', () => {
  let component: DeleteReceiverComponent;
  let fixture: ComponentFixture<DeleteReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReceiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
