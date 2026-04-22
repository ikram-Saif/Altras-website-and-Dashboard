import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHelpVideoComponent } from './display-help-video.component';

describe('DisplayHelpVideoComponent', () => {
  let component: DisplayHelpVideoComponent;
  let fixture: ComponentFixture<DisplayHelpVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayHelpVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHelpVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
