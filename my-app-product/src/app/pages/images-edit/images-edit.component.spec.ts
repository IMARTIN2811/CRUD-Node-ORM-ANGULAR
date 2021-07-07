import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesEditComponent } from './images-edit.component';

describe('ImagesEditComponent', () => {
  let component: ImagesEditComponent;
  let fixture: ComponentFixture<ImagesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
