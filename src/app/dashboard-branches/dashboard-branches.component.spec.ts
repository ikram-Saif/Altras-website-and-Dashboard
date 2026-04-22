import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBranchesComponent } from './dashboard-branches.component';

describe('DashboardBranchesComponent', () => {
  let component: DashboardBranchesComponent;
  let fixture: ComponentFixture<DashboardBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
