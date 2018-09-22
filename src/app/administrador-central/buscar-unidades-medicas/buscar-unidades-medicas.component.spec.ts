import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarUnidadesMedicasComponent } from './buscar-unidades-medicas.component';

describe('BuscarUnidadesMedicasComponent', () => {
  let component: BuscarUnidadesMedicasComponent;
  let fixture: ComponentFixture<BuscarUnidadesMedicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarUnidadesMedicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarUnidadesMedicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
