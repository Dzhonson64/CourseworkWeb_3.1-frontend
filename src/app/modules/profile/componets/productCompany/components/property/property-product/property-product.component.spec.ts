import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyProductComponent } from './property-product.component';

describe('PropertyProductComponent', () => {
  let component: PropertyProductComponent;
  let fixture: ComponentFixture<PropertyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
