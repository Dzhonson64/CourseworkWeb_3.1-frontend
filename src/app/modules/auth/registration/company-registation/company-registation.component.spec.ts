import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistationComponent } from './company-registation.component';

describe('CompanyRegistationComponent', () => {
  let component: CompanyRegistationComponent;
  let fixture: ComponentFixture<CompanyRegistationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRegistationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegistationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
