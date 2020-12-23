import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigProductsComponent } from './edit-config-products.component';

describe('EditConfigProductsComponent', () => {
  let component: EditConfigProductsComponent;
  let fixture: ComponentFixture<EditConfigProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConfigProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfigProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
