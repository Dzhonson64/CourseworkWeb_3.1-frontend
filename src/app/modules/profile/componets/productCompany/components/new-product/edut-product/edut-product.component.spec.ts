import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdutProductComponent } from './edut-product.component';

describe('EdutProductComponent', () => {
  let component: EdutProductComponent;
  let fixture: ComponentFixture<EdutProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdutProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
