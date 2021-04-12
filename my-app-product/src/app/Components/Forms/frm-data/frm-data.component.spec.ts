import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmDataComponent } from './frm-data.component';

describe('FrmDataComponent', () => {
  let component: FrmDataComponent;
  let fixture: ComponentFixture<FrmDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
