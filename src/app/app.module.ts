import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { JwtRequestService } from './jwt-request.service';
import { JwtHelper } from 'angular2-jwt';

import { AppRoutingModule }             from './app-routing.module';
import { WildcardRoutingModule } from './wildcard-routing.module';
import { HubModule } from './hub/hub.module';
import { PerfilModule } from './perfil/perfil.module';
import { BloquearPantallaModule } from './bloquear-pantalla/bloquear-pantalla.module';
import { PipesModule }             from './pipes/pipes.module';

import { UsuariosModule } from './panel-control/usuarios/usuarios.module';

// # Hub Farmacia
import { IndexFarmaciaModule } from './farmacia/index-farmacia/index-farmacia.module';
import { PedidosModule  } from './farmacia/pedidos/pedidos.module';
import { EntregasModule } from './farmacia/entregas/entregas.module';

import { MovimientosEntradasModule    } from './farmacia/movimientos-entradas/movimientos-entradas.module';
import { MovimientosSalidasModule    } from './farmacia/movimientos-salidas/movimientos-salidas.module';

import { CrudModule } from './crud/crud.module';




// Asegurarase que en imports "WildcardRoutingModule" vaya al ÚLTIMO
// Esto nos sirve para redireccionar a una página 404 en lugar de que se genere un error

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PipesModule,
    UsuariosModule,
    IndexFarmaciaModule,
    PedidosModule,
    EntregasModule,
    MovimientosEntradasModule,
    MovimientosSalidasModule,
    CrudModule,
    WildcardRoutingModule, // Este siempre debe ir al final para que no haga conflicto con otras rutas
    
  ],
  providers: [ Title, AuthGuard, AuthService,JwtHelper, JwtRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

