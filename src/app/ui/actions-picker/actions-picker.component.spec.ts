import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPickerComponent } from './actions-picker.component';

describe('ActionsPickerComponent', () => {
  let component: ActionsPickerComponent;
  let fixture: ComponentFixture<ActionsPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
