import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRecepcionComponent } from './reporte-recepcion.component';

describe('ReporteRecepcionComponent', () => {
  let component: ReporteRecepcionComponent;
  let fixture: ComponentFixture<ReporteRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
