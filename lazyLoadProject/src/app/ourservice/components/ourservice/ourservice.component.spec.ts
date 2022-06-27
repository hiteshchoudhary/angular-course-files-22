import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurserviceComponent } from './ourservice.component';

describe('OurserviceComponent', () => {
  let component: OurserviceComponent;
  let fixture: ComponentFixture<OurserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
