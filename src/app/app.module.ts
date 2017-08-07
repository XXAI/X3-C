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

// # Administrador central
import { AdministradorCentralModule } from './administrador-central/administrador-central.module';
import { CrudModule } from './crud/crud.module';

// # Administrador proveedores
import { AdministradorProveedoresModule } from './administrador-proveedores/administrador-proveedores.module';

// # Hub Panel de control
import { UsuariosModule } from './panel-control/usuarios/usuarios.module';
import { RolesModule    } from './panel-control/roles/roles.module';
import { SyncModule     } from './panel-control/sync/sync.module';
import { OpcionesAvanzadasModule     } from './panel-control/opciones-avanzadas/opciones-avanzadas.module';

// # Hub Configuracion
import { MisAlmacenesModule} from './configuracion/almacenes/almacenes.module';
import { MisServiciosModule } from './configuracion/servicios/servicios.module';
import { MisTurnosModule   } from './configuracion/turnos/turnos.module';
import { MisClavesModule   } from './configuracion/claves/claves.module';

// # Hub Farmacia subrrogada
import { IndexFarmaciaSubrrogadaModule } from './farmacia-subrrogada/index-farmacia-subrrogada/index-farmacia-subrrogada.module';
import { SincronizarRecetasModule } from './farmacia-subrrogada/sincronizar-recetas/sincronizar-recetas.module';

// # Hub Farmacia
import { IndexFarmaciaModule    } from './farmacia/index-farmacia/index-farmacia.module';
import { PedidosModule          } from './farmacia/pedidos/pedidos.module';
import { PedidosJurisdiccionalesModule  } from './farmacia/pedidos-jurisdiccionales/pedidos-jurisdiccionales.module';
import { EntregasModule         } from './farmacia/entregas/entregas.module';
import { EntradasEstandarModule } from './farmacia/entradas-estandar/entradas-estandar.module';
import { SalidasRecetasModule   } from './farmacia/salidas-recetas/salidas-recetas.module';
import { SalidasEstandarModule  } from './farmacia/salidas-estandar/salidas-estandar.module';
import { InventarioModule       } from './farmacia/inventario/inventario.module';
import { AjusteInventarioModule } from './farmacia/ajuste-inventario/ajuste-inventario.module';
import { DashboardSalidasModule } from './farmacia/dashboard-salidas/dashboard-salidas.module';
import { ClavesBasicasModule    } from './administrador-central/claves-basicas/claves-basicas.module';

// # Hub almacén artículos
import { IndexAlmacenArticulosModule } from './almacen-articulos/index-almacen-articulos/index-almacen-articulos.module';
import { IndexCatalogoModule      } from './almacen-articulos/catalogos/index-catalogo/index-catalogo.module';
import { UnidadesMedicasModule    } from './almacen-articulos/catalogos/unidades-medicas/unidades-medicas.module';
import { ViasAdministracionModule } from './almacen-articulos/catalogos/vias-administracion/vias-administracion.module';
//import { ProveedoresModule } from './almacen-articulos/catalogos/proveedores/proveedores.module';

// # Hub laboratorio
import { IndexLaboratorioModule } from './laboratorio/index-laboratorio/index-laboratorio.module';

// # Hub equipamiento
import { IndexEquipamientoModule } from './equipamiento/index-equipamiento/index-equipamiento.module';

// #modulo de admisión de pacientes
import { EgresoModule } from './admision/egreso/egreso.module';
import { PacienteModule } from './admision/paciente/paciente.module';

//import { CrudModule } from './crud/crud.module';


export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  //return require('highcharts'),require('highcharts/modules/exporting');
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
    RolesModule,
    UsuariosModule,
    MisAlmacenesModule,
    MisTurnosModule,
    MisClavesModule,
    MisServiciosModule,
    AdministradorCentralModule,
    AdministradorProveedoresModule,
    IndexFarmaciaSubrrogadaModule,
    IndexFarmaciaModule,
    PedidosModule,
    PedidosJurisdiccionalesModule,
    EntregasModule,
    EntradasEstandarModule,
    SalidasEstandarModule,
    InventarioModule,
    AjusteInventarioModule,
    SalidasRecetasModule,
    DashboardSalidasModule,
    ClavesBasicasModule,
    IndexAlmacenArticulosModule,
    IndexCatalogoModule,
    UnidadesMedicasModule,
    ViasAdministracionModule,
    //ProveedoresModule,
    IndexLaboratorioModule,
    IndexEquipamientoModule,
    SincronizarRecetasModule,
    //CrudModule,
    PacienteModule,
    EgresoModule,
    WildcardRoutingModule, // Este siempre debe ir al final para que no haga conflicto con otras rutas
    
  ],
  providers: [ Title, AuthGuard, PermisosGuard, AuthService,JwtHelper, JwtRequestService,{provide: HighchartsStatic, useFactory:highchartsFactory}, Uploader],
  bootstrap: [AppComponent]
})
export class AppModule { }

