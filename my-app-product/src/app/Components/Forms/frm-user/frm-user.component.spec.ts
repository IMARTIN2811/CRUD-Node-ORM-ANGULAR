import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmUserComponent } from './frm-user.component';

describe('FrmUserComponent', () => {
  let component: FrmUserComponent;
  let fixture: ComponentFixture<FrmUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
