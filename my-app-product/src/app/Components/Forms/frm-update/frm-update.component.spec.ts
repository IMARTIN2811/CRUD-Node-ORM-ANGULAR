import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmUpdateComponent } from './frm-update.component';

describe('FrmUpdateComponent', () => {
  let component: FrmUpdateComponent;
  let fixture: ComponentFixture<FrmUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
