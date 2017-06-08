import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from "angular2-highcharts/dist/HighchartsService";

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
import { MisAlmacenesModule} from './panel-control/almacenes/almacenes.module';
import { MisServiciosModule} from './panel-control/servicios/servicios.module';
import { MisTurnosModule   } from './panel-control/turnos/turnos.module';
import { MisClavesModule   } from './panel-control/claves/claves.module';

// # Hub Farmacia
import { IndexFarmaciaModule } from './farmacia/index-farmacia/index-farmacia.module';
import { PedidosModule  } from './farmacia/pedidos/pedidos.module';
import { EntregasModule } from './farmacia/entregas/entregas.module';
import { EntradasEstandarModule    } from './farmacia/entradas-estandar/entradas-estandar.module';
import { SalidasRecetasModule    } from './farmacia/salidas-recetas/salidas-recetas.module';
import { SalidasEstandarModule    } from './farmacia/salidas-estandar/salidas-estandar.module';

import { MovimientosEntradasModule    } from './farmacia/movimientos-entradas/movimientos-entradas.module';
import { MovimientosSalidasModule    } from './farmacia/movimientos-salidas/movimientos-salidas.module';
import { DashboardSalidasModule } from './farmacia/dashboard-salidas/dashboard-salidas.module';

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
    RolesModule,
    UsuariosModule,
    MisAlmacenesModule,
    MisServiciosModule,
    MisTurnosModule,
    MisClavesModule,
    AdministradorCentralModule,
    AdministradorProveedoresModule,
    IndexFarmaciaModule,
    PedidosModule,
    EntregasModule,
    EntradasEstandarModule,
    SalidasEstandarModule,
    SalidasRecetasModule,
    MovimientosEntradasModule,
    MovimientosSalidasModule,
    DashboardSalidasModule,
    //CrudModule,
    WildcardRoutingModule, // Este siempre debe ir al final para que no haga conflicto con otras rutas
    
  ],
  providers: [ Title, AuthGuard, PermisosGuard, AuthService,JwtHelper, JwtRequestService,{provide: HighchartsStatic, useFactory:highchartsFactory}],
  bootstrap: [AppComponent]
})
export class AppModule { }

