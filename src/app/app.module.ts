import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from "angular2-highcharts/dist/HighchartsService";
import { Uploader }      from 'angular2-http-file-upload';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { AuthGuard } from './auth-guard.service';
import { PermisosGuard } from './permisos.guard';
import { AuthService } from './auth.service';
import { JwtRequestService } from './jwt-request.service';
import { JwtHelper } from 'angular2-jwt';

import { AppRoutingModule }             from './app-routing.module';
import { WildcardRoutingModule } from './wildcard-routing.module';
import { HubModule } from './hub/hub.module';
import { PerfilModule } from './perfil/perfil.module';
import { BloquearPantallaModule } from './bloquear-pantalla/bloquear-pantalla.module';
import { PipesModule }             from './pipes/pipes.module';
import { CrudModule } from './crud/crud.module';

// # Administrador central
import { AdministradorCentralModule } from './administrador-central/administrador-central.module';
import { AsignacionProveedoresPedidosAlternosModule } from './administrador-central/asignacion-proveedores-pedidos-alternos/asignacion-proveedores-pedidos-alternos.module';
import { ValidacionPedidosAlternosModule } from './administrador-central/validacion-pedidos-alternos/validacion-pedidos-alternos.module';

// # Administrador proveedores
import { AdministradorProveedoresModule } from './administrador-proveedores/administrador-proveedores.module';

// # Hub Panel de control
import { UsuariosModule } from './panel-control/usuarios/usuarios.module';
import { RolesModule    } from './panel-control/roles/roles.module';
import { SyncModule     } from './panel-control/sync/sync.module';
import { OpcionesAvanzadasModule  } from './panel-control/opciones-avanzadas/opciones-avanzadas.module';
import { ProgramaPanelModule      } from './panel-control/programa/programa.module';
import { TiposPersonalModule       } from './panel-control/tipo-personal/tipo-personal.module';

// # Hub Configuracion
import { MisAlmacenesModule} from './configuracion/almacenes/almacenes.module';
import { MisServiciosModule} from './configuracion/servicios/servicios.module';
import { MisTurnosModule   } from './configuracion/turnos/turnos.module';
import { MisClavesModule   } from './configuracion/claves/claves.module';
import { MisFirmantesModule} from './configuracion/firmantes/firmantes.module';

// # Hub Farmacia subrrogada
import { IndexFarmaciaSubrrogadaModule } from './farmacia-subrrogada/index-farmacia-subrrogada/index-farmacia-subrrogada.module';
import { SincronizarRecetasModule } from './farmacia-subrrogada/sincronizar-recetas/sincronizar-recetas.module';

// # Hub Farmacia
import { IndexFarmaciaModule    } from './farmacia/index-farmacia/index-farmacia.module';
import { PedidosModule          } from './farmacia/pedidos/pedidos.module';
// import { PedidosJurisdiccionalesModule  } from './farmacia/pedidos-jurisdiccionales/pedidos-jurisdiccionales.module';
import { EntregasModule         } from './farmacia/entregas/entregas.module';
import { EntradasEstandarModule } from './farmacia/entradas-estandar/entradas-estandar.module';
import { SalidasRecetasModule   } from './farmacia/salidas-recetas/salidas-recetas.module';
import { SalidasEstandarModule  } from './farmacia/salidas-estandar/salidas-estandar.module';
import { DashboardSalidasModule } from './farmacia/dashboard-salidas/dashboard-salidas.module';
import { ClavesBasicasModule    } from './administrador-central/claves-basicas/claves-basicas.module';
import { TransferenciaAlmacenModule  } from './farmacia/transferencia-almacen/transferencia-almacen.module';

// # Hub Inventario
import { IndexInventarioModule          } from './inventario/index-inventario/index-inventario.module';
import { InventarioModule               } from './inventario/existencias/inventario.module';
import { InicializacionInventarioModule } from './inventario/inicializacion-inventario/inicializacion-inventario.module';
import { AjusteMasInventarioModule      } from './inventario/ajuste-mas-inventario/ajuste-mas-inventario.module';
import { AjusteMenosInventarioModule    } from './inventario/ajuste-menos-inventario/ajuste-menos-inventario.module';
import { CorreccionesModule             } from './inventario/correcciones/correcciones.module';
import { MovimientosGeneralesModule     }  from './inventario/movimientos-generales/movimientos-generales.module';

// # Hub almacén artículos
import { IndexAlmacenArticulosModule } from './almacen-articulos/index-almacen-articulos/index-almacen-articulos.module';
import { IndexCatalogoModule      } from './almacen-articulos/catalogos/index-catalogo/index-catalogo.module';
// import { ProveedoresModule } from './almacen-articulos/catalogos/proveedores/proveedores.module';

// # Hub laboratorio
import { IndexLaboratorioModule   } from './laboratorio/index-laboratorio/index-laboratorio.module';
import { EntradasLaboratorioModule} from './laboratorio/entradas-laboratorio/entradas-laboratorio.module';
import { SalidasLaboratorioModule } from './laboratorio/salidas-laboratorio/salidas-laboratorio.module';
import { ExistenciasModule        } from './laboratorio/existencias/existencias.module';

// # Hub equipamiento
import { IndexEquipamientoModule } from './equipamiento/index-equipamiento/index-equipamiento.module';

// # Hub avances
import { AvancesModule } from './avances/avances.module';

// #modulo de admisión de pacientes
import { EgresoModule } from './admision/egreso/egreso.module';
import { PacienteModule } from './admision/paciente/paciente.module';

// # Hub Receta Electronica
import { IndexRecetaModule          } from './receta-electronica/index-receta/index-receta.module';

// #Hub Catálogos y parámetros de sistema
import { IndexCatalogoParamsModule } from './catalogos-parametros/index-catalogo-params/index-catalogo-params.module';
import { Almacenes2Module } from './catalogos-parametros/almacenes/almacenes.module';
import { FormaFarmaceuticaModule } from './catalogos-parametros/forma-farmaceutica/forma-farmaceutica.module';
import { GruposInsumosModule     } from './catalogos-parametros/grupos-insumos/grupos-insumos.module';
import { MarcasModule } from './catalogos-parametros/marcas/marcas.module';
import { MaterialCuracionModule  } from './catalogos-parametros/material-curacion/material-curacion.module';
import { MedicamentosModule } from './catalogos-parametros/medicamentos/medicamentos.module';
import { PresentacionMedicamentoModule } from './catalogos-parametros/presentaciones-medicamentos/presentaciones-medicamentos.module';
import { ProgramaModule   } from './catalogos-parametros/programa/programa.module';
import { ProveedoresModule} from './catalogos-parametros/proveedores/proveedores.module';
import { ServiciosModule  } from './catalogos-parametros/servicios/servicios.module';
import { ServidoresModule } from './catalogos-parametros/servidores/servidores.module';
import { TipoPedidoModule } from './catalogos-parametros/tipo-pedido/tipo-pedido.module';
import { TipoPersonalModule } from './catalogos-parametros/tipo-personal/tipo-personal.module';
import { TiposInsumosModule } from './catalogos-parametros/tipos-insumos/tipos-insumos.module';
import { TiposMovimientosModule } from './catalogos-parametros/tipos-movimientos/tipos-movimientos.module';
import { UnidadesMedicasModule  } from './catalogos-parametros/unidades-medicas/unidades-medicas.module';
import { UnidadesMedidaModule   } from './catalogos-parametros/unidades-medida/unidades-medida.module';
import { ViasAdministracionModule } from './catalogos-parametros/vias-administracion/vias-administracion.module';

// Catálogos
import { AlmacenesModule } from './almacen-articulos/catalogos/almacenes/almacenes.module';

import { CategoriasModule } from './almacen-articulos/categoria/categorias.module';
import { ArticulosModule  } from './almacen-articulos/articulos/articulos.module';
import { InventariosModule } from './almacen-articulos/inventarios/inventarios.module';

import { PersonalCluesModule } from './configuracion/personal-clues/personal-clues.module';

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  // return require('highcharts'),require('highcharts/modules/exporting');
  return hc;
}

// Asegurarase que en imports "WildcardRoutingModule" vaya al ÚLTIMO
// Esto nos sirve para redireccionar a una página 404 en lugar de que se genere un error

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    AppRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PipesModule,
    SyncModule,
    OpcionesAvanzadasModule,
    ProgramaPanelModule,
    TiposPersonalModule,
    RolesModule,
    UsuariosModule,
    MisAlmacenesModule,
    MisTurnosModule,
    MisClavesModule,
    MisServiciosModule,
    MisFirmantesModule,
    AdministradorCentralModule,
    AsignacionProveedoresPedidosAlternosModule,
    ValidacionPedidosAlternosModule,
    AdministradorProveedoresModule,
    IndexFarmaciaSubrrogadaModule,
    IndexFarmaciaModule,
    PedidosModule,
    InicializacionInventarioModule,
    //PedidosJurisdiccionalesModule,
    EntregasModule,
    EntradasEstandarModule,
    SalidasEstandarModule,
    TransferenciaAlmacenModule,
    InventarioModule,
    AjusteMasInventarioModule,
    AjusteMenosInventarioModule,
    CorreccionesModule,
    MovimientosGeneralesModule,
    SalidasRecetasModule,
    DashboardSalidasModule,
    ClavesBasicasModule,
    IndexInventarioModule,
    IndexRecetaModule,
    IndexAlmacenArticulosModule,
    IndexCatalogoModule,
    ViasAdministracionModule,
    ServiciosModule,
    GruposInsumosModule,
    PresentacionMedicamentoModule,
    TipoPedidoModule,
    TiposMovimientosModule,
    TiposInsumosModule,
    IndexCatalogoParamsModule,
    FormaFarmaceuticaModule,
    ServidoresModule,
    AlmacenesModule,
    ProveedoresModule,
    MarcasModule,
    PacienteModule,
    ProgramaModule,
    UnidadesMedidaModule,
    UnidadesMedicasModule,
    MaterialCuracionModule,
    MedicamentosModule,
    // ProveedoresModule,
    CategoriasModule,
    ArticulosModule,
    InventariosModule,
    TipoPersonalModule,
    PersonalCluesModule,
    //
    IndexLaboratorioModule,
    EntradasLaboratorioModule,
    SalidasLaboratorioModule,
    ExistenciasModule,
    IndexEquipamientoModule,
    SincronizarRecetasModule,
    // Hub catalogos y parámetros
    Almacenes2Module,
    //CrudModule,
    EgresoModule,
    AvancesModule,
    WildcardRoutingModule, // Este siempre debe ir al final para que no haga conflicto con otras rutas

  ],
  providers: [
    Title,
    AuthGuard,
    PermisosGuard,
    AuthService,
    JwtHelper,
    JwtRequestService,
    Uploader,
    { provide: HighchartsStatic, useFactory: highchartsFactory} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
