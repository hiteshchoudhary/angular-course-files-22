import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostComponent } from './addpost.component';

describe('AddpostComponent', () => {
  let component: AddpostComponent;
  let fixture: ComponentFixture<AddpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
