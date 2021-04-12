import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmProductComponent } from './frm-product.component';

describe('FrmProductComponent', () => {
  let component: FrmProductComponent;
  let fixture: ComponentFixture<FrmProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
