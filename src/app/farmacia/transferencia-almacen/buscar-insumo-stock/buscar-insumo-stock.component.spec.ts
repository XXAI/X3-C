import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarInsumoStockComponent } from './buscar-insumo-stock.component';

describe('BuscarInsumoStockComponent', () => {
  let component: BuscarInsumoStockComponent;
  let fixture: ComponentFixture<BuscarInsumoStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarInsumoStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarInsumoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
