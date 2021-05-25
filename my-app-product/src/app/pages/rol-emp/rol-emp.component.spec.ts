import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolEmpComponent } from './rol-emp.component';

describe('RolEmpComponent', () => {
  let component: RolEmpComponent;
  let fixture: ComponentFixture<RolEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
