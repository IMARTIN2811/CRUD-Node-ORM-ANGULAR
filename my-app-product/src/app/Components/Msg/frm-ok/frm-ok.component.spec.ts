import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmSaveComponent } from './frm-save.component';

describe('FrmSaveComponent', () => {
  let component: FrmSaveComponent;
  let fixture: ComponentFixture<FrmSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
