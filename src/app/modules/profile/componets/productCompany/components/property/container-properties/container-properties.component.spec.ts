import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPropertiesComponent } from './container-properties.component';

describe('ContainerPropertiesComponent', () => {
  let component: ContainerPropertiesComponent;
  let fixture: ComponentFixture<ContainerPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
