import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRegisterComponent } from './frm-register.component';

describe('FrmRegisterComponent', () => {
  let component: FrmRegisterComponent;
  let fixture: ComponentFixture<FrmRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
