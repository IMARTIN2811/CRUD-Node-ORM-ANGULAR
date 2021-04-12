import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCheckComponent } from './frm-check.component';

describe('FrmCheckComponent', () => {
  let component: FrmCheckComponent;
  let fixture: ComponentFixture<FrmCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
