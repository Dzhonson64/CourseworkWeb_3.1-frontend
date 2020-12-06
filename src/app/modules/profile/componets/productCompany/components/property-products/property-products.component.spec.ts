import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyProductsComponent } from './property-products.component';

describe('PropertyProductsComponent', () => {
  let component: PropertyProductsComponent;
  let fixture: ComponentFixture<PropertyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
