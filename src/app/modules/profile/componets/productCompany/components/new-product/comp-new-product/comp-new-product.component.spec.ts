import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompNewProductComponent } from './comp-new-product.component';

describe('CompNewProductComponent', () => {
  let component: CompNewProductComponent;
  let fixture: ComponentFixture<CompNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompNewProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
