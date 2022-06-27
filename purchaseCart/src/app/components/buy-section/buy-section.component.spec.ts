import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySectionComponent } from './buy-section.component';

describe('BuySectionComponent', () => {
  let component: BuySectionComponent;
  let fixture: ComponentFixture<BuySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
