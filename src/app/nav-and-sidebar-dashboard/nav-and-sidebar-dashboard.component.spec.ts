import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAndSidebarDashboardComponent } from './nav-and-sidebar-dashboard.component';

describe('NavAndSidebarDashboardComponent', () => {
  let component: NavAndSidebarDashboardComponent;
  let fixture: ComponentFixture<NavAndSidebarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAndSidebarDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAndSidebarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
