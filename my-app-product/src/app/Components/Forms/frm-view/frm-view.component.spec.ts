import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmViewComponent } from './frm-view.component';

describe('FrmViewComponent', () => {
  let component: FrmViewComponent;
  let fixture: ComponentFixture<FrmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
