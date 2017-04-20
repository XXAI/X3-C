webpackJsonp([0,3],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_farmacia_routing_module__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hub_hub_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__perfil_perfil_module__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bloquear_pantalla_bloquear_pantalla_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_module__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_farmacia_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__menu_farmacia_component__ = __webpack_require__(616);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexFarmaciaModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var IndexFarmaciaModule = (function () {
    function IndexFarmaciaModule() {
    }
    IndexFarmaciaModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__index_farmacia_routing_module__["a" /* IndexFarmaciaRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_4__hub_hub_module__["a" /* HubModule */],
                __WEBPACK_IMPORTED_MODULE_5__perfil_perfil_module__["a" /* PerfilModule */],
                __WEBPACK_IMPORTED_MODULE_6__bloquear_pantalla_bloquear_pantalla_module__["a" /* BloquearPantallaModule */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_module__["a" /* PipesModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_9__menu_farmacia_component__["a" /* MenuFarmaciaComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_8__index_farmacia_component__["a" /* IndexFarmaciaComponent */], __WEBPACK_IMPORTED_MODULE_9__menu_farmacia_component__["a" /* MenuFarmaciaComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], IndexFarmaciaModule);
    return IndexFarmaciaModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/index-farmacia.module.js.map

/***/ }),

/***/ 1129:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(478);


/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BloquearPantallaService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BloquearPantallaService = (function () {
    function BloquearPantallaService() {
        this.bloquearPantallaSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.pantallaBloqueada$ = this.bloquearPantallaSource.asObservable();
    }
    BloquearPantallaService.prototype.bloquearPantalla = function () {
        localStorage.removeItem('bloquear_pantalla');
        localStorage.setItem('bloquear_pantalla', "true");
        this.bloquearPantallaSource.next(true);
    };
    BloquearPantallaService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], BloquearPantallaService);
    return BloquearPantallaService;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/bloquear-pantalla.service.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntradasService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { Rol } from '../roles/rol';
var EntradasService = (function () {
    function EntradasService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    EntradasService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(EntradasService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(EntradasService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.ver = function (id) {
        return this.jwtRequest.get(EntradasService.URL, id, {}).map(function (response) {
            var jsonData = response.json().data;
            var roles = [];
            jsonData.roles.map(function (item) {
                roles.push("" + item.id);
            });
            var entrada = jsonData;
            entrada.roles = roles;
            return entrada;
        });
    };
    EntradasService.prototype.crear = function (entrada) {
        return this.jwtRequest.post(EntradasService.URL, entrada).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.editar = function (id, entrada) {
        return this.jwtRequest.put(EntradasService.URL, id, entrada).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.eliminar = function (id) {
        return this.jwtRequest.delete(EntradasService.URL, id).map(function (response) { return response.json().data; });
    };
    EntradasService.URL = "entradas";
    EntradasService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], EntradasService);
    return EntradasService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entradas.service.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuariosService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsuariosService = (function () {
    function UsuariosService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    UsuariosService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(UsuariosService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    UsuariosService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(UsuariosService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    UsuariosService.prototype.ver = function (id) {
        return this.jwtRequest.get(UsuariosService.URL, id, {}).map(function (response) {
            var jsonData = response.json().data;
            var roles = [];
            jsonData.roles.map(function (item) {
                roles.push("" + item.id);
            });
            var usuario = jsonData;
            usuario.roles = roles;
            return usuario;
        });
    };
    UsuariosService.prototype.crear = function (usuario) {
        return this.jwtRequest.post(UsuariosService.URL, usuario).map(function (response) { return response.json().data; });
    };
    UsuariosService.prototype.editar = function (id, usuario) {
        return this.jwtRequest.put(UsuariosService.URL, id, usuario).map(function (response) { return response.json().data; });
    };
    UsuariosService.prototype.eliminar = function (id) {
        return this.jwtRequest.delete(UsuariosService.URL, id).map(function (response) { return response.json().data; });
    };
    UsuariosService.URL = "usuarios";
    UsuariosService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], UsuariosService);
    return UsuariosService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/usuarios.service.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buscar_insumos_component__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buscar_insumos_service__ = __webpack_require__(390);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarInsumosModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BuscarInsumosModule = (function () {
    function BuscarInsumosModule() {
    }
    BuscarInsumosModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__paginacion_paginacion_module__["a" /* PaginacionModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__buscar_insumos_component__["a" /* BuscarInsumosComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__buscar_insumos_component__["a" /* BuscarInsumosComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_4__buscar_insumos_service__["a" /* BuscarInsumosService */]]
        }), 
        __metadata('design:paramtypes', [])
    ], BuscarInsumosModule);
    return BuscarInsumosModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/buscar-insumos.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovimientosEntradasService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MovimientosEntradasService = (function () {
    function MovimientosEntradasService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    MovimientosEntradasService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 5; }
        return this.jwtRequest.get(MovimientosEntradasService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    MovimientosEntradasService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 5; }
        return this.jwtRequest.get(MovimientosEntradasService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    //Para listar datos de manera general
    MovimientosEntradasService.prototype.listaDatos = function (url) {
        var urlModel;
        return this.jwtRequest.get(url).map(function (response) { return response.json().data; });
    };
    MovimientosEntradasService.prototype.ver = function (id) {
        return this.jwtRequest.get(MovimientosEntradasService.URL, id, {}).map(function (response) {
            var jsonData = response.json().data;
            var item = jsonData;
            return item;
        });
    };
    MovimientosEntradasService.prototype.editar = function (id, dato) {
        return this.jwtRequest.put(MovimientosEntradasService.URL, id, dato).map(function (response) { return response.json().data; });
    };
    MovimientosEntradasService.prototype.crear = function (movimiento) {
        return this.jwtRequest.post(MovimientosEntradasService.URL, movimiento).map(function (response) { return response.json().data; });
    };
    MovimientosEntradasService.prototype.eliminar = function (id) {
        return this.jwtRequest.delete(MovimientosEntradasService.URL, id).map(function (response) { return response.json().data; });
    };
    MovimientosEntradasService.URL = "movimientos";
    MovimientosEntradasService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], MovimientosEntradasService);
    return MovimientosEntradasService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/movimientos-entradas.service.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Paginacion; });
var Paginacion = (function () {
    function Paginacion() {
        this.lista = [];
        this.paginaActual = 1;
        this.resultadosPorPagina = 5;
        this.totalPaginas = 0;
        this.indice = [];
    }
    return Paginacion;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/paginacion.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RolesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RolesService = (function () {
    function RolesService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    RolesService.prototype.lista = function () {
        return this.jwtRequest.get(RolesService.URL).map(function (response) { return response.json().data; });
    };
    RolesService.URL = "roles";
    RolesService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], RolesService);
    return RolesService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/roles.service.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    API_URL: "http://sialapi.yoursoft.com.mx/public"
};
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/environment.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mensaje; });

var Mensaje = (function () {
    function Mensaje(autodestruccion, cuentaAtras) {
        if (autodestruccion === void 0) { autodestruccion = false; }
        if (cuentaAtras === void 0) { cuentaAtras = 6; }
        this.texto = "";
        this.mostrar = false;
        this.cuentaAtras = 6;
        this.iniciarCuentaAtras = function () {
            var _this = this;
            var finish = __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].timer(7000);
            var timer = __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].timer(0, 1000).takeUntil(finish);
            timer.subscribe(function (t) {
                _this.cuentaAtras -= 1;
                if (_this.cuentaAtras < 0) {
                    _this.cuentaAtras = 6;
                    _this.mostrar = false;
                }
            });
        };
        if (autodestruccion) {
            this.iniciarCuentaAtras();
        }
        this.cuentaAtras = cuentaAtras;
    }
    return Mensaje;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/mensaje.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(title) {
        this.title = title;
        this.usuario = {};
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.title.setTitle("Dashboard");
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(834),
            styles: [__webpack_require__(796)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/dashboard.component.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarInsumosService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BuscarInsumosService = (function () {
    function BuscarInsumosService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    BuscarInsumosService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 25; }
        return this.jwtRequest.get(BuscarInsumosService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    BuscarInsumosService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 25; }
        return this.jwtRequest.get(BuscarInsumosService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    BuscarInsumosService.URL = "catalogo-insumos";
    BuscarInsumosService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], BuscarInsumosService);
    return BuscarInsumosService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/buscar-insumos-movimientos.service.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarInsumosService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BuscarInsumosService = (function () {
    function BuscarInsumosService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    BuscarInsumosService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 25; }
        return this.jwtRequest.get(BuscarInsumosService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    BuscarInsumosService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 25; }
        return this.jwtRequest.get(BuscarInsumosService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    BuscarInsumosService.URL = "catalogo-insumos";
    BuscarInsumosService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], BuscarInsumosService);
    return BuscarInsumosService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/buscar-insumos.service.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__entradas_service__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EditarComponent = (function () {
    // # FIN SECCION
    function EditarComponent(router, title, authService, route, location, 
        //private rolesService: RolesService,
        entradasService, fb) {
        this.router = router;
        this.title = title;
        this.authService = authService;
        this.route = route;
        this.location = location;
        this.entradasService = entradasService;
        this.fb = fb;
        this.entradaRepetido = false;
        this.entradaInvalido = false;
        this.cambiarPassword = false;
        this.cargando = false;
        this.cargandoRoles = false;
        //private roles: Rol[] = [];
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
        this.mensajeAdvertencia = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
    }
    EditarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Editar entrada / Panel de control");
        this.entrada = this.fb.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            apellidos: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            id: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            cambiarPassword: [false, []],
            password: [{ value: '', disabled: true }, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            confirmarPassword: [{ value: '', disabled: true }, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            avatar: ['avatar-circled-user-male'],
            roles: [[1], [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]]
        });
        this.route.params.subscribe(function (params) {
            _this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
            //this.cargarDatos();
        });
        //this.cargarRoles();
    };
    EditarComponent.prototype.toggleCambiarPassword = function () {
        this.cambiarPassword = !this.cambiarPassword;
        if (this.cambiarPassword) {
            this.entrada.get('password').enable();
            this.entrada.get('confirmarPassword').enable();
        }
        else {
            this.entrada.get('password').disable();
            this.entrada.get('confirmarPassword').disable();
        }
    };
    EditarComponent.prototype.enviar = function () {
        var _this = this;
        if (this.entrada.get('password').value != this.entrada.get('confirmarPassword').value) {
            return false;
        }
        this.cargando = true;
        var entrada = this.entrada.value;
        if (!this.cambiarPassword) {
            delete entrada.cambiarPassword;
        }
        this.entradasService.editar(this.id, this.entrada.value).subscribe(function (entrada) {
            _this.cargando = false;
            console.log("Entrada editado.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.texto = "Se han guardado los cambios.";
            _this.mensajeExito.mostrar = true;
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
                // Problema de validación
                if (error.status == 409) {
                    _this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
                    _this.entradaRepetido = false;
                    _this.entradaInvalido = false;
                    for (var input in e.error) {
                        // Iteramos todos los errores
                        for (var i in e.error[input]) {
                            if (input == 'id' && e.error[input][i] == 'unique') {
                                _this.entradaRepetido = true;
                            }
                            if (input == 'id' && e.error[input][i] == 'email') {
                                _this.entradaInvalido = true;
                            }
                        }
                    }
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    EditarComponent.prototype.cargarDatos = function () {
        var _this = this;
        this.cargando = true;
        console.log("Cargando entrada.");
        this.entradasService.ver(this.id).subscribe(function (entrada) {
            _this.cargando = false;
            _this.datosCargados = true;
            _this.entrada.patchValue(entrada);
            console.log("Entrada cargado.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.mostrar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    /*
      cargarRoles() {
        this.cargandoRoles = true;
        this.rolesService.lista().subscribe(
            roles => {
              this.cargandoRoles = false;
              this.roles = roles;
              console.log("Roles cargados.");
    
              if (this.roles.length == 0){
                this.mensajeAdvertencia = new Mensaje(true);
                this.mensajeAdvertencia.texto = `
                No hay roles registrados en el sistema, póngase en contacto con un administrador.`;
                this.mensajeAdvertencia.mostrar = true;
              }
    
              this.cargarDatos();
            },
            error => {
              this.cargandoRoles = false;
              
              this.mensajeError = new Mensaje(true);
              this.mensajeError.texto = "No especificado.";
              this.mensajeError.mostrar = true;
              
              this.cargarDatos();
              
              try {
                let e = error.json();
                if (error.status == 401 ){
                  this.mensajeError.texto = "No tiene permiso para ver los roles.";
                }
    
                if (error.status == 500 ){
                 
                  this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
                }
              } catch(e){
                console.log("No se puede interpretar el error");
                
                if (error.status == 500 ){
                 
                  this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
                } else {
                  this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.  No se pudieron cargar los roles";
                }
              }
              
    
            }
          );
      }*/
    EditarComponent.prototype.regresar = function () {
        this.location.back();
    };
    EditarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-editar',
            template: __webpack_require__(837),
            styles: [__webpack_require__(799)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["b" /* Title */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__entradas_service__["a" /* EntradasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__entradas_service__["a" /* EntradasService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormBuilder */]) === 'function' && _g) || Object])
    ], EditarComponent);
    return EditarComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/editar.component.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__entradas_service__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ListaComponent = (function () {
    // # FIN SECCION
    function ListaComponent(title, entradasService) {
        this.title = title;
        this.entradasService = entradasService;
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        // # SECCION: Lista de entradas
        this.entradas = [];
        this.paginaActual = 1;
        this.resultadosPorPagina = 25;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Resultados de búsqueda
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.resultadosBusqueda = [];
        this.busquedaActivada = false;
        this.paginaActualBusqueda = 1;
        this.resultadosPorPaginaBusqueda = 25;
        this.totalBusqueda = 0;
        this.paginasTotalesBusqueda = 0;
        this.indicePaginasBusqueda = [];
    }
    ListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Entradas / Farmacia");
        this.listar(1);
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            _this.busquedaActivada = term != "" ? true : false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActualBusqueda = 1;
            _this.cargando = true;
            return term ? _this.entradasService.buscar(term, _this.paginaActualBusqueda, _this.resultadosPorPaginaBusqueda) : __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listarBusqueda(self.ultimoTerminoBuscado, self.paginaActualBusqueda); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
    };
    ListaComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
    };
    ListaComponent.prototype.listarBusqueda = function (term, pagina) {
        var _this = this;
        this.paginaActualBusqueda = pagina;
        console.log("Cargando búsqueda.");
        this.cargando = true;
        this.entradasService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () { this.listarBusqueda(term, pagina); };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.listar = function (pagina) {
        var _this = this;
        this.paginaActual = pagina;
        console.log("Cargando entradas.");
        this.cargando = true;
        this.entradasService.lista(pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.entradas = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Entradas cargados.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.eliminar = function (entrada, index) {
        var _this = this;
        entrada.cargando = true;
        this.entradasService.eliminar(entrada.id).subscribe(function (data) {
            entrada.cargando = false;
            _this.entradas.splice(index, 1);
            console.log("Se eliminó el elemento de la lista.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.mostrar = true;
            _this.mensajeExito.texto = "Entrada eliminado";
        }, function (error) {
            entrada.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () {
                this.eliminar(entrada, index);
            };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    // # SECCION: Paginación
    ListaComponent.prototype.paginaSiguiente = function () {
        this.listar(this.paginaActual + 1);
    };
    ListaComponent.prototype.paginaAnterior = function () {
        this.listar(this.paginaActual - 1);
    };
    ListaComponent.prototype.paginaSiguienteBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda + 1);
    };
    ListaComponent.prototype.paginaAnteriorBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda - 1);
    };
    ListaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'entradas-lista',
            template: __webpack_require__(839),
            styles: [__webpack_require__(801)],
            providers: [__WEBPACK_IMPORTED_MODULE_11__entradas_service__["a" /* EntradasService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_11__entradas_service__["a" /* EntradasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__entradas_service__["a" /* EntradasService */]) === 'function' && _b) || Object])
    ], ListaComponent);
    return ListaComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/lista.component.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__entradas_service__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NuevoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NuevoComponent = (function () {
    // # FIN SECCION
    function NuevoComponent(router, title, authService, location, 
        //private rolesService: RolesService,
        entradasService, fb) {
        this.router = router;
        this.title = title;
        this.authService = authService;
        this.location = location;
        this.entradasService = entradasService;
        this.fb = fb;
        this.entradaRepetido = false;
        this.entradaInvalido = false;
        this.cargando = false;
        this.cargandoRoles = false;
        //private roles: Rol[] = [];
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
        this.mensajeAdvertencia = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
    }
    NuevoComponent.prototype.ngOnInit = function () {
        this.title.setTitle("Nuevo entrada / Panel de control");
        //this.cargarRoles();
        this.entrada = this.fb.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            apellidos: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            id: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            confirmarPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            avatar: ['avatar-circled-user-male'],
            roles: [[], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]]
        });
    };
    NuevoComponent.prototype.enviar = function () {
        var _this = this;
        if (this.entrada.get('password').value != this.entrada.get('confirmarPassword').value) {
            return false;
        }
        this.cargando = true;
        this.entradasService.crear(this.entrada.value).subscribe(function (entrada) {
            _this.cargando = false;
            console.log("Usuario creado.");
            _this.location.back();
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
                // Problema de validación
                if (error.status == 409) {
                    _this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
                    _this.entradaRepetido = false;
                    _this.entradaInvalido = false;
                    for (var input in e.error) {
                        // Iteramos todos los errores
                        for (var i in e.error[input]) {
                            if (input == 'id' && e.error[input][i] == 'unique') {
                                _this.entradaRepetido = true;
                            }
                            if (input == 'id' && e.error[input][i] == 'email') {
                                _this.entradaInvalido = true;
                            }
                        }
                    }
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    /*cargarRoles() {
      this.cargandoRoles = true;
      this.rolesService.lista().subscribe(
          roles => {
            this.cargandoRoles = false;
            this.roles = roles;
  
            console.log("Roles cargados.");
  
            if (this.roles.length == 0){
              this.mensajeAdvertencia = new Mensaje(true);
              this.mensajeAdvertencia.texto = `
              No hay roles registrados en el sistema, póngase en contacto con un administrador.`;
              this.mensajeAdvertencia.mostrar = true;
            }
          },
          error => {
            this.cargandoRoles = false;
            
           
            this.mensajeError = new Mensaje(true);
            this.mensajeError.texto = "No especificado.";
            this.mensajeError.mostrar = true;
  
            try {
  
              let e = error.json();
  
              if (error.status == 401 ){
                this.mensajeError.texto = "No tiene permiso para ver los roles.";
              }
  
              if (error.status == 500 ){
               
                this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
              }
            } catch(e){
  
              if (error.status == 500 ){
              
                this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
              } else {
                this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.  No se pudieron cargar los roles";
              }
            }
  
          }
        );
    }
  */
    NuevoComponent.prototype.regresar = function () {
        this.location.back();
    };
    NuevoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-nuevo',
            template: __webpack_require__(840),
            styles: [__webpack_require__(802)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* Title */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__entradas_service__["a" /* EntradasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__entradas_service__["a" /* EntradasService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === 'function' && _f) || Object])
    ], NuevoComponent);
    return NuevoComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/nuevo.component.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__entradas_service__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ListaComponent = (function () {
    // # FIN SECCION
    function ListaComponent(title, pedidosService) {
        this.title = title;
        this.pedidosService = pedidosService;
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        // # SECCION: Lista de usuarios
        this.pedidos = [];
        this.paginaActual = 1;
        this.resultadosPorPagina = 5;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Resultados de búsqueda
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.resultadosBusqueda = [];
        this.busquedaActivada = false;
        this.paginaActualBusqueda = 1;
        this.resultadosPorPaginaBusqueda = 5;
        this.totalBusqueda = 0;
        this.paginasTotalesBusqueda = 0;
        this.indicePaginasBusqueda = [];
    }
    ListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Entradas / Farmacia");
        this.listar(1);
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            _this.busquedaActivada = term != "" ? true : false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActualBusqueda = 1;
            _this.cargando = true;
            return term ? _this.pedidosService.buscar(term, _this.paginaActualBusqueda, _this.resultadosPorPaginaBusqueda) : __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listarBusqueda(self.ultimoTerminoBuscado, self.paginaActualBusqueda); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
    };
    ListaComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
    };
    ListaComponent.prototype.listarBusqueda = function (term, pagina) {
        var _this = this;
        this.paginaActualBusqueda = pagina;
        console.log("Cargando búsqueda.");
        this.cargando = true;
        this.pedidosService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () { this.listarBusqueda(term, pagina); };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.listar = function (pagina) {
        var _this = this;
        this.paginaActual = pagina;
        console.log("Cargando usuarios.");
        this.cargando = true;
        this.pedidosService.lista(pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.pedidos = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Usuarios cargados.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.eliminar = function (pedido, index) {
        var _this = this;
        pedido.cargando = true;
        this.pedidosService.eliminar(pedido.id).subscribe(function (data) {
            pedido.cargando = false;
            _this.pedidos.splice(index, 1);
            console.log("Se eliminó el elemento de la lista.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.mostrar = true;
            _this.mensajeExito.texto = "Usuario eliminado";
        }, function (error) {
            pedido.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () {
                this.eliminar(pedido, index);
            };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    // # SECCION: Paginación
    ListaComponent.prototype.paginaSiguiente = function () {
        this.listar(this.paginaActual + 1);
    };
    ListaComponent.prototype.paginaAnterior = function () {
        this.listar(this.paginaActual - 1);
    };
    ListaComponent.prototype.paginaSiguienteBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda + 1);
    };
    ListaComponent.prototype.paginaAnteriorBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda - 1);
    };
    ListaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'farmacia-entradas-lista',
            template: __webpack_require__(841),
            styles: [__webpack_require__(803)],
            providers: [__WEBPACK_IMPORTED_MODULE_11__entradas_service__["a" /* EntradasService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_11__entradas_service__["a" /* EntradasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__entradas_service__["a" /* EntradasService */]) === 'function' && _b) || Object])
    ], ListaComponent);
    return ListaComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/lista.component.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_file_saver__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mensaje__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__entrada__ = __webpack_require__(606);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NuevoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var NuevoComponent = (function () {
    // # FIN SECCION
    function NuevoComponent(title, location, _ngZone) {
        this.title = title;
        this.location = location;
        this._ngZone = _ngZone;
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_11__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_11__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION  
        // # SECCION: Modal Insumos
        this.mostrarModalInsumos = false;
        //Harima: Lista de claves agregadas al entrada, para checar duplicidad
        this.listaClaveAgregadas = [];
        // # FIN SECCION
        // # SECCION: Entrada
        // Los entradas tienen que ser en un array por si se va a generar mas de un entrada de golpe
        this.entradas = [];
        // esta variable es para saber el entrada seleccionado (por si hay mas)
        this.entradaActivo = 0;
        this.cargandoPdf = false;
    }
    NuevoComponent.prototype.ngOnInit = function () {
        this.title.setTitle('Nuevo entrada / Farmacia');
        // Inicializamos el objeto para los reportes con web Webworkers
        this.pdfworker = new Worker("web-workers/farmacia/entradas/imprimir.js");
        // Este es un hack para poder usar variables del componente dentro de una funcion del worker
        var self = this;
        var $ngZone = this._ngZone;
        this.pdfworker.onmessage = function (evt) {
            // Esto es un hack porque estamos fuera de contexto dentro del worker
            // Y se usa esto para actualizar alginas variables
            $ngZone.run(function () {
                self.cargandoPdf = false;
            });
            __WEBPACK_IMPORTED_MODULE_10_file_saver__["saveAs"](self.base64ToBlob(evt.data.base64, 'application/pdf'), evt.data.fileName);
            //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
        };
        this.pdfworker.onerror = function (e) {
            $ngZone.run(function () {
                self.cargandoPdf = false;
            });
            console.log(e);
        };
        // Inicialicemos el entrada
        this.entradas.push(new __WEBPACK_IMPORTED_MODULE_12__entrada__["a" /* Entrada */](true));
        this.entradas[0].nombre = "General";
        this.entradas[0].observaciones = null;
    };
    NuevoComponent.prototype.regresar = function () {
        this.location.back();
    };
    NuevoComponent.prototype.toggleModalInsumos = function () {
        //console.log(this.mostrarModalInsumos)
        this.mostrarModalInsumos = !this.mostrarModalInsumos;
        //console.log(this.mostrarModalInsumos)
    };
    // # SECCION Funciones globales
    NuevoComponent.prototype.agregarItem = function (item) {
        if (item === void 0) { item = {}; }
        var auxPaginasTotales = this.entradas[this.entradaActivo].paginacion.totalPaginas;
        this.entradas[this.entradaActivo].lista.push(item);
        this.entradas[this.entradaActivo].indexar();
        // El siguiente proceso es para cambiar de página automáticamente si se encuentra en la última.
        if (this.entradas[this.entradaActivo].paginacion.lista.length == this.entradas[this.entradaActivo].paginacion.resultadosPorPagina
            && this.entradas[this.entradaActivo].paginacion.paginaActual == auxPaginasTotales
            && !this.entradas[this.entradaActivo].filtro.activo) {
            this.entradas[this.entradaActivo].listar(this.entradas[this.entradaActivo].paginacion.paginaActual + 1);
        }
        else {
            this.entradas[this.entradaActivo].listar(this.entradas[this.entradaActivo].paginacion.paginaActual);
        }
    };
    NuevoComponent.prototype.buscar = function (e, input, inputAnterior, parametros) {
        var term = input.value;
        // Quitamos la busqueda
        if (e.keyCode == 27) {
            e.preventDefault();
            e.stopPropagation();
            input.value = "";
            inputAnterior.value = "";
            this.entradas[this.entradaActivo].filtro.activo = false;
            this.entradas[this.entradaActivo].filtro.lista = [];
            return;
        }
        //Verificamos que la busqueda no sea la misma que la anterior para no filtrar en vano
        if (inputAnterior.value == term) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        inputAnterior.value = term;
        if (term != "") {
            this.entradas[this.entradaActivo].filtro.activo = true;
        }
        else {
            this.entradas[this.entradaActivo].filtro.activo = false;
            this.entradas[this.entradaActivo].filtro.lista = [];
            return;
        }
        var arregloResultados = [];
        var _loop_1 = function(i) {
            var termino = parametros[i].input.value;
            if (termino == "") {
                return "continue";
            }
            var listaFiltrada = this_1.entradas[this_1.entradaActivo].lista.filter(function (item) {
                var cadena = "";
                var campos = parametros[i].campos;
                for (var l in campos) {
                    try {
                        // Esto es por si escribieron algo como "objeto.propiedad" en lugar de: "propiedad"
                        var prop = campos[l].split(".");
                        if (prop.length > 1) {
                            cadena += " " + item[prop[0]][prop[1]].toLowerCase();
                        }
                        else {
                            cadena += " " + item[campos[l]].toLowerCase();
                        }
                    }
                    catch (e) { }
                }
                return cadena.includes(termino.toLowerCase());
            });
            arregloResultados.push(listaFiltrada);
        };
        var this_1 = this;
        for (var i in parametros) {
            _loop_1(i);
        }
        if (arregloResultados.length > 1) {
            // Ordenamos Ascendente
            arregloResultados = arregloResultados.sort(function (a, b) { return a.length - b.length; });
            var filtro = arregloResultados[0];
            var match = [];
            for (var k = 1; k < arregloResultados.length; k++) {
                for (var i in arregloResultados[k]) {
                    for (var j in filtro) {
                        if (arregloResultados[k][i] === filtro[j]) {
                            match.push(filtro[j]);
                        }
                    }
                }
                ;
            }
            this.entradas[this.entradaActivo].filtro.lista = match;
        }
        else {
            this.entradas[this.entradaActivo].filtro.lista = arregloResultados[0];
        }
        this.entradas[this.entradaActivo].filtro.indexar(false);
        this.entradas[this.entradaActivo].filtro.paginacion.paginaActual = 1;
        this.entradas[this.entradaActivo].filtro.listar(1);
    };
    //Harima: necesitamos eliminar también de la lista de claves agregadas
    NuevoComponent.prototype.eliminarInsumo = function (item, index, filtro) {
        if (filtro === void 0) { filtro = false; }
        //Harima: eliminar el elemento en la lista de claves agregadas, para poder agregarla de nuevo si se desea
        var i = this.listaClaveAgregadas.indexOf(item.clave);
        this.listaClaveAgregadas.splice(i, 1);
        //Harima: si no es el filtro(busqueda), borrar de la lista principal de insumos
        if (!filtro) {
            this.entradas[this.entradaActivo].eliminarItem(item, index);
        }
        else {
            this.entradas[this.entradaActivo].filtro.eliminarItem(item, index);
        }
    };
    NuevoComponent.prototype.mostrarFichaInformativa = function (e, clave) {
        e.preventDefault();
        e.stopPropagation();
        // Mostrar el componente de Ficha Informativa
        // Falta hacerlo sumamiiiii :)
        alert(clave);
        console.log(clave);
    };
    // # SECCION: Eventos del teclado
    NuevoComponent.prototype.keyboardInput = function (e) {
        if (e.keyCode == 32 && e.ctrlKey) {
            event.preventDefault();
            event.stopPropagation();
            this.mostrarModalInsumos = true;
        }
        // Cambiar página hacia adelante ctrl + shift + ->
        if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.entradas[this.entradaActivo].filtro.activo) {
                this.entradas[this.entradaActivo].paginaSiguiente();
            }
            else {
                this.entradas[this.entradaActivo].filtro.paginaSiguiente();
            }
        }
        // Cambiar página hacia adelante ctrl + shift + <-
        if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.entradas[this.entradaActivo].filtro.activo) {
                this.entradas[this.entradaActivo].paginaAnterior();
            }
            else {
                this.entradas[this.entradaActivo].filtro.paginaAnterior();
            }
        }
    };
    // # SECCION - Webworkers
    NuevoComponent.prototype.imprimir = function () {
        try {
            this.cargandoPdf = true;
            var entradas_imprimir = {
                datos: { alamcen: 'colicitar', solicitante: 'unidad', observaciones: 'texto' },
                lista: this.entradas[this.entradaActivo].lista
            };
            this.pdfworker.postMessage(JSON.stringify(entradas_imprimir));
        }
        catch (e) {
            this.cargandoPdf = false;
            console.log(e);
        }
    };
    NuevoComponent.prototype.base64ToBlob = function (base64, type) {
        var bytes = atob(base64), len = bytes.length;
        var buffer = new ArrayBuffer(len), view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++)
            view[i] = bytes.charCodeAt(i) & 0xff;
        return new Blob([buffer], { type: type });
    };
    NuevoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-nuevo',
            template: __webpack_require__(843),
            styles: [__webpack_require__(805)],
            host: { '(window:keydown)': 'keyboardInput($event)' }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* Location */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _c) || Object])
    ], NuevoComponent);
    return NuevoComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/nuevo.component.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__entregas_service__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ListaComponent = (function () {
    // # FIN SECCION
    function ListaComponent(title, entregasService) {
        this.title = title;
        this.entregasService = entregasService;
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        // # SECCION: Lista de usuarios
        this.pedidos = [];
        this.paginaActual = 1;
        this.resultadosPorPagina = 5;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Resultados de búsqueda
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.resultadosBusqueda = [];
        this.busquedaActivada = false;
        this.paginaActualBusqueda = 1;
        this.resultadosPorPaginaBusqueda = 5;
        this.totalBusqueda = 0;
        this.paginasTotalesBusqueda = 0;
        this.indicePaginasBusqueda = [];
    }
    ListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Entregas / Farmacia");
        this.listar(1);
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            _this.busquedaActivada = term != "" ? true : false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActualBusqueda = 1;
            _this.cargando = true;
            return term ? _this.entregasService.buscar(term, _this.paginaActualBusqueda, _this.resultadosPorPaginaBusqueda) : __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listarBusqueda(self.ultimoTerminoBuscado, self.paginaActualBusqueda); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
    };
    ListaComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
    };
    ListaComponent.prototype.listarBusqueda = function (term, pagina) {
        var _this = this;
        this.paginaActualBusqueda = pagina;
        console.log("Cargando búsqueda.");
        this.cargando = true;
        this.entregasService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () { this.listarBusqueda(term, pagina); };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.listar = function (pagina) {
        var _this = this;
        this.paginaActual = pagina;
        console.log("Cargando usuarios.");
        this.cargando = true;
        this.entregasService.lista(pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.pedidos = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Pedidos cargados.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    // # SECCION: Paginación
    ListaComponent.prototype.paginaSiguiente = function () {
        this.listar(this.paginaActual + 1);
    };
    ListaComponent.prototype.paginaAnterior = function () {
        this.listar(this.paginaActual - 1);
    };
    ListaComponent.prototype.paginaSiguienteBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda + 1);
    };
    ListaComponent.prototype.paginaAnteriorBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda - 1);
    };
    ListaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'farmacia-entregas-lista',
            template: __webpack_require__(844),
            styles: [__webpack_require__(806)],
            providers: [__WEBPACK_IMPORTED_MODULE_11__entregas_service__["a" /* EntregasService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_11__entregas_service__["a" /* EntregasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__entregas_service__["a" /* EntregasService */]) === 'function' && _b) || Object])
    ], ListaComponent);
    return ListaComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/lista.component.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexFarmaciaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IndexFarmaciaComponent = (function () {
    function IndexFarmaciaComponent(title) {
        this.title = title;
        this.usuario = {};
        this.busqueda = "";
        this.modulos = [];
        this.accesosDirectos = [];
    }
    IndexFarmaciaComponent.prototype.ngOnInit = function () {
        this.title.setTitle("Farmacia");
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.modulos = [
            { permiso: '', icono: 'assets/icono-entradas.svg', titulo: "Entradas", url: "/farmacia/entradas" },
            { permiso: '', icono: 'assets/icono-entradas.svg', titulo: "Entradas V2", url: "/farmacia/entradas/v2" },
            { permiso: '', icono: 'assets/icono-entradas.svg', titulo: "Movimientos/entradas", url: "/farmacia/movimientos/entradas" },
            { permiso: '', icono: 'assets/icono-salidas.svg', titulo: "Salidas", url: "/farmacia/salidas" },
            { permiso: '', icono: 'assets/hub-almacen.svg', titulo: "Inventario", url: "/farmacia/inventario" },
            { permiso: '', icono: 'assets/icono-ajustes-inventario.svg', titulo: "Ajustes de inventario", url: "/farmacia/inventario/ajustes" },
            { permiso: '', icono: 'assets/icono-recetas.svg', titulo: "Recetas", url: "/farmacia/recetas" },
            { permiso: '', icono: 'assets/icono-colectivo.svg', titulo: "Colectivos", url: "/farmacia/colectivos" },
            { permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo: "Pedidos", url: "/farmacia/pedidos", badge: 1 },
            { permiso: '', icono: 'assets/icono-pedidos-alt.svg', titulo: "Entregas de pedidos", url: "/farmacia/entregas" },
            { permiso: '', icono: 'assets/icono-camion.svg', titulo: "Reabastecimiento", url: "/farmacia/pedidos-reabastecimiento" },
            { permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo: "Actas por desabasto", url: "/farmacia/actas" },
            { permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo: "Actas colectivas por desabasto", url: "/farmacia/actas-colectivas" },
        ];
        this.accesosDirectos = [
            { permiso: '', icono: 'assets/icono-receta.svg', titulo: "Nueva receta", url: "/farmacia/recetas/nueva" },
            { permiso: '', icono: 'assets/icono-colectivo.svg', titulo: "Nuevo colectivo", url: "/farmacia/colectivos/nuevo" },
            { permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo: "Nuevo pedido", url: "/farmacia/pedidos/nuevo" },
            { permiso: '', icono: 'assets/icono-pedidos-alt.svg', titulo: "Recibir pedido", url: "/farmacia/pedidos/recepcion" },
            { permiso: '', icono: 'assets/icono-entradas.svg', titulo: "Nueva entrada", url: "/farmacia/entradas/nueva" },
            { permiso: '', icono: 'assets/icono-salidas.svg', titulo: "Nueva salida", url: "/farmacia/salida/nueva" },
        ];
    };
    IndexFarmaciaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-index-farmacia',
            template: __webpack_require__(846),
            styles: [__webpack_require__(808)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object])
    ], IndexFarmaciaComponent);
    return IndexFarmaciaComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/index-farmacia.component.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__movimientos_entradas_service__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var ListaComponent = (function () {
    // # FIN SECCION
    function ListaComponent(title, movimientosEntradasService, fb) {
        this.title = title;
        this.movimientosEntradasService = movimientosEntradasService;
        this.fb = fb;
        this.cargando = false;
        this.mostrarModalCancelado = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_13__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_13__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        // # SECCION: Lista de Modelos, hay que CAMBIAR a movimientos
        this.items = [];
        this.paginaActual = 1;
        this.resultadosPorPagina = 5;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Resultados de búsqueda
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.resultadosBusqueda = [];
        this.busquedaActivada = false;
        this.paginaActualBusqueda = 1;
        this.resultadosPorPaginaBusqueda = 5;
        this.totalBusqueda = 0;
        this.paginasTotalesBusqueda = 0;
        this.indicePaginasBusqueda = [];
    }
    ListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Entradas / Farmacia");
        this.listar(1);
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_13__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_13__mensaje__["a" /* Mensaje */]();
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            _this.busquedaActivada = term != "" ? true : false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActualBusqueda = 1;
            _this.cargando = true;
            return term ? _this.movimientosEntradasService.buscar(term, _this.paginaActualBusqueda, _this.resultadosPorPaginaBusqueda) : __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listarBusqueda(self.ultimoTerminoBuscado, self.paginaActualBusqueda); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
        this.movimiento = this.fb.group({
            almacen_id: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            tipo_movimiento_id: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            fecha_movimiento: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            observaciones: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            cancelado: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            observaciones_cancelacion: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            insumos: this.fb.array([
                this.initInsumo(),
            ])
        });
    }; //Fin ngOnInit
    ListaComponent.prototype.initInsumo = function () {
        return this.fb.group({
            clave: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            cantidad: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            cantidad_x_envase: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            lote: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            fecha_caducidad: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            codigo_barras: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
        });
    };
    ListaComponent.prototype.toggleModalCancelado = function (item, index) {
        this.mostrarModalCancelado = !this.mostrarModalCancelado;
        this.dato = item;
        this.index = index;
    };
    ListaComponent.prototype.guardar = function (item) {
        var _this = this;
        console.log(item);
        item.cancelado = 1;
        this.movimientosEntradasService.editar(item.id, item).subscribe(function (movimiento) {
            _this.cargando = false;
            console.log("Movimiento editado.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_13__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.texto = "Se han guardado los cambios.";
            _this.mensajeExito.mostrar = true;
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_13__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
    };
    ListaComponent.prototype.listarBusqueda = function (term, pagina) {
        var _this = this;
        this.paginaActualBusqueda = pagina;
        console.log("Cargando búsqueda.");
        this.cargando = true;
        this.movimientosEntradasService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () { this.listarBusqueda(term, pagina); };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    }; //Fin listarBusqueda
    ListaComponent.prototype.listar = function (pagina) {
        var _this = this;
        this.paginaActual = pagina;
        console.log("Cargando usuarios.");
        this.cargando = true;
        //Peticion a la API
        this.movimientosEntradasService.lista(pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.items = resultado.data;
            console.log(_this.items);
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Items cargados.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    }; //Fin listar
    ListaComponent.prototype.eliminar = function (item, index) {
        var _this = this;
        item.cargando = true;
        this.movimientosEntradasService.eliminar(item.id).subscribe(function (data) {
            item.cargando = false;
            _this.items.splice(index, 1);
            console.log("Se eliminó el elemento de la lista.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_13__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.mostrar = true;
            _this.mensajeExito.texto = "Usuario eliminado";
        }, function (error) {
            item.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () {
                this.eliminar(item, index);
            };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    }; //Fin eliminar
    // # SECCION: Paginación
    ListaComponent.prototype.paginaSiguiente = function () {
        this.listar(this.paginaActual + 1);
    };
    ListaComponent.prototype.paginaAnterior = function () {
        this.listar(this.paginaActual - 1);
    };
    ListaComponent.prototype.paginaSiguienteBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda + 1);
    };
    ListaComponent.prototype.paginaAnteriorBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda - 1);
    };
    ListaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'farmacia-entradas-lista',
            template: __webpack_require__(851),
            styles: [__webpack_require__(811)],
            providers: [__WEBPACK_IMPORTED_MODULE_12__movimientos_entradas_service__["a" /* MovimientosEntradasService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_12__movimientos_entradas_service__["a" /* MovimientosEntradasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_12__movimientos_entradas_service__["a" /* MovimientosEntradasService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === 'function' && _c) || Object])
    ], ListaComponent);
    return ListaComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/lista.component.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__movimientos_entradas_service__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NuevoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NuevoComponent = (function () {
    function NuevoComponent(router, title, authService, location, movimientosEntradasService, fb) {
        this.router = router;
        this.title = title;
        this.authService = authService;
        this.location = location;
        this.movimientosEntradasService = movimientosEntradasService;
        this.fb = fb;
        this.movimientoRepetido = false;
        this.movimientoInvalido = false;
        this.cargando = false;
        this.cargandoDatos = false;
        this.almacenes = {};
        this.usuario = {};
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
        this.mensajeAdvertencia = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        this.insumosNuevo = [];
    }
    NuevoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Nuevo movimiento / Farmacia");
        /**/
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        //console.log(this.usuario);
        //console.log("*****************");
        this.movimientosEntradasService.listaDatos("almacenes").subscribe(function (datos) {
            _this.datos = datos;
            for (var _i = 0, _a = _this.datos; _i < _a.length; _i++) {
                var data = _a[_i];
                //console.log(data.almacen_usuarios.length); 
                for (var _b = 0, _c = data.almacen_usuarios; _b < _c.length; _b++) {
                    var almacen_usuario = _c[_b];
                    if (almacen_usuario.usuario_id == _this.usuario.id) {
                        //console.log("NUEVO  nuevo.component.ts"); 
                        //console.log(almacen_usuario.usuario_id);
                        //console.log(almacen_usuario.servidor_id);
                        _this.movimiento.value.almacen_id = almacen_usuario.servidor_id;
                        _this.servidorId = almacen_usuario.almacen_id;
                        //console.log("SERVIDOR ID-------------------------------------");
                        //console.log(this.servidorId);
                        _this.movimiento.patchValue({ almacen_id: _this.servidorId });
                        _this.movimiento.patchValue({ cancelado: false });
                    }
                }
            }
            console.log(_this.datos);
        }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
        /**************************** */
        this.movimiento = this.fb.group({
            almacen_id: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            tipo_movimiento_id: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            fecha_movimiento: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            observaciones: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            cancelado: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            observaciones_cancelacion: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            insumos: this.fb.array([
                this.initInsumo(),
            ])
        });
    };
    NuevoComponent.prototype.initInsumo = function () {
        return this.fb.group({
            clave: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            cantidad: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            cantidad_x_envase: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            lote: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            fecha_caducidad: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            codigo_barras: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
        });
    };
    NuevoComponent.prototype.enviar = function (insumosAgregadosForm) {
        var _this = this;
        this.cargando = true;
        console.log("insumos" + insumosAgregadosForm);
        this.movimiento.value.insumos = insumosAgregadosForm;
        console.log(this.movimiento.value);
        this.movimientosEntradasService.crear(this.movimiento.value).subscribe(function (movimiento) {
            _this.cargando = false;
            console.log("movimiento creado.");
            _this.location.back();
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_7__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
                // Problema de validación
                if (error.status == 409) {
                    _this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
                    _this.movimientoRepetido = false;
                    _this.movimientoInvalido = false;
                    for (var input in e.error) {
                        // Iteramos todos los errores
                        for (var i in e.error[input]) {
                            if (input == 'id' && e.error[input][i] == 'unique') {
                                _this.movimientoRepetido = true;
                            }
                            if (input == 'id' && e.error[input][i] == 'email') {
                                _this.movimientoInvalido = true;
                            }
                        }
                    }
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    NuevoComponent.prototype.regresar = function () {
        this.location.back();
    };
    NuevoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-nuevo',
            template: __webpack_require__(852),
            styles: [__webpack_require__(812)],
            providers: [__WEBPACK_IMPORTED_MODULE_6__movimientos_entradas_service__["a" /* MovimientosEntradasService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* Title */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__movimientos_entradas_service__["a" /* MovimientosEntradasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__movimientos_entradas_service__["a" /* MovimientosEntradasService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === 'function' && _f) || Object])
    ], NuevoComponent);
    return NuevoComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/nuevo.component.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(270);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
    }
    AuthService.prototype.login = function (id, password) {
        var url = 'obtener-token';
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].API_URL + "/" + url, JSON.stringify({ id: id, password: password }), { headers: this.headers }).map(function (response) {
            var json = response.json();
            if (json.token) {
                console.log("Token obtenido.");
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                localStorage.removeItem('server_info');
                localStorage.setItem('token', json.token);
                localStorage.setItem('usuario', JSON.stringify(json.usuario));
                localStorage.setItem('server_info', JSON.stringify(json.server_info));
            }
        });
    };
    AuthService.prototype.refreshToken = function () {
        var url = 'refresh-token?token=' + localStorage.getItem('token');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].API_URL + "/" + url, {}, { headers: this.headers }).map(function (response) {
            var json = response.json();
            if (json.token) {
                console.log("Token renovado.");
                localStorage.removeItem('token');
                localStorage.removeItem('server_info');
                localStorage.setItem('token', json.token);
                localStorage.setItem('server_info', JSON.stringify(json.server_info));
            }
        });
    };
    AuthService.prototype.logout = function (url) {
        if (url === void 0) { url = null; }
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('server_info');
        if (url != null) {
            this.router.navigate(['login'], { queryParams: { returnUrl: decodeURIComponent(url.replace(/\+/g, " ")) } });
        }
        else {
            this.router.navigate(['login']);
        }
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/auth.service.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pedidos_service__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ListaComponent = (function () {
    // # FIN SECCION
    function ListaComponent(title, pedidosService) {
        this.title = title;
        this.pedidosService = pedidosService;
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        // # SECCION: Lista de usuarios
        this.pedidos = [];
        this.paginaActual = 1;
        this.resultadosPorPagina = 5;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Resultados de búsqueda
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.resultadosBusqueda = [];
        this.busquedaActivada = false;
        this.paginaActualBusqueda = 1;
        this.resultadosPorPaginaBusqueda = 5;
        this.totalBusqueda = 0;
        this.paginasTotalesBusqueda = 0;
        this.indicePaginasBusqueda = [];
    }
    ListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Pedidos / Farmacia");
        this.listar(1);
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            _this.busquedaActivada = term != "" ? true : false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActualBusqueda = 1;
            _this.cargando = true;
            return term ? _this.pedidosService.buscar(term, _this.paginaActualBusqueda, _this.resultadosPorPaginaBusqueda) : __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listarBusqueda(self.ultimoTerminoBuscado, self.paginaActualBusqueda); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
    }; //Fin ngOnInit
    ListaComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
    };
    ListaComponent.prototype.listarBusqueda = function (term, pagina) {
        var _this = this;
        this.paginaActualBusqueda = pagina;
        console.log("Cargando búsqueda.");
        this.cargando = true;
        this.pedidosService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () { this.listarBusqueda(term, pagina); };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.listar = function (pagina) {
        var _this = this;
        this.paginaActual = pagina;
        console.log("Cargando usuarios.");
        this.cargando = true;
        this.pedidosService.lista(pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.pedidos = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Usuarios cargados.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.eliminar = function (pedido, index) {
        var _this = this;
        pedido.cargando = true;
        this.pedidosService.eliminar(pedido.id).subscribe(function (data) {
            pedido.cargando = false;
            _this.pedidos.splice(index, 1);
            console.log("Se eliminó el elemento de la lista.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.mostrar = true;
            _this.mensajeExito.texto = "Usuario eliminado";
        }, function (error) {
            pedido.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () {
                this.eliminar(pedido, index);
            };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    // # SECCION: Paginación
    ListaComponent.prototype.paginaSiguiente = function () {
        this.listar(this.paginaActual + 1);
    };
    ListaComponent.prototype.paginaAnterior = function () {
        this.listar(this.paginaActual - 1);
    };
    ListaComponent.prototype.paginaSiguienteBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda + 1);
    };
    ListaComponent.prototype.paginaAnteriorBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda - 1);
    };
    ListaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'farmacia-pedidos-lista',
            template: __webpack_require__(853),
            styles: [__webpack_require__(813)],
            providers: [__WEBPACK_IMPORTED_MODULE_11__pedidos_service__["a" /* PedidosService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_11__pedidos_service__["a" /* PedidosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__pedidos_service__["a" /* PedidosService */]) === 'function' && _b) || Object])
    ], ListaComponent);
    return ListaComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/lista.component.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_file_saver__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mensaje__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pedido__ = __webpack_require__(625);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NuevoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var NuevoComponent = (function () {
    // # FIN SECCION
    function NuevoComponent(title, location, _ngZone) {
        this.title = title;
        this.location = location;
        this._ngZone = _ngZone;
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_11__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_11__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION  
        // # SECCION: Modal Insumos
        this.mostrarModalInsumos = false;
        //Harima: Lista de claves agregadas al pedido, para checar duplicidad
        this.listaClaveAgregadas = [];
        // # FIN SECCION
        // # SECCION: Pedido
        // Los pedidos tienen que ser en un array por si se va a generar mas de un pedido de golpe
        this.pedidos = [];
        // esta variable es para saber el pedido seleccionado (por si hay mas)
        this.pedidoActivo = 0;
        this.cargandoPdf = false;
    }
    NuevoComponent.prototype.ngOnInit = function () {
        this.title.setTitle('Nuevo pedido / Farmacia');
        // Inicializamos el objeto para los reportes con web Webworkers
        this.pdfworker = new Worker("web-workers/farmacia/pedidos/imprimir.js");
        // Este es un hack para poder usar variables del componente dentro de una funcion del worker
        var self = this;
        var $ngZone = this._ngZone;
        this.pdfworker.onmessage = function (evt) {
            // Esto es un hack porque estamos fuera de contexto dentro del worker
            // Y se usa esto para actualizar alginas variables
            $ngZone.run(function () {
                self.cargandoPdf = false;
            });
            __WEBPACK_IMPORTED_MODULE_10_file_saver__["saveAs"](self.base64ToBlob(evt.data.base64, 'application/pdf'), evt.data.fileName);
            //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
        };
        this.pdfworker.onerror = function (e) {
            $ngZone.run(function () {
                self.cargandoPdf = false;
            });
            console.log(e);
        };
        // Inicialicemos el pedido
        this.pedidos.push(new __WEBPACK_IMPORTED_MODULE_12__pedido__["a" /* Pedido */](true));
        this.pedidos[0].nombre = "General";
        this.pedidos[0].observaciones = null;
    };
    NuevoComponent.prototype.regresar = function () {
        this.location.back();
    };
    NuevoComponent.prototype.toggleModalInsumos = function () {
        //console.log(this.mostrarModalInsumos)
        this.mostrarModalInsumos = !this.mostrarModalInsumos;
        //console.log(this.mostrarModalInsumos)
    };
    // # SECCION Funciones globales
    NuevoComponent.prototype.agregarItem = function (item) {
        if (item === void 0) { item = {}; }
        var auxPaginasTotales = this.pedidos[this.pedidoActivo].paginacion.totalPaginas;
        this.pedidos[this.pedidoActivo].lista.push(item);
        this.pedidos[this.pedidoActivo].indexar();
        // El siguiente proceso es para cambiar de página automáticamente si se encuentra en la última.
        if (this.pedidos[this.pedidoActivo].paginacion.lista.length == this.pedidos[this.pedidoActivo].paginacion.resultadosPorPagina
            && this.pedidos[this.pedidoActivo].paginacion.paginaActual == auxPaginasTotales
            && !this.pedidos[this.pedidoActivo].filtro.activo) {
            this.pedidos[this.pedidoActivo].listar(this.pedidos[this.pedidoActivo].paginacion.paginaActual + 1);
        }
        else {
            this.pedidos[this.pedidoActivo].listar(this.pedidos[this.pedidoActivo].paginacion.paginaActual);
        }
    };
    NuevoComponent.prototype.buscar = function (e, input, inputAnterior, parametros) {
        var term = input.value;
        // Quitamos la busqueda
        if (e.keyCode == 27) {
            e.preventDefault();
            e.stopPropagation();
            input.value = "";
            inputAnterior.value = "";
            this.pedidos[this.pedidoActivo].filtro.activo = false;
            this.pedidos[this.pedidoActivo].filtro.lista = [];
            return;
        }
        //Verificamos que la busqueda no sea la misma que la anterior para no filtrar en vano
        if (inputAnterior.value == term) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        inputAnterior.value = term;
        if (term != "") {
            this.pedidos[this.pedidoActivo].filtro.activo = true;
        }
        else {
            this.pedidos[this.pedidoActivo].filtro.activo = false;
            this.pedidos[this.pedidoActivo].filtro.lista = [];
            return;
        }
        var arregloResultados = [];
        var _loop_1 = function(i) {
            var termino = parametros[i].input.value;
            if (termino == "") {
                return "continue";
            }
            var listaFiltrada = this_1.pedidos[this_1.pedidoActivo].lista.filter(function (item) {
                var cadena = "";
                var campos = parametros[i].campos;
                for (var l in campos) {
                    try {
                        // Esto es por si escribieron algo como "objeto.propiedad" en lugar de: "propiedad"
                        var prop = campos[l].split(".");
                        if (prop.length > 1) {
                            cadena += " " + item[prop[0]][prop[1]].toLowerCase();
                        }
                        else {
                            cadena += " " + item[campos[l]].toLowerCase();
                        }
                    }
                    catch (e) { }
                }
                return cadena.includes(termino.toLowerCase());
            });
            arregloResultados.push(listaFiltrada);
        };
        var this_1 = this;
        for (var i in parametros) {
            _loop_1(i);
        }
        if (arregloResultados.length > 1) {
            // Ordenamos Ascendente
            arregloResultados = arregloResultados.sort(function (a, b) { return a.length - b.length; });
            var filtro = arregloResultados[0];
            var match = [];
            for (var k = 1; k < arregloResultados.length; k++) {
                for (var i in arregloResultados[k]) {
                    for (var j in filtro) {
                        if (arregloResultados[k][i] === filtro[j]) {
                            match.push(filtro[j]);
                        }
                    }
                }
                ;
            }
            this.pedidos[this.pedidoActivo].filtro.lista = match;
        }
        else {
            this.pedidos[this.pedidoActivo].filtro.lista = arregloResultados[0];
        }
        this.pedidos[this.pedidoActivo].filtro.indexar(false);
        this.pedidos[this.pedidoActivo].filtro.paginacion.paginaActual = 1;
        this.pedidos[this.pedidoActivo].filtro.listar(1);
    };
    //Harima: necesitamos eliminar también de la lista de claves agregadas
    NuevoComponent.prototype.eliminarInsumo = function (item, index, filtro) {
        if (filtro === void 0) { filtro = false; }
        //Harima: eliminar el elemento en la lista de claves agregadas, para poder agregarla de nuevo si se desea
        var i = this.listaClaveAgregadas.indexOf(item.clave);
        this.listaClaveAgregadas.splice(i, 1);
        //Harima: si no es el filtro(busqueda), borrar de la lista principal de insumos
        if (!filtro) {
            this.pedidos[this.pedidoActivo].eliminarItem(item, index);
        }
        else {
            this.pedidos[this.pedidoActivo].filtro.eliminarItem(item, index);
        }
    };
    NuevoComponent.prototype.mostrarFichaInformativa = function (e, clave) {
        e.preventDefault();
        e.stopPropagation();
        // Mostrar el componente de Ficha Informativa
        // Falta hacerlo sumamiiiii :)
        alert(clave);
        console.log(clave);
    };
    // # SECCION: Eventos del teclado
    NuevoComponent.prototype.keyboardInput = function (e) {
        if (e.keyCode == 32 && e.ctrlKey) {
            event.preventDefault();
            event.stopPropagation();
            this.mostrarModalInsumos = true;
        }
        // Cambiar página hacia adelante ctrl + shift + ->
        if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.pedidos[this.pedidoActivo].filtro.activo) {
                this.pedidos[this.pedidoActivo].paginaSiguiente();
            }
            else {
                this.pedidos[this.pedidoActivo].filtro.paginaSiguiente();
            }
        }
        // Cambiar página hacia adelante ctrl + shift + <-
        if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.pedidos[this.pedidoActivo].filtro.activo) {
                this.pedidos[this.pedidoActivo].paginaAnterior();
            }
            else {
                this.pedidos[this.pedidoActivo].filtro.paginaAnterior();
            }
        }
    };
    // # SECCION - Webworkers
    NuevoComponent.prototype.imprimir = function () {
        try {
            this.cargandoPdf = true;
            var pedidos_imprimir = {
                datos: { alamcen: 'colicitar', solicitante: 'unidad', observaciones: 'texto' },
                lista: this.pedidos[this.pedidoActivo].lista
            };
            this.pdfworker.postMessage(JSON.stringify(pedidos_imprimir));
        }
        catch (e) {
            this.cargandoPdf = false;
            console.log(e);
        }
    };
    NuevoComponent.prototype.base64ToBlob = function (base64, type) {
        var bytes = atob(base64), len = bytes.length;
        var buffer = new ArrayBuffer(len), view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++)
            view[i] = bytes.charCodeAt(i) & 0xff;
        return new Blob([buffer], { type: type });
    };
    NuevoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-nuevo',
            template: __webpack_require__(855),
            styles: [__webpack_require__(815)],
            host: { '(window:keydown)': 'keyboardInput($event)' }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* Location */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _c) || Object])
    ], NuevoComponent);
    return NuevoComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/nuevo.component.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config__ = __webpack_require__(599);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(route, router, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.credenciales = {};
        this.loading = false;
        this.mensaje = "";
        this.mostrarMensaje = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.saludIdDisponible = __WEBPACK_IMPORTED_MODULE_3_app_config__["a" /* ESTA_SALUD_ID_DISPONIBLE */];
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.mostrarMensaje = false;
        this.authService.login(this.credenciales.id, this.credenciales.password)
            .subscribe(function (data) {
            _this.loading = false;
            _this.router.navigate([_this.returnUrl]);
            localStorage.removeItem('bloquear_pantalla');
        }, function (error) {
            _this.loading = false;
            _this.mostrarMensaje = true;
            _this.mensaje = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensaje = "Lo sentimos el usuario y/o contraseña no son válidos.";
                }
                if (error.status == 0) {
                    _this.mensaje = "Conexión rechazada.";
                }
                if (error.status == 500) {
                    _this.mensaje = "500 (Error interno del servidor)";
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensaje = "500 (Error interno del servidor)";
                }
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(858),
            styles: [__webpack_require__(818)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_app_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_app_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/login.component.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = (function () {
    function NotFoundComponent() {
        this.usuario = {};
    }
    NotFoundComponent.prototype.ngOnInit = function () {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    };
    NotFoundComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-not-found',
            template: __webpack_require__(859),
            styles: [__webpack_require__(819)]
        }), 
        __metadata('design:paramtypes', [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/not-found.component.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__roles_roles_service__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__usuarios_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EditarComponent = (function () {
    // # FIN SECCION
    function EditarComponent(router, title, authService, route, location, rolesService, usuariosService, fb) {
        this.router = router;
        this.title = title;
        this.authService = authService;
        this.route = route;
        this.location = location;
        this.rolesService = rolesService;
        this.usuariosService = usuariosService;
        this.fb = fb;
        this.usuarioRepetido = false;
        this.usuarioInvalido = false;
        this.cambiarPassword = false;
        this.cargando = false;
        this.cargandoRoles = false;
        this.roles = [];
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */]();
        this.mensajeAdvertencia = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */]();
    }
    EditarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Editar usuario / Panel de control");
        this.usuario = this.fb.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            apellidos: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            id: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            cambiarPassword: [false, []],
            password: [{ value: '', disabled: true }, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            confirmarPassword: [{ value: '', disabled: true }, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]],
            avatar: ['avatar-circled-user-male'],
            roles: [[1], [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required]]
        });
        this.route.params.subscribe(function (params) {
            _this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
            //this.cargarDatos();
        });
        this.cargarRoles();
    };
    EditarComponent.prototype.toggleCambiarPassword = function () {
        this.cambiarPassword = !this.cambiarPassword;
        if (this.cambiarPassword) {
            this.usuario.get('password').enable();
            this.usuario.get('confirmarPassword').enable();
        }
        else {
            this.usuario.get('password').disable();
            this.usuario.get('confirmarPassword').disable();
        }
    };
    EditarComponent.prototype.enviar = function () {
        var _this = this;
        if (this.usuario.get('password').value != this.usuario.get('confirmarPassword').value) {
            return false;
        }
        this.cargando = true;
        var usuario = this.usuario.value;
        if (!this.cambiarPassword) {
            delete usuario.cambiarPassword;
        }
        this.usuariosService.editar(this.id, this.usuario.value).subscribe(function (usuario) {
            _this.cargando = false;
            console.log("Usuario editado.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.texto = "Se han guardado los cambios.";
            _this.mensajeExito.mostrar = true;
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
                // Problema de validación
                if (error.status == 409) {
                    _this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
                    _this.usuarioRepetido = false;
                    _this.usuarioInvalido = false;
                    for (var input in e.error) {
                        // Iteramos todos los errores
                        for (var i in e.error[input]) {
                            if (input == 'id' && e.error[input][i] == 'unique') {
                                _this.usuarioRepetido = true;
                            }
                            if (input == 'id' && e.error[input][i] == 'email') {
                                _this.usuarioInvalido = true;
                            }
                        }
                    }
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    EditarComponent.prototype.cargarDatos = function () {
        var _this = this;
        this.cargando = true;
        console.log("Cargando usuario.");
        this.usuariosService.ver(this.id).subscribe(function (usuario) {
            _this.cargando = false;
            _this.datosCargados = true;
            _this.usuario.patchValue(usuario);
            console.log("Usuario cargado.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.mostrar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    EditarComponent.prototype.cargarRoles = function () {
        var _this = this;
        this.cargandoRoles = true;
        this.rolesService.lista().subscribe(function (roles) {
            _this.cargandoRoles = false;
            _this.roles = roles;
            console.log("Roles cargados.");
            if (_this.roles.length == 0) {
                _this.mensajeAdvertencia = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
                _this.mensajeAdvertencia.texto = "\n            No hay roles registrados en el sistema, p\u00F3ngase en contacto con un administrador.";
                _this.mensajeAdvertencia.mostrar = true;
            }
            _this.cargarDatos();
        }, function (error) {
            _this.cargandoRoles = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            _this.cargarDatos();
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para ver los roles.";
                }
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.  No se pudieron cargar los roles";
                }
            }
        });
    };
    EditarComponent.prototype.regresar = function () {
        this.location.back();
    };
    EditarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-editar',
            template: __webpack_require__(863),
            styles: [__webpack_require__(823)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["b" /* Title */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__roles_roles_service__["a" /* RolesService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__roles_roles_service__["a" /* RolesService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__usuarios_service__["a" /* UsuariosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__usuarios_service__["a" /* UsuariosService */]) === 'function' && _g) || Object, (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormBuilder */]) === 'function' && _h) || Object])
    ], EditarComponent);
    return EditarComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/editar.component.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__usuarios_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ListaComponent = (function () {
    // # FIN SECCION
    function ListaComponent(title, usuariosService) {
        this.title = title;
        this.usuariosService = usuariosService;
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        // # SECCION: Lista de usuarios
        this.usuarios = [];
        this.paginaActual = 1;
        this.resultadosPorPagina = 25;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Resultados de búsqueda
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.resultadosBusqueda = [];
        this.busquedaActivada = false;
        this.paginaActualBusqueda = 1;
        this.resultadosPorPaginaBusqueda = 25;
        this.totalBusqueda = 0;
        this.paginasTotalesBusqueda = 0;
        this.indicePaginasBusqueda = [];
    }
    ListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle("Usuarios / Panel de control");
        this.listar(1);
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            _this.busquedaActivada = term != "" ? true : false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActualBusqueda = 1;
            _this.cargando = true;
            return term ? _this.usuariosService.buscar(term, _this.paginaActualBusqueda, _this.resultadosPorPaginaBusqueda) : __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listarBusqueda(self.ultimoTerminoBuscado, self.paginaActualBusqueda); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
    };
    ListaComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
    };
    ListaComponent.prototype.listarBusqueda = function (term, pagina) {
        var _this = this;
        this.paginaActualBusqueda = pagina;
        console.log("Cargando búsqueda.");
        this.cargando = true;
        this.usuariosService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(function (resultado) {
            _this.cargando = false;
            _this.resultadosBusqueda = resultado.data;
            _this.totalBusqueda = resultado.total | 0;
            _this.paginasTotalesBusqueda = Math.ceil(_this.totalBusqueda / _this.resultadosPorPaginaBusqueda);
            _this.indicePaginasBusqueda = [];
            for (var i = 0; i < _this.paginasTotalesBusqueda; i++) {
                _this.indicePaginasBusqueda.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () { this.listarBusqueda(term, pagina); };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.listar = function (pagina) {
        var _this = this;
        this.paginaActual = pagina;
        console.log("Cargando usuarios.");
        this.cargando = true;
        this.usuariosService.lista(pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.usuarios = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Usuarios cargados.");
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    ListaComponent.prototype.eliminar = function (usuario, index) {
        var _this = this;
        usuario.cargando = true;
        this.usuariosService.eliminar(usuario.id).subscribe(function (data) {
            usuario.cargando = false;
            _this.usuarios.splice(index, 1);
            console.log("Se eliminó el elemento de la lista.");
            _this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */](true);
            _this.mensajeExito.mostrar = true;
            _this.mensajeExito.texto = "Usuario eliminado";
        }, function (error) {
            usuario.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = function () {
                this.eliminar(usuario, index);
            };
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    // # SECCION: Paginación
    ListaComponent.prototype.paginaSiguiente = function () {
        this.listar(this.paginaActual + 1);
    };
    ListaComponent.prototype.paginaAnterior = function () {
        this.listar(this.paginaActual - 1);
    };
    ListaComponent.prototype.paginaSiguienteBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda + 1);
    };
    ListaComponent.prototype.paginaAnteriorBusqueda = function (term) {
        this.listarBusqueda(term, this.paginaActualBusqueda - 1);
    };
    ListaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'usuarios-lista',
            template: __webpack_require__(865),
            styles: [__webpack_require__(825)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_11__usuarios_service__["a" /* UsuariosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__usuarios_service__["a" /* UsuariosService */]) === 'function' && _b) || Object])
    ], ListaComponent);
    return ListaComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/lista.component.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__roles_roles_service__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__usuarios_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mensaje__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NuevoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var NuevoComponent = (function () {
    // # FIN SECCION
    function NuevoComponent(router, title, authService, location, rolesService, usuariosService, fb) {
        this.router = router;
        this.title = title;
        this.authService = authService;
        this.location = location;
        this.rolesService = rolesService;
        this.usuariosService = usuariosService;
        this.fb = fb;
        this.usuarioRepetido = false;
        this.usuarioInvalido = false;
        this.cargando = false;
        this.cargandoRoles = false;
        this.roles = [];
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */]();
        this.mensajeAdvertencia = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */]();
    }
    NuevoComponent.prototype.ngOnInit = function () {
        this.title.setTitle("Nuevo usuario / Panel de control");
        this.cargarRoles();
        this.usuario = this.fb.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            apellidos: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            id: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            confirmarPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]],
            avatar: ['avatar-circled-user-male'],
            roles: [[], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]]
        });
    };
    NuevoComponent.prototype.enviar = function () {
        var _this = this;
        if (this.usuario.get('password').value != this.usuario.get('confirmarPassword').value) {
            return false;
        }
        this.cargando = true;
        this.usuariosService.crear(this.usuario.value).subscribe(function (usuario) {
            _this.cargando = false;
            console.log("Usuario creado.");
            _this.location.back();
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
                // Problema de validación
                if (error.status == 409) {
                    _this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
                    _this.usuarioRepetido = false;
                    _this.usuarioInvalido = false;
                    for (var input in e.error) {
                        // Iteramos todos los errores
                        for (var i in e.error[input]) {
                            if (input == 'id' && e.error[input][i] == 'unique') {
                                _this.usuarioRepetido = true;
                            }
                            if (input == 'id' && e.error[input][i] == 'email') {
                                _this.usuarioInvalido = true;
                            }
                        }
                    }
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    NuevoComponent.prototype.cargarRoles = function () {
        var _this = this;
        this.cargandoRoles = true;
        this.rolesService.lista().subscribe(function (roles) {
            _this.cargandoRoles = false;
            _this.roles = roles;
            console.log("Roles cargados.");
            if (_this.roles.length == 0) {
                _this.mensajeAdvertencia = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
                _this.mensajeAdvertencia.texto = "\n            No hay roles registrados en el sistema, p\u00F3ngase en contacto con un administrador.";
                _this.mensajeAdvertencia.mostrar = true;
            }
        }, function (error) {
            _this.cargandoRoles = false;
            _this.mensajeError = new __WEBPACK_IMPORTED_MODULE_8__mensaje__["a" /* Mensaje */](true);
            _this.mensajeError.texto = "No especificado.";
            _this.mensajeError.mostrar = true;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para ver los roles.";
                }
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.  No se pudieron cargar los roles";
                }
            }
        });
    };
    NuevoComponent.prototype.regresar = function () {
        this.location.back();
    };
    NuevoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-nuevo',
            template: __webpack_require__(866),
            styles: [__webpack_require__(826)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* Title */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__roles_roles_service__["a" /* RolesService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__roles_roles_service__["a" /* RolesService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__usuarios_service__["a" /* UsuariosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__usuarios_service__["a" /* UsuariosService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === 'function' && _g) || Object])
    ], NuevoComponent);
    return NuevoComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/nuevo.component.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buscar_modulo_pipe__ = __webpack_require__(638);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__buscar_modulo_pipe__["a" /* BuscarModuloPipe */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__buscar_modulo_pipe__["a" /* BuscarModuloPipe */]]
        }), 
        __metadata('design:paramtypes', [])
    ], PipesModule);
    return PipesModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/pipes.module.js.map

/***/ }),

/***/ 477:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 477;


/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(597);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/main.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard_component__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard_service__["a" /* AuthGuard */]] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/app-routing.module.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(832),
            styles: [__webpack_require__(794)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/app.component.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login_component__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_dashboard_component__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__not_found_not_found_component__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_guard_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__jwt_request_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular2_jwt__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routing_module__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__wildcard_routing_module__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__hub_hub_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__perfil_perfil_module__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__bloquear_pantalla_bloquear_pantalla_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pipes_pipes_module__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__panel_control_usuarios_usuarios_module__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__farmacia_index_farmacia_index_farmacia_module__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__farmacia_pedidos_pedidos_module__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__farmacia_entregas_entregas_module__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__farmacia_entradas_entradas_module__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__farmacia_entradas_v2_entradas_module__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__farmacia_movimientos_entradas_movimientos_entradas_module__ = __webpack_require__(623);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

























// Asegurarase que en imports "WildcardRoutingModule" vaya al ÚLTIMO
// Esto nos sirve para redireccionar a una página 404 en lugar de que se genere un error
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_6__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_7__not_found_not_found_component__["a" /* NotFoundComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_12__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_14__hub_hub_module__["a" /* HubModule */],
                __WEBPACK_IMPORTED_MODULE_15__perfil_perfil_module__["a" /* PerfilModule */],
                __WEBPACK_IMPORTED_MODULE_16__bloquear_pantalla_bloquear_pantalla_module__["a" /* BloquearPantallaModule */],
                __WEBPACK_IMPORTED_MODULE_17__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_18__panel_control_usuarios_usuarios_module__["a" /* UsuariosModule */],
                __WEBPACK_IMPORTED_MODULE_19__farmacia_index_farmacia_index_farmacia_module__["a" /* IndexFarmaciaModule */],
                __WEBPACK_IMPORTED_MODULE_20__farmacia_pedidos_pedidos_module__["a" /* PedidosModule */],
                __WEBPACK_IMPORTED_MODULE_21__farmacia_entregas_entregas_module__["a" /* EntregasModule */],
                __WEBPACK_IMPORTED_MODULE_22__farmacia_entradas_entradas_module__["a" /* EntradasModule */],
                __WEBPACK_IMPORTED_MODULE_23__farmacia_entradas_v2_entradas_module__["a" /* EntradasV2Module */],
                __WEBPACK_IMPORTED_MODULE_24__farmacia_movimientos_entradas_movimientos_entradas_module__["a" /* MovimientosEntradasModule */],
                __WEBPACK_IMPORTED_MODULE_13__wildcard_routing_module__["a" /* WildcardRoutingModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* Title */], __WEBPACK_IMPORTED_MODULE_8__auth_guard_service__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_9__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_11_angular2_jwt__["JwtHelper"], __WEBPACK_IMPORTED_MODULE_10__jwt_request_service__["a" /* JwtRequestService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/app.module.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_service__ = __webpack_require__(190);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BloquearPantallaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BloquearPantallaComponent = (function () {
    function BloquearPantallaComponent(router, authService, bloquearPantallaService) {
        var _this = this;
        this.router = router;
        this.authService = authService;
        this.bloquearPantallaService = bloquearPantallaService;
        this.usuario = {};
        this.credenciales = {};
        this.loading = false;
        this.mensaje = "";
        this.mostrarMensaje = false;
        this.bloquearPantallaSuscription = bloquearPantallaService.pantallaBloqueada$.subscribe(function (bloquear) {
            // Borramos el token porque de todos modos se va a sustituir
            // y así impedimos que intenten borrar elementos en el navegador para acceder
            localStorage.removeItem('token');
            _this.cargarCredenciales();
            _this.mostrar = true;
        });
    }
    BloquearPantallaComponent.prototype.ngOnInit = function () {
        var bloquear = localStorage.getItem("bloquear_pantalla");
        if (bloquear != null) {
            this.cargarCredenciales();
            this.mostrar = true;
        }
    };
    BloquearPantallaComponent.prototype.cargarCredenciales = function () {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (this.usuario != null && this.usuario.id != null) {
            this.credenciales.id = this.usuario.id;
        }
    };
    BloquearPantallaComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.mostrarMensaje = false;
        this.authService.login(this.credenciales.id, this.credenciales.password)
            .subscribe(function (data) {
            _this.loading = false;
            _this.mostrar = false;
            _this.credenciales.password = "";
            localStorage.removeItem('bloquear_pantalla');
        }, function (error) {
            _this.loading = false;
            _this.mostrarMensaje = true;
            _this.mensaje = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensaje = "Lo sentimos el usuario y/o contraseña no son válidos.";
                }
                if (error.status == 0) {
                    _this.mensaje = "Conexión rechazada.";
                }
                if (error.status == 500) {
                    _this.mensaje = "500 (Error interno del servidor)";
                }
            }
            catch (e) {
                if (error.status == 500) {
                    _this.mensaje = "500 (Error interno del servidor)";
                }
            }
        });
    };
    BloquearPantallaComponent.prototype.logout = function () {
        this.mostrar = false;
        localStorage.removeItem('bloquear_pantalla');
        this.authService.logout();
    };
    BloquearPantallaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-bloquear-pantalla',
            template: __webpack_require__(833),
            styles: [__webpack_require__(795)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_app_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_service__["a" /* BloquearPantallaService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_service__["a" /* BloquearPantallaService */]) === 'function' && _c) || Object])
    ], BloquearPantallaComponent);
    return BloquearPantallaComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/bloquear-pantalla.component.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export API_URL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ESTA_SALUD_ID_DISPONIBLE; });
var API_URL = "http://sialapi.yoursoft.com.mx/public"; // "http://localhost:8000"
var ESTA_SALUD_ID_DISPONIBLE = false;
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/config.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mensaje__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__buscar_insumos_movimientos_service__ = __webpack_require__(389);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarInsumosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var BuscarInsumosComponent = (function () {
    function BuscarInsumosComponent(buscarInsumosService) {
        this.buscarInsumosService = buscarInsumosService;
        this.onCerrar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onEnviar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cargando = false;
        // # SECCION: Lista de insumos
        this.insumos = [];
        //insumosMovs: InsumoMedico[] = [];
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.paginaActual = 1;
        this.resultadosPorPagina = 25;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */]();
        // mensajeExito: Mensaje = new Mensaje();
        this.mensajeAgregado = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        this.cantidadValida = false;
    }
    BuscarInsumosComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            //this.busquedaActivada = term != "" ? true: false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActual = 1;
            _this.cargando = true;
            return term ? _this.buscarInsumosService.buscar(term, _this.paginaActual, _this.resultadosPorPagina) : __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */]();
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listar(self.ultimoTerminoBuscado, self.paginaActual); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
                if (error.status == 0) {
                    self.mensajeError.texto = "El servidor no responde.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resetItemSeleccionado();
            _this.insumos = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
    };
    BuscarInsumosComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        try {
            // Por alguna razón si no implemento un setTimeout me lanza error
            // investigar porque ocurre esto
            // Poner el focus en la barra de busqueda
            setTimeout(function () { _this.searchBoxViewChildren.first.nativeElement.focus(); });
        }
        catch (e) {
            console.log(e);
        }
    };
    BuscarInsumosComponent.prototype.cerrar = function () {
        this.searchBoxViewChildren.first.nativeElement.value = "";
        this.onCerrar.emit();
    };
    BuscarInsumosComponent.prototype.resetItemSeleccionado = function () {
        this.codigoBarrasViewChildren.first.nativeElement.value = "";
        this.fechaViewChildren.first.nativeElement.value = "";
        this.loteViewChildren.first.nativeElement.value = "";
        this.cantidadBoxViewChildren.first.nativeElement.value = "";
        this.insumoSeleccionado = null;
        this.cantidadValida = false;
    };
    BuscarInsumosComponent.prototype.seleccionar = function (item) {
        this.insumoSeleccionado = item;
        console.log(item);
        this.cantidadBoxViewChildren.first.nativeElement.disabled = false;
        this.cantidadBoxViewChildren.first.nativeElement.focus();
        this.codigoBarrasViewChildren.first.nativeElement.disabled = false;
        this.fechaViewChildren.first.nativeElement.disabled = false;
        this.loteViewChildren.first.nativeElement.disabled = false;
        //this.codigoBarrasViewChildren.first.nativeElement.focus();
    };
    BuscarInsumosComponent.prototype.comprobarCantidad = function (value) {
        if (value.replace(/ /g, '') == "") {
            this.cantidadValida = false;
            return false;
        }
        if (isNaN(value)) {
            this.cantidadValida = false;
            return false;
        }
        var x = value % 1;
        if (x != 0) {
            this.cantidadValida = false;
            return false;
        }
        this.cantidadValida = true;
        return true;
    };
    BuscarInsumosComponent.prototype.enviar = function (e) {
        e.preventDefault();
        //Harima: Checamos si el insumo que seleccionamos no se encuentra agregado
        if (this.listaAgregados.indexOf(this.insumoSeleccionado.clave) < 0) {
            this.mensajeAgregado = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */](true, 2);
            this.mensajeAgregado.mostrar = true;
            this.insumoSeleccionado.cantidad = this.cantidadBoxViewChildren.first.nativeElement.value;
            this.insumoSeleccionado.codigo_barras = this.codigoBarrasViewChildren.first.nativeElement.value;
            this.insumoSeleccionado.fecha_caducidad = this.fechaViewChildren.first.nativeElement.value;
            this.insumoSeleccionado.lote = this.loteViewChildren.first.nativeElement.value;
            this.onEnviar.emit(this.insumoSeleccionado);
            this.searchBoxViewChildren.first.nativeElement.focus();
            //Harima: Agregamos la clave al arreglo de items agregados
            this.listaAgregados.push(this.insumoSeleccionado.clave);
            this.resetItemSeleccionado();
        }
        else {
            //Harima: Mostramos un mensaje de error al intentar agregar un insumo ya presente en la lista
            this.mensajeError = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */](true, 2);
            this.mensajeError.texto = "El insumo seleccionado ya se encuentra en la lista";
            this.mensajeError.mostrar = true;
        }
    };
    BuscarInsumosComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
        this.mensajeError.mostrar = false;
    };
    BuscarInsumosComponent.prototype.listar = function (term, pagina) {
        var _this = this;
        this.paginaActual = pagina;
        this.resetItemSeleccionado();
        console.log("Cargando insumos.");
        this.cargando = true;
        this.buscarInsumosService.buscar(term, pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.insumos = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Insumos cargados.");
            console.log(_this.insumos);
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    BuscarInsumosComponent.prototype.mostrarFichaInformativa = function (e, clave) {
        e.preventDefault();
        e.stopPropagation();
        // Mostrar el componente de Ficha Informativa
        // Falta hacerlo sumamiiiii :)
        alert(clave);
        console.log(clave);
    };
    // # SECCION: Paginación
    BuscarInsumosComponent.prototype.paginaSiguiente = function (term) {
        if (this.paginaActual == this.paginasTotales) {
            return;
        }
        this.resetItemSeleccionado();
        this.listar(term, this.paginaActual + 1);
    };
    BuscarInsumosComponent.prototype.paginaAnterior = function (term) {
        if (this.paginaActual == 1) {
            return;
        }
        this.resetItemSeleccionado();
        this.listar(term, this.paginaActual - 1);
    };
    BuscarInsumosComponent.prototype.keyboardInput = function (e) {
        if (e.keyCode == 27) {
            event.preventDefault();
            event.stopPropagation();
            this.cerrar();
        }
        // Cambiar página hacia adelante ctrl + shift + ->
        if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            this.paginaSiguiente(this.searchBoxViewChildren.first.nativeElement.value);
        }
        // Cambiar página hacia adelante ctrl + shift + <-
        if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            this.paginaAnterior(this.searchBoxViewChildren.first.nativeElement.value);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('searchBox'), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "searchBoxViewChildren", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('cantidadBox'), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "cantidadBoxViewChildren", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('codigoBarrasBox'), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "codigoBarrasViewChildren", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('fechaBox'), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "fechaViewChildren", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('loteBox'), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "loteViewChildren", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "onCerrar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "onEnviar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "listaAgregados", void 0);
    BuscarInsumosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'buscar-insumos-movimientos',
            template: __webpack_require__(835),
            styles: [__webpack_require__(797)],
            host: { '(document:keydown)': 'keyboardInput($event)' }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_11__buscar_insumos_movimientos_service__["a" /* BuscarInsumosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__buscar_insumos_movimientos_service__["a" /* BuscarInsumosService */]) === 'function' && _a) || Object])
    ], BuscarInsumosComponent);
    return BuscarInsumosComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/buscar-insumos-movimientos.component.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buscar_insumos_movimientos_component__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__buscar_insumos_movimientos_service__ = __webpack_require__(389);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarInsumosMovimientosModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BuscarInsumosMovimientosModule = (function () {
    function BuscarInsumosMovimientosModule() {
    }
    BuscarInsumosMovimientosModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__paginacion_paginacion_module__["a" /* PaginacionModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__buscar_insumos_movimientos_component__["a" /* BuscarInsumosComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__buscar_insumos_movimientos_component__["a" /* BuscarInsumosComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_5__buscar_insumos_movimientos_service__["a" /* BuscarInsumosService */]]
        }), 
        __metadata('design:paramtypes', [])
    ], BuscarInsumosMovimientosModule);
    return BuscarInsumosMovimientosModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/buscar-insumos-movimientos.module.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mensaje__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__buscar_insumos_service__ = __webpack_require__(390);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarInsumosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var BuscarInsumosComponent = (function () {
    function BuscarInsumosComponent(buscarInsumosService) {
        this.buscarInsumosService = buscarInsumosService;
        this.onCerrar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onEnviar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cargando = false;
        // # SECCION: Lista de insumos
        this.insumos = [];
        this.ultimoTerminoBuscado = "";
        this.terminosBusqueda = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.paginaActual = 1;
        this.resultadosPorPagina = 25;
        this.total = 0;
        this.paginasTotales = 0;
        this.indicePaginas = [];
        // # FIN SECCION
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */]();
        // mensajeExito: Mensaje = new Mensaje();
        this.mensajeAgregado = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION
        this.cantidadValida = false;
    }
    BuscarInsumosComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap(function (term) {
            console.log("Cargando búsqueda.");
            //this.busquedaActivada = term != "" ? true: false;
            _this.ultimoTerminoBuscado = term;
            _this.paginaActual = 1;
            _this.cargando = true;
            return term ? _this.buscarInsumosService.buscar(term, _this.paginaActual, _this.resultadosPorPagina) : __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of({ data: [] });
        }).catch(function handleError(error) {
            self.cargando = false;
            self.mensajeError = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */]();
            self.mensajeError.mostrar = true;
            self.ultimaPeticion = function () { self.listar(self.ultimoTerminoBuscado, self.paginaActual); }; //OJO
            try {
                var e = error.json();
                if (error.status == 401) {
                    self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
                if (error.status == 0) {
                    self.mensajeError.texto = "El servidor no responde.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    self.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
            // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
            return busquedaSubject;
        });
        busquedaSubject.subscribe(function (resultado) {
            _this.cargando = false;
            _this.resetItemSeleccionado();
            _this.insumos = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Búsqueda cargada.");
        });
    };
    BuscarInsumosComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        try {
            // Por alguna razón si no implemento un setTimeout me lanza error
            // investigar porque ocurre esto
            // Poner el focus en la barra de busqueda
            setTimeout(function () { _this.searchBoxViewChildren.first.nativeElement.focus(); });
        }
        catch (e) {
            console.log(e);
        }
    };
    BuscarInsumosComponent.prototype.cerrar = function () {
        this.searchBoxViewChildren.first.nativeElement.value = "";
        this.onCerrar.emit();
    };
    BuscarInsumosComponent.prototype.resetItemSeleccionado = function () {
        this.cantidadBoxViewChildren.first.nativeElement.value = "";
        this.insumoSeleccionado = null;
        this.cantidadValida = false;
    };
    BuscarInsumosComponent.prototype.seleccionar = function (item) {
        this.insumoSeleccionado = item;
        this.cantidadBoxViewChildren.first.nativeElement.disabled = false;
        this.cantidadBoxViewChildren.first.nativeElement.focus();
    };
    BuscarInsumosComponent.prototype.comprobarCantidad = function (value) {
        if (value.replace(/ /g, '') == "") {
            this.cantidadValida = false;
            return false;
        }
        if (isNaN(value)) {
            this.cantidadValida = false;
            return false;
        }
        var x = value % 1;
        if (x != 0) {
            this.cantidadValida = false;
            return false;
        }
        this.cantidadValida = true;
        return true;
    };
    BuscarInsumosComponent.prototype.enviar = function (e) {
        e.preventDefault();
        //Harima: Checamos si el insumo que seleccionamos no se encuentra agregado
        if (this.listaAgregados.indexOf(this.insumoSeleccionado.clave) < 0) {
            this.mensajeAgregado = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */](true, 2);
            this.mensajeAgregado.mostrar = true;
            this.insumoSeleccionado.cantidad = this.cantidadBoxViewChildren.first.nativeElement.value;
            this.onEnviar.emit(this.insumoSeleccionado);
            this.searchBoxViewChildren.first.nativeElement.focus();
            //Harima: Agregamos la clave al arreglo de items agregados
            this.listaAgregados.push(this.insumoSeleccionado.clave);
            this.resetItemSeleccionado();
        }
        else {
            //Harima: Mostramos un mensaje de error al intentar agregar un insumo ya presente en la lista
            this.mensajeError = new __WEBPACK_IMPORTED_MODULE_10__mensaje__["a" /* Mensaje */](true, 2);
            this.mensajeError.texto = "El insumo seleccionado ya se encuentra en la lista";
            this.mensajeError.mostrar = true;
        }
    };
    BuscarInsumosComponent.prototype.buscar = function (term) {
        this.terminosBusqueda.next(term);
        this.mensajeError.mostrar = false;
    };
    BuscarInsumosComponent.prototype.listar = function (term, pagina) {
        var _this = this;
        this.paginaActual = pagina;
        this.resetItemSeleccionado();
        console.log("Cargando insumos.");
        this.cargando = true;
        this.buscarInsumosService.buscar(term, pagina, this.resultadosPorPagina).subscribe(function (resultado) {
            _this.cargando = false;
            _this.insumos = resultado.data;
            _this.total = resultado.total | 0;
            _this.paginasTotales = Math.ceil(_this.total / _this.resultadosPorPagina);
            _this.indicePaginas = [];
            for (var i = 0; i < _this.paginasTotales; i++) {
                _this.indicePaginas.push(i + 1);
            }
            console.log("Insumos cargados.");
            console.log(_this.insumos);
        }, function (error) {
            _this.cargando = false;
            _this.mensajeError.mostrar = true;
            _this.ultimaPeticion = _this.listar;
            try {
                var e = error.json();
                if (error.status == 401) {
                    _this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
                }
            }
            catch (e) {
                console.log("No se puede interpretar el error");
                if (error.status == 500) {
                    _this.mensajeError.texto = "500 (Error interno del servidor)";
                }
                else {
                    _this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                }
            }
        });
    };
    BuscarInsumosComponent.prototype.mostrarFichaInformativa = function (e, clave) {
        e.preventDefault();
        e.stopPropagation();
        // Mostrar el componente de Ficha Informativa
        // Falta hacerlo sumamiiiii :)
        alert(clave);
        console.log(clave);
    };
    // # SECCION: Paginación
    BuscarInsumosComponent.prototype.paginaSiguiente = function (term) {
        if (this.paginaActual == this.paginasTotales) {
            return;
        }
        this.resetItemSeleccionado();
        this.listar(term, this.paginaActual + 1);
    };
    BuscarInsumosComponent.prototype.paginaAnterior = function (term) {
        if (this.paginaActual == 1) {
            return;
        }
        this.resetItemSeleccionado();
        this.listar(term, this.paginaActual - 1);
    };
    BuscarInsumosComponent.prototype.keyboardInput = function (e) {
        if (e.keyCode == 27) {
            event.preventDefault();
            event.stopPropagation();
            this.cerrar();
        }
        // Cambiar página hacia adelante ctrl + shift + ->
        if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            this.paginaSiguiente(this.searchBoxViewChildren.first.nativeElement.value);
        }
        // Cambiar página hacia adelante ctrl + shift + <-
        if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            this.paginaAnterior(this.searchBoxViewChildren.first.nativeElement.value);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('searchBox'), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "searchBoxViewChildren", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('cantidadBox'), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "cantidadBoxViewChildren", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "onCerrar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "onEnviar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], BuscarInsumosComponent.prototype, "listaAgregados", void 0);
    BuscarInsumosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'buscar-insumos',
            template: __webpack_require__(836),
            styles: [__webpack_require__(798)],
            host: { '(document:keydown)': 'keyboardInput($event)' }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_11__buscar_insumos_service__["a" /* BuscarInsumosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__buscar_insumos_service__["a" /* BuscarInsumosService */]) === 'function' && _a) || Object])
    ], BuscarInsumosComponent);
    return BuscarInsumosComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/buscar-insumos.component.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__editar_editar_component__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntradasRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var routes = [
    { path: 'farmacia', redirectTo: '/farmacia/entradas/v2', pathMatch: 'full' },
    {
        path: 'farmacia/entradas/v2',
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'nuevo', component: __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__["a" /* NuevoComponent */] },
            { path: 'editar/:id', component: __WEBPACK_IMPORTED_MODULE_4__editar_editar_component__["a" /* EditarComponent */] },
        ],
        canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]]
    }
];
var EntradasRoutingModule = (function () {
    function EntradasRoutingModule() {
    }
    EntradasRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], EntradasRoutingModule);
    return EntradasRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entradas-routing.module.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__entradas_routing_module__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lista_lista_component__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuevo_nuevo_component__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__editar_editar_component__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__entradas_service__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__form_form_component__ = __webpack_require__(605);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntradasV2Module; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var EntradasV2Module = (function () {
    function EntradasV2Module() {
    }
    EntradasV2Module = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__entradas_routing_module__["a" /* EntradasRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__["a" /* HubModule */],
                __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__["a" /* PerfilModule */],
                __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__["a" /* BloquearPantallaModule */],
                __WEBPACK_IMPORTED_MODULE_7__paginacion_paginacion_module__["a" /* PaginacionModule */],
                __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__["a" /* IndexFarmaciaModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_9__lista_lista_component__["a" /* ListaComponent */], __WEBPACK_IMPORTED_MODULE_10__nuevo_nuevo_component__["a" /* NuevoComponent */], __WEBPACK_IMPORTED_MODULE_11__editar_editar_component__["a" /* EditarComponent */], __WEBPACK_IMPORTED_MODULE_14__form_form_component__["a" /* FormComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_12__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_13__entradas_service__["a" /* EntradasService */]],
        }), 
        __metadata('design:paramtypes', [])
    ], EntradasV2Module);
    return EntradasV2Module;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entradas.module.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Rol }       from '../../roles/rol';
var FormComponent = (function () {
    function FormComponent() {
        this.onEnviar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onRegresar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onToggleCambiarPassword = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCargarRoles = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FormComponent.prototype.ngOnInit = function () {
    };
    FormComponent.prototype.enviar = function () {
        this.onEnviar.emit();
    };
    FormComponent.prototype.cargarRoles = function () {
        this.onCargarRoles.emit();
    };
    FormComponent.prototype.regresar = function () {
        this.onRegresar.emit();
    };
    FormComponent.prototype.toggleCambiarPassword = function () {
        this.onToggleCambiarPassword.emit();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]) === 'function' && _a) || Object)
    ], FormComponent.prototype, "usuario", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "usuarioRepetido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "usuarioInvalido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "cargando", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "cargandoRoles", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "mostrarCambiarPassword", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onEnviar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onRegresar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onToggleCambiarPassword", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onCargarRoles", void 0);
    FormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'farmacia-entradas-form',
            template: __webpack_require__(838),
            styles: [__webpack_require__(800)]
        }), 
        __metadata('design:paramtypes', [])
    ], FormComponent);
    return FormComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/form.component.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paginacion_paginacion__ = __webpack_require__(268);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Entrada; });

var EntradaFiltro = (function () {
    function EntradaFiltro() {
    }
    return EntradaFiltro;
}());
var Entrada = (function () {
    function Entrada(conFiltro) {
        if (conFiltro === void 0) { conFiltro = false; }
        this.lista = [];
        this.paginacion = new __WEBPACK_IMPORTED_MODULE_0__paginacion_paginacion__["a" /* Paginacion */]();
        this.activo = false;
        this.cargando = false;
        this.indexar = function (conLote) {
            if (conLote === void 0) { conLote = true; }
            if (conLote) {
                var contador = 1;
                for (var i in this.lista) {
                    this.lista[i].lote = contador++;
                }
            }
            this.paginacion.totalPaginas = Math.ceil(this.lista.length / this.paginacion.resultadosPorPagina);
            this.paginacion.indice = [];
            for (var i = 0; i < this.paginacion.totalPaginas; i++) {
                this.paginacion.indice.push(i + 1);
            }
        };
        this.listar = function (pagina) {
            if (pagina === void 0) { pagina = 1; }
            this.paginacion.paginaActual = pagina;
            var inicio = (this.paginacion.paginaActual - 1) * this.paginacion.resultadosPorPagina;
            var fin = inicio + this.paginacion.resultadosPorPagina;
            try {
                this.paginacion.lista = this.lista.slice(inicio, fin);
            }
            catch (e) {
                this.paginacion.lista = [];
            }
        };
        this.eliminarItem = function (item, index) {
            var contador = 0;
            for (var i in this.lista) {
                if (this.lista[i] === item) {
                    this.paginacion.lista.splice(index, 1);
                    this.lista.splice(contador, 1);
                    this.indexar();
                    //Harima: con esto calculamos el siguiente indice, de la lista total de elementos, a agregar al final de la página
                    var proximoIndice = (contador + (this.paginacion.resultadosPorPagina - index)) - 1;
                    //Harima:  si ese indice existe, lo agregamos al final de la pagina
                    if (this.lista[proximoIndice]) {
                        this.paginacion.lista.push(this.lista[proximoIndice]);
                    }
                    //Harima: Si la pagina quedo vacía, listamos la pagina anterior, en caso de que la página actual sea mayor a 1
                    if (this.paginacion.lista.length == 0) {
                        if (this.paginacion.paginaActual > 1) {
                            this.listar(this.paginacion.paginaActual - 1);
                        }
                        else {
                            this.listar(1);
                        }
                    }
                    //Harima: si el objeto padre esta inicializado, significa que se esta eliminando desde una busqueda, por tanto hay que eliminar también en el objeto padre
                    if (this.padre) {
                        //Harima: se obtiene el indice y la pagina del item eliminado
                        var indice = this.padre.lista.indexOf(item);
                        var pagina = Math.ceil(indice / this.padre.paginacion.resultadosPorPagina);
                        //Harima: se calcula el indice que tiene el item en la pagina en la que se encuentra
                        var ajusteIndices = (pagina - 1) * this.padre.paginacion.resultadosPorPagina;
                        var indiceEnPagina = indice - ajusteIndices;
                        //Harima: eliminamos el elemento del padre, de ser necesario cambiamos de pagina
                        if (this.padre.paginacion.paginaActual == pagina) {
                            this.padre.eliminarItem(item, indiceEnPagina);
                        }
                        else {
                            var respaldoPagina = this.padre.paginacion.paginaActual;
                            this.padre.listar(pagina);
                            this.padre.eliminarItem(item, indiceEnPagina);
                            this.padre.listar(respaldoPagina);
                            //Harima: tenemos que checar si en la pagina actual del padre aun hay elementos, de lo contrario listamos la pagina anterior, cuando sea posible
                            if (this.padre.paginacion.lista.length == 0) {
                                if (this.padre.paginacion.paginaActual > 1) {
                                    this.padre.listar(this.padre.paginacion.paginaActual - 1);
                                }
                                else {
                                    this.padre.listar(1);
                                }
                            }
                        }
                    }
                    return;
                }
                contador++;
            }
        };
        if (conFiltro) {
            this.filtro = new Entrada();
            //Harima: se asigna el pedido actual como padre del filtro
            this.filtro.padre = this;
        }
    }
    Entrada.prototype.paginaSiguiente = function () {
        if (this.paginacion.paginaActual == this.paginacion.totalPaginas) {
            return;
        }
        this.listar(this.paginacion.paginaActual + 1);
    };
    Entrada.prototype.paginaAnterior = function () {
        if (this.paginacion.paginaActual == 1) {
            return;
        }
        this.listar(this.paginacion.paginaActual - 1);
    };
    return Entrada;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entrada.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntradasRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var routes = [
    { path: 'farmacia/entradas', redirectTo: '/farmacia/entradas/lista', pathMatch: 'full' },
    {
        path: 'farmacia/entradas',
        children: [
            { path: 'lista', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'abiertos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'lista/en-proceso', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'lista/liberados', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'recibidos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'recibidos/completos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'recibidos/incompletos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'nuevo', component: __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__["a" /* NuevoComponent */] },
        ],
        canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard_service__["a" /* AuthGuard */]]
    }
];
var EntradasRoutingModule = (function () {
    function EntradasRoutingModule() {
    }
    EntradasRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], EntradasRoutingModule);
    return EntradasRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entradas-routing.module.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buscar_insumos_buscar_insumos_module__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entradas_routing_module__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__menu_lateral_menu_lateral_component__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nuevo_nuevo_component__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lista_lista_component__ = __webpack_require__(394);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntradasModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var EntradasModule = (function () {
    function EntradasModule() {
    }
    EntradasModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__["a" /* HubModule */],
                __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__["a" /* PerfilModule */],
                __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__["a" /* BloquearPantallaModule */],
                __WEBPACK_IMPORTED_MODULE_6__paginacion_paginacion_module__["a" /* PaginacionModule */],
                __WEBPACK_IMPORTED_MODULE_7__buscar_insumos_buscar_insumos_module__["a" /* BuscarInsumosModule */],
                __WEBPACK_IMPORTED_MODULE_9__entradas_routing_module__["a" /* EntradasRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__["a" /* IndexFarmaciaModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_10__menu_lateral_menu_lateral_component__["a" /* MenuLateralComponent */], __WEBPACK_IMPORTED_MODULE_11__nuevo_nuevo_component__["a" /* NuevoComponent */], __WEBPACK_IMPORTED_MODULE_12__lista_lista_component__["a" /* ListaComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], EntradasModule);
    return EntradasModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entradas.module.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntradasService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EntradasService = (function () {
    function EntradasService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    EntradasService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(EntradasService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(EntradasService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.ver = function (id) {
        return this.jwtRequest.get(EntradasService.URL, id, {}).map(function (response) {
            var jsonData = response.json().data;
            /* var roles:string[] = []
             jsonData.roles.map(item => {
               roles.push(""+item.id)
             })*/
            var pedido = jsonData;
            //usuario.roles = roles;
            return pedido;
        });
    };
    EntradasService.prototype.crear = function (pedido) {
        return this.jwtRequest.post(EntradasService.URL, pedido).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.editar = function (id, pedido) {
        return this.jwtRequest.put(EntradasService.URL, id, pedido).map(function (response) { return response.json().data; });
    };
    EntradasService.prototype.eliminar = function (id) {
        return this.jwtRequest.delete(EntradasService.URL, id).map(function (response) { return response.json().data; });
    };
    EntradasService.URL = "entradas";
    EntradasService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], EntradasService);
    return EntradasService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entradas.service.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bloquear_pantalla_bloquear_pantalla_service__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__(270);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtRequestService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var JwtRequestService = (function () {
    function JwtRequestService(http, authService, bloquearPantallaService, router, jwtHelper) {
        this.http = http;
        this.authService = authService;
        this.bloquearPantallaService = bloquearPantallaService;
        this.router = router;
        this.jwtHelper = jwtHelper;
    }
    JwtRequestService.prototype.get = function (url, id, params) {
        if (id === void 0) { id = null; }
        if (params === void 0) { params = null; }
        var data = this.request('get', url, id, params);
        if (id != null) {
            return data;
        }
        else {
            return data;
        }
    };
    JwtRequestService.prototype.post = function (url, params) {
        if (params === void 0) { params = null; }
        var data = this.request('post', url, null, params);
        return data;
    };
    JwtRequestService.prototype.put = function (url, id, params) {
        if (id === void 0) { id = null; }
        if (params === void 0) { params = null; }
        var data = this.request('put', url, id, params);
        return data;
    };
    JwtRequestService.prototype.delete = function (url, id, params) {
        if (id === void 0) { id = null; }
        if (params === void 0) { params = null; }
        var data = this.request('delete', url, id);
        return data;
    };
    JwtRequestService.prototype.request = function (method, url, id, params) {
        var _this = this;
        if (id === void 0) { id = null; }
        if (params === void 0) { params = {}; }
        if (localStorage.getItem('token') == null) {
            return null;
        }
        var serverInfo = JSON.parse(localStorage.getItem("server_info"));
        var token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        var data = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            if (_this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
                console.log("El token ha expirado. Comprobando caducidad para renovar.");
                var ttl = Number(serverInfo.token_refresh_ttl);
                ttl = Number.isNaN(ttl) ? 0 : ttl;
                var expiracionToken = _this.jwtHelper.getTokenExpirationDate(localStorage.getItem('token'));
                var expiracionRefreshToken = new Date(expiracionToken.getTime() + (ttl * 60000));
                var clienteDate = new Date();
                if (expiracionRefreshToken.getTime() - clienteDate.getTime() <= 0) {
                    console.log("El token ha caducado completamente y no será posible renovarlo.");
                    console.log("Bloqueando aplicación.");
                    _this.bloquearPantallaService.bloquearPantalla(); //this.authService.logout(this.router.url);
                }
                else {
                    // Refrescamos token
                    _this.authService.refreshToken().subscribe(function () {
                        console.log("Enviando petición con token renovado.");
                        headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
                        if (method == 'get') {
                            var urlSearchParams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
                            if (params != null) {
                                for (var key in params) {
                                    if (params.hasOwnProperty(key)) {
                                        urlSearchParams.set(key, params[key]);
                                    }
                                }
                            }
                            if (id == null) {
                                _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url, { headers: headers, search: urlSearchParams })
                                    .subscribe(function (data) {
                                    observer.next(data);
                                }, function (error) { observer.error(error); });
                            }
                            else {
                                _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url + "/" + id, { headers: headers, search: urlSearchParams })
                                    .subscribe(function (data) {
                                    observer.next(data);
                                }, function (error) { observer.error(error); });
                            }
                        }
                        if (method == 'post') {
                            _this.http.post(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url, params, { headers: headers })
                                .subscribe(function (data) {
                                observer.next(data);
                            }, function (error) { observer.error(error); });
                        }
                        if (method == 'put' && id != null) {
                            _this.http.put(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url + "/" + id, params, { headers: headers })
                                .subscribe(function (data) {
                                observer.next(data);
                            }, function (error) { observer.error(error); });
                        }
                        if (method == 'delete' && id != null) {
                            _this.http.delete(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url + "/" + id, { headers: headers })
                                .subscribe(function (data) {
                                observer.next(data);
                            }, function (error) { observer.error(error); });
                        }
                    }, function (error) {
                        console.log("Token caducado. Se intento renovar pero el servidor no lo permitió, debido a que se superó el tiempo límite.");
                        console.log("Bloqueando aplicación.");
                        _this.bloquearPantallaService.bloquearPantalla(); //this.authService.logout(this.router.url);
                    });
                }
            }
            else {
                if (method == 'get') {
                    var urlSearchParams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
                    if (params != null) {
                        for (var key in params) {
                            if (params.hasOwnProperty(key)) {
                                urlSearchParams.set(key, params[key]);
                            }
                        }
                    }
                    if (id == null) {
                        _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url, { headers: headers, search: urlSearchParams })
                            .subscribe(function (data) {
                            observer.next(data);
                        }, function (error) { observer.error(error); });
                    }
                    else {
                        _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url + "/" + id, { headers: headers, search: urlSearchParams })
                            .subscribe(function (data) {
                            observer.next(data);
                        }, function (error) { observer.error(error); });
                    }
                }
                if (method == 'post') {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url, params, { headers: headers })
                        .subscribe(function (data) {
                        observer.next(data);
                    }, function (error) { observer.error(error); });
                }
                if (method == 'put' && id != null) {
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url + "/" + id, params, { headers: headers })
                        .subscribe(function (data) {
                        observer.next(data);
                    }, function (error) { observer.error(error); });
                }
                if (method == 'delete' && id != null) {
                    _this.http.delete(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].API_URL + "/" + url + "/" + id, { headers: headers })
                        .subscribe(function (data) {
                        observer.next(data);
                    }, function (error) { observer.error(error); });
                }
            }
        });
        return data;
    };
    JwtRequestService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__bloquear_pantalla_bloquear_pantalla_service__["a" /* BloquearPantallaService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__bloquear_pantalla_bloquear_pantalla_service__["a" /* BloquearPantallaService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["JwtHelper"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["JwtHelper"]) === 'function' && _e) || Object])
    ], JwtRequestService);
    return JwtRequestService;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/jwt-request.service.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuLateralComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuLateralComponent = (function () {
    function MenuLateralComponent() {
    }
    MenuLateralComponent.prototype.ngOnInit = function () {
    };
    MenuLateralComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu-lateral',
            template: __webpack_require__(842),
            styles: [__webpack_require__(804)]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuLateralComponent);
    return MenuLateralComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/menu-lateral.component.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_guard_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lista_lista_component__ = __webpack_require__(396);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntregasRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { NuevoComponent } from './nuevo/nuevo.component';
var routes = [
    { path: 'farmacia/entregas', redirectTo: '/farmacia/entregas/bandeja', pathMatch: 'full' },
    {
        path: 'farmacia/entregas',
        children: [
            { path: 'bandeja', component: __WEBPACK_IMPORTED_MODULE_3__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'pendientes', component: __WEBPACK_IMPORTED_MODULE_3__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'realizadas', component: __WEBPACK_IMPORTED_MODULE_3__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'realizadas/completas', component: __WEBPACK_IMPORTED_MODULE_3__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'realizadas/incompletas', component: __WEBPACK_IMPORTED_MODULE_3__lista_lista_component__["a" /* ListaComponent */] },
        ],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]]
    }
];
var EntregasRoutingModule = (function () {
    function EntregasRoutingModule() {
    }
    EntregasRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], EntregasRoutingModule);
    return EntregasRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entregas-routing.module.js.map

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buscar_insumos_buscar_insumos_module__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entregas_routing_module__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__menu_lateral_menu_lateral_component__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lista_lista_component__ = __webpack_require__(396);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntregasModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var EntregasModule = (function () {
    function EntregasModule() {
    }
    EntregasModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__["a" /* HubModule */],
                __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__["a" /* PerfilModule */],
                __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__["a" /* BloquearPantallaModule */],
                __WEBPACK_IMPORTED_MODULE_6__paginacion_paginacion_module__["a" /* PaginacionModule */],
                __WEBPACK_IMPORTED_MODULE_7__buscar_insumos_buscar_insumos_module__["a" /* BuscarInsumosModule */],
                __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__["a" /* IndexFarmaciaModule */],
                __WEBPACK_IMPORTED_MODULE_9__entregas_routing_module__["a" /* EntregasRoutingModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_11__lista_lista_component__["a" /* ListaComponent */], __WEBPACK_IMPORTED_MODULE_10__menu_lateral_menu_lateral_component__["a" /* MenuLateralComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], EntregasModule);
    return EntregasModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entregas.module.js.map

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntregasService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EntregasService = (function () {
    function EntregasService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    EntregasService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(EntregasService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    EntregasService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(EntregasService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    EntregasService.prototype.ver = function (id) {
        return this.jwtRequest.get(EntregasService.URL, id, {}).map(function (response) {
            var jsonData = response.json().data;
            /* var roles:string[] = []
             jsonData.roles.map(item => {
               roles.push(""+item.id)
             })*/
            var pedido = jsonData;
            //usuario.roles = roles;
            return pedido;
        });
    };
    EntregasService.prototype.surtir = function (pedido) {
        return this.jwtRequest.post(EntregasService.URL, pedido).map(function (response) { return response.json().data; });
    };
    EntregasService.URL = "pedidos";
    EntregasService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], EntregasService);
    return EntregasService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/entregas.service.js.map

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuLateralComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuLateralComponent = (function () {
    function MenuLateralComponent() {
    }
    MenuLateralComponent.prototype.ngOnInit = function () {
    };
    MenuLateralComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu-lateral',
            template: __webpack_require__(845),
            styles: [__webpack_require__(807)]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuLateralComponent);
    return MenuLateralComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/menu-lateral.component.js.map

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_farmacia_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_guard_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexFarmaciaRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var routes = [
    {
        path: 'farmacia',
        component: __WEBPACK_IMPORTED_MODULE_2__index_farmacia_component__["a" /* IndexFarmaciaComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_guard_service__["a" /* AuthGuard */]]
    }
];
var IndexFarmaciaRoutingModule = (function () {
    function IndexFarmaciaRoutingModule() {
    }
    IndexFarmaciaRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], IndexFarmaciaRoutingModule);
    return IndexFarmaciaRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/index-farmacia-routing.module.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuFarmaciaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuFarmaciaComponent = (function () {
    function MenuFarmaciaComponent() {
        this.usuario = {};
    }
    MenuFarmaciaComponent.prototype.ngOnInit = function () {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MenuFarmaciaComponent.prototype, "modulo", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MenuFarmaciaComponent.prototype, "icono", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MenuFarmaciaComponent.prototype, "url", void 0);
    MenuFarmaciaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu-farmacia',
            template: __webpack_require__(847),
            styles: [__webpack_require__(809)]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuFarmaciaComponent);
    return MenuFarmaciaComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/menu-farmacia.component.js.map

/***/ }),

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__movimientos_entradas_service__ = __webpack_require__(267);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormDatosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormDatosComponent = (function () {
    function FormDatosComponent(movimientosEntradasService) {
        this.movimientosEntradasService = movimientosEntradasService;
        this.usuario = {};
        this.onEnviar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onRegresar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCargarDatos = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FormDatosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        console.log(this.usuario);
        console.log("*****************");
        this.movimientosEntradasService.listaDatos("almacenes").subscribe(function (datos) {
            _this.datos = datos;
            for (var _i = 0, _a = _this.datos; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.usuario_id == _this.usuario.id) {
                    for (var _b = 0, _c = data.almacen_tipos_movimientos; _b < _c.length; _b++) {
                        var almacen_tipo_movimiento = _c[_b];
                        //console.log("almacen_tipos_movimientos");
                        _this.listaMovimientos = almacen_tipo_movimiento.tipo_movimiento;
                    }
                }
            }
            console.log(_this.datos);
        }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
    };
    FormDatosComponent.prototype.listarDatos = function () {
    };
    FormDatosComponent.prototype.enviar = function () {
        this.onEnviar.emit();
    };
    FormDatosComponent.prototype.regresar = function () {
        this.onRegresar.emit();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], FormDatosComponent.prototype, "insumo", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]) === 'function' && _a) || Object)
    ], FormDatosComponent.prototype, "movimiento", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormDatosComponent.prototype, "movimientoRepetido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormDatosComponent.prototype, "movimientoInvalido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormDatosComponent.prototype, "cargando", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormDatosComponent.prototype, "cargandoDatos", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormDatosComponent.prototype, "mostrarCancelado", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], FormDatosComponent.prototype, "servidor", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormDatosComponent.prototype, "onEnviar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormDatosComponent.prototype, "onRegresar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormDatosComponent.prototype, "onCargarDatos", void 0);
    FormDatosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'entradas-form-datos',
            template: __webpack_require__(848)
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__movimientos_entradas_service__["a" /* MovimientosEntradasService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__movimientos_entradas_service__["a" /* MovimientosEntradasService */]) === 'function' && _b) || Object])
    ], FormDatosComponent);
    return FormDatosComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/form-datos.component.js.map

/***/ }),

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_file_saver__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mensaje__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modelo__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__movimiento__ = __webpack_require__(621);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormInsumosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var FormInsumosComponent = (function () {
    // # FIN SECCION
    function FormInsumosComponent(title, location, _ngZone) {
        this.title = title;
        this.location = location;
        this._ngZone = _ngZone;
        this.onMovimientoSalida = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /*
          @Input('group')
            public insumosForm: FormGroup;*/
        this.cargando = false;
        // # SECCION: Esta sección es para mostrar mensajes
        this.mensajeError = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        this.mensajeExito = new __WEBPACK_IMPORTED_MODULE_12__mensaje__["a" /* Mensaje */]();
        // # FIN SECCION  
        // # SECCION: Modal Insumos
        this.mostrarModalInsumos = false;
        //Harima: Lista de claves agregadas al pedido, para checar duplicidad
        this.listaClaveAgregadas = [];
        // # FIN SECCION
        // # SECCION: Modelo
        // Los pedidos tienen que ser en un array por si se va a generar mas de un pedido de golpe
        this.pedidos = [];
        // esta variable es para saber el pedido seleccionado (por si hay mas)
        this.pedidoActivo = 0;
        this.cargandoPdf = false;
    }
    FormInsumosComponent.prototype.ngOnInit = function () {
        this.title.setTitle('Nueva entrada / Farmacia');
        // Inicializamos el objeto para los reportes con web Webworkers
        this.pdfworker = new Worker("web-workers/farmacia/pedidos/imprimir.js");
        // Este es un hack para poder usar variables del componente dentro de una funcion del worker
        var self = this;
        var $ngZone = this._ngZone;
        this.pdfworker.onmessage = function (evt) {
            // Esto es un hack porque estamos fuera de contexto dentro del worker
            // Y se usa esto para actualizar alginas variables
            $ngZone.run(function () {
                self.cargandoPdf = false;
            });
            __WEBPACK_IMPORTED_MODULE_11_file_saver__["saveAs"](self.base64ToBlob(evt.data.base64, 'application/pdf'), evt.data.fileName);
            //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
        };
        this.pdfworker.onerror = function (e) {
            $ngZone.run(function () {
                self.cargandoPdf = false;
            });
            console.log(e);
        };
        // Inicialicemos el pedido
        this.pedidos.push(new __WEBPACK_IMPORTED_MODULE_13__modelo__["a" /* Modelo */](true));
        this.pedidos[0].nombre = "General";
        this.pedidos[0].observaciones = null;
        console.log(this.pedidos[0]);
        // this.insumosAgregados.push(new Insumo());
        console.log(this.insumosAgregados);
    };
    FormInsumosComponent.prototype.regresar = function () {
        this.location.back();
    };
    FormInsumosComponent.prototype.toggleModalInsumos = function () {
        //console.log(this.mostrarModalInsumos)
        this.mostrarModalInsumos = !this.mostrarModalInsumos;
        //console.log(this.mostrarModalInsumos)
    };
    // # SECCION Funciones globales
    FormInsumosComponent.prototype.agregarItem = function (item) {
        if (item === void 0) { item = {}; }
        var auxPaginasTotales = this.pedidos[this.pedidoActivo].paginacion.totalPaginas;
        this.pedidos[this.pedidoActivo].lista.push(item);
        var insumo = new __WEBPACK_IMPORTED_MODULE_14__movimiento__["a" /* Insumo */]();
        //insumo = item;
        insumo.descripcion = item.descripcion;
        insumo.informacion = item.informacion;
        insumo.tipo = item.tipo;
        insumo.es_causes = item.es_causes;
        console.log(insumo.informacion);
        insumo.clave = item.clave;
        insumo.cantidad = item.cantidad;
        insumo.cantidad_x_envase = Number(item.informacion.cantidad_x_envase);
        insumo.codigo_barras = item.codigo_barras;
        insumo.lote = item.lote;
        console.log(item.lote);
        insumo.fecha_caducidad = item.fecha_caducidad;
        this.insumosAgregados.push(insumo);
        //this.insumos 
        /*
        
            this.insumosAgregados[this.pedidoActivo].clave = item.clave;
            this.insumosAgregados[this.pedidoActivo].cantidad = item.cantidad;
            this.insumosAgregados[this.pedidoActivo].fecha_caducidad = item.fecha_caducidad;
            this.insumosAgregados[this.pedidoActivo].codigo_barras = item.codigo_barras;
          */
        this.pedidos[this.pedidoActivo].indexar();
        console.log(this.pedidos);
        console.log(this.insumosAgregados);
        // El siguiente proceso es para cambiar de página automáticamente si se encuentra en la última.
        if (this.pedidos[this.pedidoActivo].paginacion.lista.length == this.pedidos[this.pedidoActivo].paginacion.resultadosPorPagina
            && this.pedidos[this.pedidoActivo].paginacion.paginaActual == auxPaginasTotales
            && !this.pedidos[this.pedidoActivo].filtro.activo) {
            this.pedidos[this.pedidoActivo].listar(this.pedidos[this.pedidoActivo].paginacion.paginaActual + 1);
        }
        else {
            this.pedidos[this.pedidoActivo].listar(this.pedidos[this.pedidoActivo].paginacion.paginaActual);
        }
    };
    FormInsumosComponent.prototype.buscar = function (e, input, inputAnterior, parametros) {
        var term = input.value;
        // Quitamos la busqueda
        if (e.keyCode == 27) {
            e.preventDefault();
            e.stopPropagation();
            input.value = "";
            inputAnterior.value = "";
            this.pedidos[this.pedidoActivo].filtro.activo = false;
            this.pedidos[this.pedidoActivo].filtro.lista = [];
            return;
        }
        //Verificamos que la busqueda no sea la misma que la anterior para no filtrar en vano
        if (inputAnterior.value == term) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        inputAnterior.value = term;
        if (term != "") {
            this.pedidos[this.pedidoActivo].filtro.activo = true;
        }
        else {
            this.pedidos[this.pedidoActivo].filtro.activo = false;
            this.pedidos[this.pedidoActivo].filtro.lista = [];
            return;
        }
        var arregloResultados = [];
        var _loop_1 = function(i) {
            var termino = parametros[i].input.value;
            if (termino == "") {
                return "continue";
            }
            var listaFiltrada = this_1.pedidos[this_1.pedidoActivo].lista.filter(function (item) {
                var cadena = "";
                var campos = parametros[i].campos;
                for (var l in campos) {
                    try {
                        // Esto es por si escribieron algo como "objeto.propiedad" en lugar de: "propiedad"
                        var prop = campos[l].split(".");
                        if (prop.length > 1) {
                            cadena += " " + item[prop[0]][prop[1]].toLowerCase();
                        }
                        else {
                            cadena += " " + item[campos[l]].toLowerCase();
                        }
                    }
                    catch (e) { }
                }
                return cadena.includes(termino.toLowerCase());
            });
            arregloResultados.push(listaFiltrada);
        };
        var this_1 = this;
        for (var i in parametros) {
            _loop_1(i);
        }
        if (arregloResultados.length > 1) {
            // Ordenamos Ascendente
            arregloResultados = arregloResultados.sort(function (a, b) { return a.length - b.length; });
            var filtro = arregloResultados[0];
            var match = [];
            for (var k = 1; k < arregloResultados.length; k++) {
                for (var i in arregloResultados[k]) {
                    for (var j in filtro) {
                        if (arregloResultados[k][i] === filtro[j]) {
                            match.push(filtro[j]);
                        }
                    }
                }
                ;
            }
            this.pedidos[this.pedidoActivo].filtro.lista = match;
        }
        else {
            this.pedidos[this.pedidoActivo].filtro.lista = arregloResultados[0];
        }
        this.pedidos[this.pedidoActivo].filtro.indexar(false);
        this.pedidos[this.pedidoActivo].filtro.paginacion.paginaActual = 1;
        this.pedidos[this.pedidoActivo].filtro.listar(1);
    };
    //Harima: necesitamos eliminar también de la lista de claves agregadas
    FormInsumosComponent.prototype.eliminarInsumo = function (item, index, filtro) {
        if (filtro === void 0) { filtro = false; }
        //Harima: eliminar el elemento en la lista de claves agregadas, para poder agregarla de nuevo si se desea
        var i = this.listaClaveAgregadas.indexOf(item.clave);
        this.listaClaveAgregadas.splice(i, 1);
        //Harima: si no es el filtro(busqueda), borrar de la lista principal de insumos
        if (!filtro) {
            this.pedidos[this.pedidoActivo].eliminarItem(item, index);
        }
        else {
            this.pedidos[this.pedidoActivo].filtro.eliminarItem(item, index);
        }
    };
    FormInsumosComponent.prototype.mostrarFichaInformativa = function (e, clave) {
        e.preventDefault();
        e.stopPropagation();
        // Mostrar el componente de Ficha Informativa
        // Falta hacerlo sumamiiiii :)
        alert(clave);
        console.log(clave);
    };
    // # SECCION: Eventos del teclado
    FormInsumosComponent.prototype.keyboardInput = function (e) {
        if (e.keyCode == 32 && e.ctrlKey) {
            event.preventDefault();
            event.stopPropagation();
            this.mostrarModalInsumos = true;
        }
        // Cambiar página hacia adelante ctrl + shift + ->
        if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.pedidos[this.pedidoActivo].filtro.activo) {
                this.pedidos[this.pedidoActivo].paginaSiguiente();
            }
            else {
                this.pedidos[this.pedidoActivo].filtro.paginaSiguiente();
            }
        }
        // Cambiar página hacia adelante ctrl + shift + <-
        if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.pedidos[this.pedidoActivo].filtro.activo) {
                this.pedidos[this.pedidoActivo].paginaAnterior();
            }
            else {
                this.pedidos[this.pedidoActivo].filtro.paginaAnterior();
            }
        }
    };
    // # SECCION - Webworkers
    FormInsumosComponent.prototype.imprimir = function () {
        try {
            this.cargandoPdf = true;
            var pedidos_imprimir = {
                datos: { alamcen: 'colicitar', solicitante: 'unidad', observaciones: 'texto' },
                lista: this.pedidos[this.pedidoActivo].lista
            };
            this.pdfworker.postMessage(JSON.stringify(pedidos_imprimir));
        }
        catch (e) {
            this.cargandoPdf = false;
            console.log(e);
        }
    };
    FormInsumosComponent.prototype.base64ToBlob = function (base64, type) {
        var bytes = atob(base64), len = bytes.length;
        var buffer = new ArrayBuffer(len), view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++)
            view[i] = bytes.charCodeAt(i) & 0xff;
        return new Blob([buffer], { type: type });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], FormInsumosComponent.prototype, "insumos", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormGroup */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormGroup */]) === 'function' && _a) || Object)
    ], FormInsumosComponent.prototype, "movimiento", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormInsumosComponent.prototype, "onMovimientoSalida", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], FormInsumosComponent.prototype, "insumosAgregados", void 0);
    FormInsumosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'entradas-form-insumos',
            template: __webpack_require__(849),
            host: { '(window:keydown)': 'keyboardInput($event)' }
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* Location */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _d) || Object])
    ], FormInsumosComponent);
    return FormInsumosComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/form-insumos.component.js.map

/***/ }),

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormComponent = (function () {
    function FormComponent() {
        this.listaAgregados = [];
        this.insumosAgregadosEntrada = [];
        this.onEnviar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onRegresar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCargarDatos = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FormComponent.prototype.ngOnInit = function () {
        console.log(this.insumosAgregadosEntrada);
        console.log(this.servidor_id);
    };
    FormComponent.prototype.enviar = function (insumosAgregadosForm) {
        this.onEnviar.emit(this.insumosAgregadosEntrada);
        console.log(this.insumosAgregadosEntrada);
        console;
    };
    FormComponent.prototype.regresar = function () {
        this.onRegresar.emit();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], FormComponent.prototype, "insumos", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]) === 'function' && _a) || Object)
    ], FormComponent.prototype, "movimiento", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "movimientoRepetido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "movimientoInvalido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "cargando", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "cargandoDatos", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "listaAgregados", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], FormComponent.prototype, "insumosForm", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], FormComponent.prototype, "onEnviar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onRegresar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onCargarDatos", void 0);
    FormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'entradas-form',
            template: __webpack_require__(850),
            styles: [__webpack_require__(810)]
        }), 
        __metadata('design:paramtypes', [])
    ], FormComponent);
    return FormComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/form.component.js.map

/***/ }),

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paginacion_paginacion__ = __webpack_require__(268);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Modelo; });

var ModeloFiltro = (function () {
    function ModeloFiltro() {
    }
    return ModeloFiltro;
}());
var Modelo = (function () {
    function Modelo(conFiltro) {
        if (conFiltro === void 0) { conFiltro = false; }
        this.lista = [];
        this.paginacion = new __WEBPACK_IMPORTED_MODULE_0__paginacion_paginacion__["a" /* Paginacion */]();
        this.activo = false;
        this.cargando = false;
        this.indexar = function (conLote) {
            if (conLote === void 0) { conLote = true; }
            if (conLote) {
                var contador = 1;
                for (var i in this.lista) {
                    this.lista[i].lote = contador++;
                }
            }
            this.paginacion.totalPaginas = Math.ceil(this.lista.length / this.paginacion.resultadosPorPagina);
            this.paginacion.indice = [];
            for (var i = 0; i < this.paginacion.totalPaginas; i++) {
                this.paginacion.indice.push(i + 1);
            }
        };
        this.listar = function (pagina) {
            if (pagina === void 0) { pagina = 1; }
            this.paginacion.paginaActual = pagina;
            var inicio = (this.paginacion.paginaActual - 1) * this.paginacion.resultadosPorPagina;
            var fin = inicio + this.paginacion.resultadosPorPagina;
            try {
                this.paginacion.lista = this.lista.slice(inicio, fin);
            }
            catch (e) {
                this.paginacion.lista = [];
            }
        };
        this.eliminarItem = function (item, index) {
            var contador = 0;
            for (var i in this.lista) {
                if (this.lista[i] === item) {
                    this.paginacion.lista.splice(index, 1);
                    this.lista.splice(contador, 1);
                    this.indexar();
                    //Harima: con esto calculamos el siguiente indice, de la lista total de elementos, a agregar al final de la página
                    var proximoIndice = (contador + (this.paginacion.resultadosPorPagina - index)) - 1;
                    //Harima:  si ese indice existe, lo agregamos al final de la pagina
                    if (this.lista[proximoIndice]) {
                        this.paginacion.lista.push(this.lista[proximoIndice]);
                    }
                    //Harima: Si la pagina quedo vacía, listamos la pagina anterior, en caso de que la página actual sea mayor a 1
                    if (this.paginacion.lista.length == 0) {
                        if (this.paginacion.paginaActual > 1) {
                            this.listar(this.paginacion.paginaActual - 1);
                        }
                        else {
                            this.listar(1);
                        }
                    }
                    //Harima: si el objeto padre esta inicializado, significa que se esta eliminando desde una busqueda, por tanto hay que eliminar también en el objeto padre
                    if (this.padre) {
                        //Harima: se obtiene el indice y la pagina del item eliminado
                        var indice = this.padre.lista.indexOf(item);
                        var pagina = Math.ceil(indice / this.padre.paginacion.resultadosPorPagina);
                        //Harima: se calcula el indice que tiene el item en la pagina en la que se encuentra
                        var ajusteIndices = (pagina - 1) * this.padre.paginacion.resultadosPorPagina;
                        var indiceEnPagina = indice - ajusteIndices;
                        //Harima: eliminamos el elemento del padre, de ser necesario cambiamos de pagina
                        if (this.padre.paginacion.paginaActual == pagina) {
                            this.padre.eliminarItem(item, indiceEnPagina);
                        }
                        else {
                            var respaldoPagina = this.padre.paginacion.paginaActual;
                            this.padre.listar(pagina);
                            this.padre.eliminarItem(item, indiceEnPagina);
                            this.padre.listar(respaldoPagina);
                            //Harima: tenemos que checar si en la pagina actual del padre aun hay elementos, de lo contrario listamos la pagina anterior, cuando sea posible
                            if (this.padre.paginacion.lista.length == 0) {
                                if (this.padre.paginacion.paginaActual > 1) {
                                    this.padre.listar(this.padre.paginacion.paginaActual - 1);
                                }
                                else {
                                    this.padre.listar(1);
                                }
                            }
                        }
                    }
                    return;
                }
                contador++;
            }
        }; //Fin eliminarItem*/
        if (conFiltro) {
            this.filtro = new Modelo();
            //Harima: se asigna el Modelo actual como padre del filtro
            this.filtro.padre = this;
        }
    }
    Modelo.prototype.paginaSiguiente = function () {
        if (this.paginacion.paginaActual == this.paginacion.totalPaginas) {
            return;
        }
        this.listar(this.paginacion.paginaActual + 1);
    };
    Modelo.prototype.paginaAnterior = function () {
        if (this.paginacion.paginaActual == 1) {
            return;
        }
        this.listar(this.paginacion.paginaActual - 1);
    };
    return Modelo;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/modelo.js.map

/***/ }),

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Mov */
/* unused harmony export Movimiento */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Insumo; });
/* unused harmony export Informacion */
var Mov = (function () {
    function Mov() {
        this.cargando = false;
    }
    return Mov;
}());
var Movimiento = (function () {
    function Movimiento() {
    }
    return Movimiento;
}());
var Insumo = (function () {
    function Insumo() {
    }
    return Insumo;
}());
var Informacion = (function () {
    function Informacion() {
    }
    return Informacion;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/movimiento.js.map

/***/ }),

/***/ 622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovimientosEntradasRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var routes = [
    { path: 'farmacia/movimientos', redirectTo: 'farmacia/movimientos/entradas', pathMatch: 'full' },
    {
        path: 'farmacia/movimientos',
        children: [
            { path: 'entradas', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'entradas/nuevo', component: __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__["a" /* NuevoComponent */] }
        ],
        canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard_service__["a" /* AuthGuard */]]
    }
];
var MovimientosEntradasRoutingModule = (function () {
    function MovimientosEntradasRoutingModule() {
    }
    MovimientosEntradasRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], MovimientosEntradasRoutingModule);
    return MovimientosEntradasRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/movimientos-entradas-routing.module.js.map

/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buscar_insumos_movimientos_buscar_insumos_movimientos_module__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index_farmacia_index_farmacia_module__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__movimientos_entradas_routing_module__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lista_lista_component__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuevo_nuevo_component__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__form_form_component__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__form_form_datos_component__ = __webpack_require__(617);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__form_form_insumos_component__ = __webpack_require__(618);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovimientosEntradasModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MovimientosEntradasModule = (function () {
    function MovimientosEntradasModule() {
    }
    MovimientosEntradasModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_6__movimientos_entradas_routing_module__["a" /* MovimientosEntradasRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_5__index_farmacia_index_farmacia_module__["a" /* IndexFarmaciaModule */],
                __WEBPACK_IMPORTED_MODULE_3__paginacion_paginacion_module__["a" /* PaginacionModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__buscar_insumos_movimientos_buscar_insumos_movimientos_module__["a" /* BuscarInsumosMovimientosModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__lista_lista_component__["a" /* ListaComponent */],
                __WEBPACK_IMPORTED_MODULE_8__nuevo_nuevo_component__["a" /* NuevoComponent */],
                __WEBPACK_IMPORTED_MODULE_9__form_form_component__["a" /* FormComponent */],
                __WEBPACK_IMPORTED_MODULE_10__form_form_datos_component__["a" /* FormDatosComponent */],
                __WEBPACK_IMPORTED_MODULE_11__form_form_insumos_component__["a" /* FormInsumosComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MovimientosEntradasModule);
    return MovimientosEntradasModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/movimientos-entradas.module.js.map

/***/ }),

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuLateralComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuLateralComponent = (function () {
    function MenuLateralComponent() {
    }
    MenuLateralComponent.prototype.ngOnInit = function () {
    };
    MenuLateralComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu-lateral',
            template: __webpack_require__(854),
            styles: [__webpack_require__(814)]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuLateralComponent);
    return MenuLateralComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/menu-lateral.component.js.map

/***/ }),

/***/ 625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paginacion_paginacion__ = __webpack_require__(268);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pedido; });

var PedidoFiltro = (function () {
    function PedidoFiltro() {
    }
    return PedidoFiltro;
}());
var Pedido = (function () {
    function Pedido(conFiltro) {
        if (conFiltro === void 0) { conFiltro = false; }
        this.lista = [];
        this.paginacion = new __WEBPACK_IMPORTED_MODULE_0__paginacion_paginacion__["a" /* Paginacion */]();
        this.activo = false;
        this.cargando = false;
        this.indexar = function (conLote) {
            if (conLote === void 0) { conLote = true; }
            if (conLote) {
                var contador = 1;
                for (var i in this.lista) {
                    this.lista[i].lote = contador++;
                }
            }
            this.paginacion.totalPaginas = Math.ceil(this.lista.length / this.paginacion.resultadosPorPagina);
            this.paginacion.indice = [];
            for (var i = 0; i < this.paginacion.totalPaginas; i++) {
                this.paginacion.indice.push(i + 1);
            }
        };
        this.listar = function (pagina) {
            if (pagina === void 0) { pagina = 1; }
            this.paginacion.paginaActual = pagina;
            var inicio = (this.paginacion.paginaActual - 1) * this.paginacion.resultadosPorPagina;
            var fin = inicio + this.paginacion.resultadosPorPagina;
            try {
                this.paginacion.lista = this.lista.slice(inicio, fin);
            }
            catch (e) {
                this.paginacion.lista = [];
            }
        };
        this.eliminarItem = function (item, index) {
            var contador = 0;
            for (var i in this.lista) {
                if (this.lista[i] === item) {
                    this.paginacion.lista.splice(index, 1);
                    this.lista.splice(contador, 1);
                    this.indexar();
                    //Harima: con esto calculamos el siguiente indice, de la lista total de elementos, a agregar al final de la página
                    var proximoIndice = (contador + (this.paginacion.resultadosPorPagina - index)) - 1;
                    //Harima:  si ese indice existe, lo agregamos al final de la pagina
                    if (this.lista[proximoIndice]) {
                        this.paginacion.lista.push(this.lista[proximoIndice]);
                    }
                    //Harima: Si la pagina quedo vacía, listamos la pagina anterior, en caso de que la página actual sea mayor a 1
                    if (this.paginacion.lista.length == 0) {
                        if (this.paginacion.paginaActual > 1) {
                            this.listar(this.paginacion.paginaActual - 1);
                        }
                        else {
                            this.listar(1);
                        }
                    }
                    //Harima: si el objeto padre esta inicializado, significa que se esta eliminando desde una busqueda, por tanto hay que eliminar también en el objeto padre
                    if (this.padre) {
                        //Harima: se obtiene el indice y la pagina del item eliminado
                        var indice = this.padre.lista.indexOf(item);
                        var pagina = Math.ceil(indice / this.padre.paginacion.resultadosPorPagina);
                        //Harima: se calcula el indice que tiene el item en la pagina en la que se encuentra
                        var ajusteIndices = (pagina - 1) * this.padre.paginacion.resultadosPorPagina;
                        var indiceEnPagina = indice - ajusteIndices;
                        //Harima: eliminamos el elemento del padre, de ser necesario cambiamos de pagina
                        if (this.padre.paginacion.paginaActual == pagina) {
                            this.padre.eliminarItem(item, indiceEnPagina);
                        }
                        else {
                            var respaldoPagina = this.padre.paginacion.paginaActual;
                            this.padre.listar(pagina);
                            this.padre.eliminarItem(item, indiceEnPagina);
                            this.padre.listar(respaldoPagina);
                            //Harima: tenemos que checar si en la pagina actual del padre aun hay elementos, de lo contrario listamos la pagina anterior, cuando sea posible
                            if (this.padre.paginacion.lista.length == 0) {
                                if (this.padre.paginacion.paginaActual > 1) {
                                    this.padre.listar(this.padre.paginacion.paginaActual - 1);
                                }
                                else {
                                    this.padre.listar(1);
                                }
                            }
                        }
                    }
                    return;
                }
                contador++;
            }
        };
        if (conFiltro) {
            this.filtro = new Pedido();
            //Harima: se asigna el pedido actual como padre del filtro
            this.filtro.padre = this;
        }
    }
    Pedido.prototype.paginaSiguiente = function () {
        if (this.paginacion.paginaActual == this.paginacion.totalPaginas) {
            return;
        }
        this.listar(this.paginacion.paginaActual + 1);
    };
    Pedido.prototype.paginaAnterior = function () {
        if (this.paginacion.paginaActual == 1) {
            return;
        }
        this.listar(this.paginacion.paginaActual - 1);
    };
    return Pedido;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/pedido.js.map

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedidosRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var routes = [
    { path: 'farmacia/pedidos', redirectTo: '/farmacia/pedidos/pendientes', pathMatch: 'full' },
    {
        path: 'farmacia/pedidos',
        children: [
            { path: 'pendientes', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'abiertos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'pendientes/en-proceso', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'pendientes/liberados', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'recibidos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'recibidos/completos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'recibidos/incompletos', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'nuevo', component: __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__["a" /* NuevoComponent */] },
        ],
        canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard_service__["a" /* AuthGuard */]]
    }
];
var PedidosRoutingModule = (function () {
    function PedidosRoutingModule() {
    }
    PedidosRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], PedidosRoutingModule);
    return PedidosRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/pedidos-routing.module.js.map

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedidosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PedidosComponent = (function () {
    function PedidosComponent() {
    }
    PedidosComponent.prototype.ngOnInit = function () { };
    PedidosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-pedidos',
            template: __webpack_require__(856),
            styles: [__webpack_require__(816)]
        }), 
        __metadata('design:paramtypes', [])
    ], PedidosComponent);
    return PedidosComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/pedidos.component.js.map

/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buscar_insumos_buscar_insumos_module__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pedidos_routing_module__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pedidos_component__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__menu_lateral_menu_lateral_component__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__nuevo_nuevo_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lista_lista_component__ = __webpack_require__(400);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedidosModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var PedidosModule = (function () {
    function PedidosModule() {
    }
    PedidosModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__["a" /* HubModule */],
                __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__["a" /* PerfilModule */],
                __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__["a" /* BloquearPantallaModule */],
                __WEBPACK_IMPORTED_MODULE_6__paginacion_paginacion_module__["a" /* PaginacionModule */],
                __WEBPACK_IMPORTED_MODULE_7__buscar_insumos_buscar_insumos_module__["a" /* BuscarInsumosModule */],
                __WEBPACK_IMPORTED_MODULE_9__pedidos_routing_module__["a" /* PedidosRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_8__index_farmacia_index_farmacia_module__["a" /* IndexFarmaciaModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_10__pedidos_component__["a" /* PedidosComponent */], __WEBPACK_IMPORTED_MODULE_11__menu_lateral_menu_lateral_component__["a" /* MenuLateralComponent */], __WEBPACK_IMPORTED_MODULE_12__nuevo_nuevo_component__["a" /* NuevoComponent */], __WEBPACK_IMPORTED_MODULE_13__lista_lista_component__["a" /* ListaComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], PedidosModule);
    return PedidosModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/pedidos.module.js.map

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedidosService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PedidosService = (function () {
    function PedidosService(http, jwtRequest) {
        this.http = http;
        this.jwtRequest = jwtRequest;
    }
    PedidosService.prototype.buscar = function (term, pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(PedidosService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    PedidosService.prototype.lista = function (pagina, resultados_por_pagina) {
        if (pagina === void 0) { pagina = 1; }
        if (resultados_por_pagina === void 0) { resultados_por_pagina = 20; }
        return this.jwtRequest.get(PedidosService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map(function (response) { return response.json().data; });
    };
    PedidosService.prototype.ver = function (id) {
        return this.jwtRequest.get(PedidosService.URL, id, {}).map(function (response) {
            var jsonData = response.json().data;
            /* var roles:string[] = []
             jsonData.roles.map(item => {
               roles.push(""+item.id)
             })*/
            var pedido = jsonData;
            //usuario.roles = roles;
            return pedido;
        });
    };
    PedidosService.prototype.crear = function (pedido) {
        return this.jwtRequest.post(PedidosService.URL, pedido).map(function (response) { return response.json().data; });
    };
    PedidosService.prototype.editar = function (id, pedido) {
        return this.jwtRequest.put(PedidosService.URL, id, pedido).map(function (response) { return response.json().data; });
    };
    PedidosService.prototype.eliminar = function (id) {
        return this.jwtRequest.delete(PedidosService.URL, id).map(function (response) { return response.json().data; });
    };
    PedidosService.URL = "pedidos";
    PedidosService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__jwt_request_service__["a" /* JwtRequestService */]) === 'function' && _b) || Object])
    ], PedidosService);
    return PedidosService;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/pedidos.service.js.map

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HubComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HubComponent = (function () {
    function HubComponent() {
        this.mostrar = false;
    }
    HubComponent.prototype.ngOnInit = function () {
    };
    HubComponent.prototype.toggle = function () {
        this.mostrar = !this.mostrar;
    };
    HubComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-hub',
            template: __webpack_require__(857),
            styles: [__webpack_require__(817)]
        }), 
        __metadata('design:paramtypes', [])
    ], HubComponent);
    return HubComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/hub.component.js.map

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginacionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PaginacionComponent = (function () {
    function PaginacionComponent() {
        this.onSiguiente = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onAnterior = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onListar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PaginacionComponent.prototype.ngOnInit = function () {
    };
    PaginacionComponent.prototype.siguiente = function () {
        console.log("siguiente");
        this.onSiguiente.emit();
    };
    PaginacionComponent.prototype.anterior = function () {
        console.log("anterior");
        this.onAnterior.emit();
    };
    PaginacionComponent.prototype.listar = function (pag) {
        if (pag === void 0) { pag = 1; }
        console.log("listar:" + pag);
        this.onListar.emit(pag);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], PaginacionComponent.prototype, "total", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], PaginacionComponent.prototype, "paginasTotales", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], PaginacionComponent.prototype, "resultadosPorPagina", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], PaginacionComponent.prototype, "paginaActual", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], PaginacionComponent.prototype, "indicePaginas", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], PaginacionComponent.prototype, "onSiguiente", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], PaginacionComponent.prototype, "onAnterior", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], PaginacionComponent.prototype, "onListar", void 0);
    PaginacionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'paginacion',
            template: __webpack_require__(860),
            styles: [__webpack_require__(820)]
        }), 
        __metadata('design:paramtypes', [])
    ], PaginacionComponent);
    return PaginacionComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/paginacion.component.js.map

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuAsideComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuAsideComponent = (function () {
    function MenuAsideComponent() {
    }
    MenuAsideComponent.prototype.ngOnInit = function () {
    };
    MenuAsideComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'panel-control-menu-aside',
            template: __webpack_require__(861),
            styles: [__webpack_require__(821)]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuAsideComponent);
    return MenuAsideComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/menu-aside.component.js.map

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuComponent = (function () {
    function MenuComponent() {
        this.mostrarMenuAside = false;
        this.usuario = {};
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    };
    MenuComponent.prototype.toggleMenuAside = function () {
        this.mostrarMenuAside = !this.mostrarMenuAside;
    };
    MenuComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'panel-control-menu',
            template: __webpack_require__(862),
            styles: [__webpack_require__(822)]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/menu.component.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormComponent = (function () {
    function FormComponent() {
        this.onEnviar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onRegresar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onToggleCambiarPassword = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCargarRoles = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FormComponent.prototype.ngOnInit = function () {
    };
    FormComponent.prototype.enviar = function () {
        this.onEnviar.emit();
    };
    FormComponent.prototype.cargarRoles = function () {
        this.onCargarRoles.emit();
    };
    FormComponent.prototype.regresar = function () {
        this.onRegresar.emit();
    };
    FormComponent.prototype.toggleCambiarPassword = function () {
        this.onToggleCambiarPassword.emit();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], FormComponent.prototype, "roles", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]) === 'function' && _a) || Object)
    ], FormComponent.prototype, "usuario", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "usuarioRepetido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "usuarioInvalido", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "cargando", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "cargandoRoles", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], FormComponent.prototype, "mostrarCambiarPassword", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onEnviar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onRegresar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onToggleCambiarPassword", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "onCargarRoles", void 0);
    FormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'panel-control-usuarios-form',
            template: __webpack_require__(864),
            styles: [__webpack_require__(824)]
        }), 
        __metadata('design:paramtypes', [])
    ], FormComponent);
    return FormComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/form.component.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__editar_editar_component__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuariosRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var routes = [
    { path: 'panel-control', redirectTo: '/panel-control/usuarios', pathMatch: 'full' },
    {
        path: 'panel-control/usuarios',
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_2__lista_lista_component__["a" /* ListaComponent */] },
            { path: 'nuevo', component: __WEBPACK_IMPORTED_MODULE_3__nuevo_nuevo_component__["a" /* NuevoComponent */] },
            { path: 'editar/:id', component: __WEBPACK_IMPORTED_MODULE_4__editar_editar_component__["a" /* EditarComponent */] },
        ],
        canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]]
    }
];
var UsuariosRoutingModule = (function () {
    function UsuariosRoutingModule() {
    }
    UsuariosRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], UsuariosRoutingModule);
    return UsuariosRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/usuarios-routing.module.js.map

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__usuarios_routing_module__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__paginacion_paginacion_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__menu_menu_component__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__menu_aside_menu_aside_component__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lista_lista_component__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nuevo_nuevo_component__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__editar_editar_component__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__usuarios_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__roles_roles_service__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__form_form_component__ = __webpack_require__(634);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuariosModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var UsuariosModule = (function () {
    function UsuariosModule() {
    }
    UsuariosModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__usuarios_routing_module__["a" /* UsuariosRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__hub_hub_module__["a" /* HubModule */],
                __WEBPACK_IMPORTED_MODULE_4__perfil_perfil_module__["a" /* PerfilModule */],
                __WEBPACK_IMPORTED_MODULE_5__bloquear_pantalla_bloquear_pantalla_module__["a" /* BloquearPantallaModule */],
                __WEBPACK_IMPORTED_MODULE_7__paginacion_paginacion_module__["a" /* PaginacionModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_8__menu_menu_component__["a" /* MenuComponent */], __WEBPACK_IMPORTED_MODULE_9__menu_aside_menu_aside_component__["a" /* MenuAsideComponent */], __WEBPACK_IMPORTED_MODULE_10__lista_lista_component__["a" /* ListaComponent */], __WEBPACK_IMPORTED_MODULE_11__nuevo_nuevo_component__["a" /* NuevoComponent */], __WEBPACK_IMPORTED_MODULE_12__editar_editar_component__["a" /* EditarComponent */], __WEBPACK_IMPORTED_MODULE_16__form_form_component__["a" /* FormComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_13__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_14__usuarios_service__["a" /* UsuariosService */], __WEBPACK_IMPORTED_MODULE_15__roles_roles_service__["a" /* RolesService */]],
        }), 
        __metadata('design:paramtypes', [])
    ], UsuariosModule);
    return UsuariosModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/usuarios.module.js.map

/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_auth_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_bloquear_pantalla_service__ = __webpack_require__(190);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PerfilComponent = (function () {
    function PerfilComponent(router, authService, bloquearPantallaService) {
        this.router = router;
        this.authService = authService;
        this.bloquearPantallaService = bloquearPantallaService;
        this.mostrar = false;
        this.usuario = {};
    }
    PerfilComponent.prototype.ngOnInit = function () {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    };
    PerfilComponent.prototype.toggle = function () {
        this.mostrar = !this.mostrar;
    };
    PerfilComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    PerfilComponent.prototype.bloquear = function () {
        this.bloquearPantallaService.bloquearPantalla();
        this.mostrar = false;
    };
    PerfilComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-perfil',
            template: __webpack_require__(867),
            styles: [__webpack_require__(827)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_app_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_bloquear_pantalla_service__["a" /* BloquearPantallaService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_bloquear_pantalla_service__["a" /* BloquearPantallaService */]) === 'function' && _c) || Object])
    ], PerfilComponent);
    return PerfilComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/perfil.component.js.map

/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarModuloPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BuscarModuloPipe = (function () {
    function BuscarModuloPipe() {
    }
    BuscarModuloPipe.prototype.transform = function (value, term) {
        return value.filter(function (item) {
            return item.titulo.toLowerCase().includes(term.toLowerCase());
        });
    };
    BuscarModuloPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'buscarModulo'
        }), 
        __metadata('design:paramtypes', [])
    ], BuscarModuloPipe);
    return BuscarModuloPipe;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/buscar-modulo.pipe.js.map

/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__not_found_not_found_component__ = __webpack_require__(403);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WildcardRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var routes = [
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_2__not_found_not_found_component__["a" /* NotFoundComponent */] }
];
var WildcardRoutingModule = (function () {
    function WildcardRoutingModule() {
    }
    WildcardRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WildcardRoutingModule);
    return WildcardRoutingModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/wildcard-routing.module.js.map

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(1128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/polyfills.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('token')) {
            return true;
        }
        // Si llega a este punto no está loggeado lo mandamos a login pero con el url ingresado
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/auth-guard.service.js.map

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".mensaje-agregar {\n    position:absolute; width: auto;  bottom:0em; right:1em;\n    opacity: 0;\n    animation: mostrar 0.2s forwards ease-out;\n    -webkit-animation: mostrar 0.2s forwards ease-out;\n}\n\n\n@-webkit-keyframes mostrar {\n    0%   {  bottom:0em; opacity:0.0; }\n    100% {  bottom:3em; opacity:1.0; }\n}\n\n\n@keyframes mostrar {\n    0%   {  bottom:0em; opacity:0.0; }\n    100% {  bottom:3em; opacity:1.0; }\n}\n\n.item-seleccionado {\n    background: #F5F5F5 !important; font-weight: bold !important;\n}\n\n.is-disabled{\n    color: #DDDDDD;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".mensaje-agregar {\n    position:absolute; width: auto;  bottom:0em; right:1em;\n    opacity: 0;\n    animation: mostrar 0.2s forwards ease-out;\n    -webkit-animation: mostrar 0.2s forwards ease-out;\n}\n\n\n@-webkit-keyframes mostrar {\n    0%   {  bottom:0em; opacity:0.0; }\n    100% {  bottom:3em; opacity:1.0; }\n}\n\n\n@keyframes mostrar {\n    0%   {  bottom:0em; opacity:0.0; }\n    100% {  bottom:3em; opacity:1.0; }\n}\n\n.item-seleccionado {\n    background: #F5F5F5 !important; font-weight: bold !important;\n}\n\n.is-disabled{\n    color: #DDDDDD;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".bulma-select-multiple {\n    width:100%; font-size: 1em; border-color: #ddd; border-radius: 0.15em;box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n}\n.bulma-select-multiple:focus {\n    border-color: #00d1b2;\n    outline: none;\n}\n\n.bulma-select-multiple.is-warning {\n    width:100%; font-size: 1em; border-color: #ffdd57; border-radius: 0.15em;box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 803:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".top-bar {\n    padding: 1em ; \n    font-size: 1.2em; \n    background: #FFF;    \n    color: #333;\n}\n.contenedor-pedido.con-tabs .top-bar {\n    padding: 0.5em ; \n}\n.top-bar.is-primary {\n    background: #00d1b2;\n    color:#FFF\n}\n.top-bar.is-dark {\n    background: #333;\n    color:#FFF\n}\n.contenedor-pedido {\n    background: #FFF; border-radius: 1em; overflow: hidden;\n}\n.contenedor-pedido.con-tabs {\n    border-top-left-radius: 0px !important;\n    border-top-right-radius: 0px !important;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".item{ width: 100%; text-align: center; display:block; font-size: 0.8em; }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".top-nav { position: fixed; width: 100%;top:0px; z-index:99; background: #00d1b2; }\n\n\nnav {\n    background-color:#00d1b2;\n    color: #FFF !important;\n}\na.nav-hub-active { background:rgba(0,0,0,0.05);}\na.nav-hub-active:hover { background:rgba(0,0,0,0.1);}\nnav a { color: #FFF ; color: rgba(255,255,255,0.9)  !important;}\nnav a:hover { color: #FFF !important;}\nnav .title  { color:#FFF;}\nnav a .title { color:#FFF; color: rgba(255,255,255,0.9)  !important;}\n\nnav a:hover .title { color:#FFF !important; }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 810:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 811:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 815:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".top-bar {\n    padding: 1em ; \n    font-size: 1.2em; \n    background: #FFF;    \n    color: #333;\n}\n.contenedor-pedido.con-tabs .top-bar {\n    padding: 0.5em ; \n}\n.top-bar.is-primary {\n    background: #00d1b2;\n    color:#FFF\n}\n.top-bar.is-dark {\n    background: #333;\n    color:#FFF\n}\n.contenedor-pedido {\n    background: #FFF; border-radius: 1em; overflow: hidden;\n}\n.contenedor-pedido.con-tabs {\n    border-top-left-radius: 0px !important;\n    border-top-right-radius: 0px !important;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 817:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".hub-item{ width: 100%; text-align: center; display:block; color:#FFF !important; font-size: 0.8em; }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".login-background {\n    /*background-color: #00d1b2;*/\n    background-color: #AABBBC;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paginacion_component__ = __webpack_require__(631);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginacionModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaginacionModule = (function () {
    function PaginacionModule() {
    }
    PaginacionModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__paginacion_component__["a" /* PaginacionComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__paginacion_component__["a" /* PaginacionComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], PaginacionModule);
    return PaginacionModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/paginacion.module.js.map

/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".bulma-select-multiple {\n    width:100%; font-size: 1em; border-color: #ddd; border-radius: 0.15em;box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n}\n.bulma-select-multiple:focus {\n    border-color: #00d1b2;\n    outline: none;\n}\n\n.bulma-select-multiple.is-warning {\n    width:100%; font-size: 1em; border-color: #ffdd57; border-radius: 0.15em;box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 826:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 832:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n<app-bloquear-pantalla></app-bloquear-pantalla>"

/***/ }),

/***/ 833:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal\" [ngClass]=\"{'is-active': mostrar}\">\n  <div class=\"modal-background\" style=\"background:rgba(0,0,0,0.9)!important;\"></div>\n  <div class=\"modal-content\">\n    <div class=\"card\" style=\" border-radius:1em; overflow: hidden\">\n      <div class=\"card-image\" >\n          <figure class=\"image \" style=\"border-radius: 1em 1em 0em 0em; overflow: hidden;\">\n              <img src=\"assets/bg-lockscreen.svg\" alt=\"Image\">\n          </figure>\n          \n          <button class=\"button is-primary is-inverted\"  (click)=\"logout()\" style=\"position:absolute; top:1em; right:1em;\"><span class=\"icon\"><i class=\"fa fa-sign-out\"></i></span> <span>Salir</span></button>\n      </div>\n      <div class=\"card-content has-text-centered\">\n          <form name=\"form\" (ngSubmit)=\"!loading && login()\">\n            <div class=\"notification is-danger\" *ngIf=\"mostrarMensaje\">\n                <a class=\"delete\" (click)=\"mostrarMensaje = false\"></a>\n                <b>Error:</b> {{ mensaje }}\n            </div>\n            <nav class=\"level\">\n              <div class=\"level-item has-text-centered\">\n                <figure class=\"image is-128x128\" >\n                  <img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\">\n                  <span class=\"icon is-large\" style=\"position: absolute; top: 0px; right:0px;\"><i class=\"fa fa-lock\"></i></span>\n                </figure>\n              </div>\n            </nav>\n            <h1 class=\"title\">{{ usuario.nombre }} {{ usuario.apellidos }}</h1>\n            <h2 class=\"subtitle\"><span class=\"icon\"><i class=\"fa fa-user-circle\"></i></span> {{usuario.id}}</h2>\n            <p class=\"control has-icon\">\n                <input class=\"input is-medium\" [ngClass]=\"{'is-danger': mensaje}\" type=\"password\" name=\"password\" id=\"password\" placeholder=\"Contraseña\" [(ngModel)]=\"credenciales.password\">\n                <span class=\"icon is-small\">\n                <i class=\"fa fa-lock\"></i>\n                </span>\n            </p>\n            <button class=\"button is-primary is-medium is-fullwidth\" [ngClass]=\"{'is-loading': loading}\"><span class=\"icon\"><i class=\"fa fa-unlock\"></i></span><span>Desbloquear</span></button>\n          </form>\n      </div>\n      \n    </div>\n    \n  </div>\n</div>"

/***/ }),

/***/ 834:
/***/ (function(module, exports) {

module.exports = "<section class=\"hero is-primary\" style=\"position: fixed; width: 100%;top:0px; z-index:99\">\n    <div class=\"hero-head\">\n        <div class=\"container is-fluid\">\n            <nav class=\"nav is-primary\">\n                <div class=\"nav-left\">\n                    <a class=\"nav-item is-brand\" routerLink=\"/dashboard\" routerLinkActive=\"active\">\n                    <!--<img src=\"http://bulma.io/images/bulma-type.png\" alt=\"Bulma logo\">-->\n                    <span class=\"icon\">\n                        <i class=\"fa fa-tachometer\"></i>\n                    </span> \n                     <h1 class=\"title\">&nbsp;Dashboard</h1>\n                    </a>\n                </div>\n\n                <a class=\"nav-item\"  (click)=\"hub.toggle()\">\n                    <span class=\"icon\">\n                        <i class=\"fa fa-th\"></i>\n                    </span>\n                </a>\n\n                <a class=\"nav-item is-hidden-mobile\" (click)=\"perfil.toggle()\">                    \n                    <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n                    &nbsp;\n                    <span>{{ usuario.nombre }} {{ usuario.apellidos }}</span>\n                </a>\n                <a class=\"nav-item is-hidden-tablet\" (click)=\"perfil.toggle()\">\n                    \n                    <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n                </a>\n               \n                \n            </nav>\n        </div>\n    </div>\n</section>\n\n<app-hub #hub></app-hub>\n<app-perfil #perfil></app-perfil>"

/***/ }),

/***/ 835:
/***/ (function(module, exports) {

module.exports = "\n    <div class=\"modal is-active\" >\n      <div class=\"modal-background\" (click)=\"cerrar()\"></div>\n      <div class=\"modal-card\" style=\"width:95%; height: 100%;\">\n      \n        <header class=\"modal-card-head\" style=\"background: #00d1b2;\">\n          \n                        \n          <div class=\"container is-fluid\"  style=\"width:100%;\">\n              <h1 class=\"title\" style=\"color:#FFF;\">\n                <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Insumos médicos \n              </h1>\n              <p class=\"control is-expanded\">\n                  <input class=\"input \"  type=\"text\" placeholder=\"Buscar insumo\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n              </p>\n          </div>            \n          <a class=\"button  is-primary\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"cerrar()\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n        </header>\n        <section class=\"modal-card-body\" style=\"padding:0px;\" >\n          \n          <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n              <br>\n              <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n              <br>\n              <br>\n          </div>\n          <!-- TABLA -->\n          <table class=\"table\" *ngIf=\"!cargando\" style=\"font-size: 0.8em;\" >\n            <thead>\n            \n                <tr>\n                <th></th>\n                <th class=\"is-hidden-mobile\">Clave</th>\n                <th>Generico</th>\n                <th class=\"is-hidden-mobile\">Descripción</th>\n                <th style=\"text-align:center\" class=\"is-hidden-mobile\">Grupo(s)</th>\n                <th style=\"text-align:center\"><abbr title=\"Tipo de insumo\">Tipo</abbr></th>\n                <th style=\"text-align:center\"><abbr title=\"Información\">Info</abbr></th>\n                \n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let item of insumos\" class=\"is-unselectable\" [ngClass]=\"{'item-seleccionado': item == insumoSeleccionado, 'is-disabled': (listaAgregados.indexOf(item.clave) >= 0)}\" style=\"cursor: pointer\" (click)=\"seleccionar(item)\">\n                  <td valign=\"middle\">\n                    <span *ngIf=\"item != insumoSeleccionado\" class=\"icon is-small\" style=\"color:#999\"><i class=\"fa fa-circle-thin\"></i></span>\n                    <span *ngIf=\"item == insumoSeleccionado\" class=\"icon is-small\" style=\"color:#00d1b2\"><i class=\"fa fa-check-circle\"></i></span>\n                  </td>                      \n                  <td class=\"is-hidden-mobile\">{{ item.clave }}</td>\n                  <td >\n                    <small class=\"is-hidden-tablet\">{{ item.clave }} <br></small>\n                    <b>{{ item.generico_nombre }}</b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                    \n                    <div class=\"is-hidden-tablet\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div class=\"is-hidden-tablet\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div class=\"is-hidden-tablet\" style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      \n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n\n                  <td class=\"is-hidden-mobile\">\n                    <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n                  <td style=\"text-align:center;\" class=\"is-hidden-mobile\">\n                    <span *ngFor=\"let grupo of item.generico.grupos\">{{grupo.nombre}}<br></span>\n                  </td>\n                  <td style=\"text-align:center;\">\n                    <b>\n                      <abbr *ngIf=\"item.tipo == 'ME'\" title=\"Medicamento\">ME</abbr>\n                      <abbr *ngIf=\"item.tipo == 'MC'\" title=\"Material de curación\">MC</abbr>\n                      <abbr *ngIf=\"item.tipo == 'AD'\" title=\"Auxiliar de diagnóstico\">AD</abbr>\n                    </b>\n                  </td>\n                  <td style=\"text-align:center\">\n                    <a (click)=\"mostrarFichaInformativa($event,item.clave)\"><span class=\"icon\"><i class=\"fa fa-info-circle\"></i></span></a>\n                  </td>\n\n                </tr>  \n                <tr *ngIf=\"insumos.length == 0 && searchBox.value != ''\">\n                    <td colspan=\"7\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n                </tr>\n                <tr *ngIf=\"insumos.length == 0 && searchBox.value == '' \">\n                    <td colspan=\"7\" style=\"vertical-align: middle; color:#888;\">Por favor escriba en el campo de búsqueda para encontrar insumos.</td>                    \n                </tr>      \n            </tbody>  \n          </table>\n        <br>\n                \n        </section>\n        <footer class=\"\" style=\"position:relative; padding:1em;background: #FFF; border-top:1px solid #EEE; border-radius:0 0 0.8em 0.8em \" >\n          \n          <paginacion \n                    [total]=\"total\" \n                    [paginasTotales]=\"paginasTotales\" \n                    [resultadosPorPagina]=\"resultadosPorPagina\" \n                    [paginaActual]=\"paginaActual\" \n                    [indicePaginas]=\"indicePaginas\"\n                    (onSiguiente)=\"paginaSiguiente(searchBox.value)\" \n                    (onAnterior)=\"paginaAnterior(searchBox.value)\" \n                    (onListar)=\"listar(searchBox.value,$event)\" \n                    *ngIf=\"total > 0 && total > resultadosPorPagina \"></paginacion>\n\n        \n            \n          <div class=\"notification is-dark is-unselectable mensaje-agregar\" [ngClass]=\"{ 'mostrar': mensajeAgregado.mostrar}\"    *ngIf=\"mensajeAgregado.mostrar\" (click)=\"mensajeAgregado.mostrar=false\">\n            <span class=\"icon\"><i class=\"fa fa-check-circle\"></i></span> <span>Agregado</span>\n          </div>\n\n          <!-- FORMULARIO del insumo-->\n          <form (submit)=\"enviar($event)\" >\n            <div class=\"control is-grouped is-pulled-right \" >\n            <p class=\"control is-expanded\">\n                <input class=\"input is-medium\" [disabled]=\"insumoSeleccionado == null\" type=\"text\" placeholder=\"Cantidad\" #cantidadBox id=\"cantidad\" (keyup)=\"comprobarCantidad(cantidadBox.value)\" >\n            </p>\n            <!--<p class=\"control is-expanded \">\n              <input class=\"input\" autofocus type=\"text\" [ngClass]=\"{'is-danger': insumoForm.controls('lote').hasError('required') && insumoForm.controls.lote.touched}\"  placeholder=\"Folio de pedido\" formControlName=\"folio_pedido\">\n              <span class=\"icon is-small\" *ngIf=\"insumoForm.controls.lote.hasError('required') && insumoForm.controls.lote.touched\">\n                <i class=\"fa fa-warning\"></i>\n              </span>\n              <span class=\"help is-danger\" *ngIf=\"insumoForm.controls.lote.hasError('required') && insumoForm.controls.lote.touched\">Este campo es requerido.</span>\n            </p> -->\n            <p class=\"control is-expanded\">\n              <input class=\"input is-medium\" [disabled]=\"insumoSeleccionado == null\" type=\"text\" placeholder=\"Lote\" #loteBox id=\"lote\" >\n            </p>\n            <p class=\"control is-expanded\">\n              <input class=\"input is-medium\" [disabled]=\"insumoSeleccionado == null\" type=\"date\" placeholder=\"Fecha de caducidad\" #fechaBox id=\"fecha_caducidad\" >\n            </p>\n            <p class=\"control is-expanded\">\n                <input class=\"input is-medium\" [disabled]=\"insumoSeleccionado == null\" type=\"text\" placeholder=\"Codigo de barras\" #codigoBarrasBox id=\"codigo_barras\" >\n            </p>\n            <p class=\"control\">\n                <button [disabled]=\"!cantidadValida\" class=\"button is-medium is-primary \" >\n                <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Agregar</span>\n                </button>\n            </p>\n          </div>\n          </form>\n          \n\n        </footer>\n          \n        <div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n            <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n            <b>Error:</b> {{ mensajeError.texto }}\n        </div>\n      </div>\n    </div>"

/***/ }),

/***/ 836:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal is-active\" >\n  <div class=\"modal-background\" (click)=\"cerrar()\"></div>\n  <div class=\"modal-card\" style=\"width:95%; height: 100%;\">\n   \n    <header class=\"modal-card-head\" style=\"background: #00d1b2;\">\n      \n                    \n      <div class=\"container is-fluid\"  style=\"width:100%;\">\n          <h1 class=\"title\" style=\"color:#FFF;\">\n            <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Insumos médicos \n          </h1>\n          <p class=\"control is-expanded\">\n              <input class=\"input \"  type=\"text\" placeholder=\"Buscar insumo\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n          </p>\n      </div>            \n      <a class=\"button  is-primary\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"cerrar()\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n    </header>\n    <section class=\"modal-card-body\" style=\"padding:0px;\" >\n      \n      <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n          <br>\n          <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n          <br>\n          <br>\n      </div>\n      <table class=\"table\" *ngIf=\"!cargando\" style=\"font-size: 0.8em;\" >\n        <thead>\n        \n            <tr>\n            <th></th>\n            <th class=\"is-hidden-mobile\">Clave</th>\n            <th>Generico</th>\n            <th class=\"is-hidden-mobile\">Descripción</th>\n            <th style=\"text-align:center\" class=\"is-hidden-mobile\">Grupo(s)</th>\n            <th style=\"text-align:center\"><abbr title=\"Tipo de insumo\">Tipo</abbr></th>\n            <th style=\"text-align:center\"><abbr title=\"Información\">Info</abbr></th>\n            \n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let item of insumos\" class=\"is-unselectable\" [ngClass]=\"{'item-seleccionado': item == insumoSeleccionado, 'is-disabled': (listaAgregados.indexOf(item.clave) >= 0)}\" style=\"cursor: pointer\" (click)=\"seleccionar(item)\">\n              <td valign=\"middle\">\n                <span *ngIf=\"item != insumoSeleccionado\" class=\"icon is-small\" style=\"color:#999\"><i class=\"fa fa-circle-thin\"></i></span>\n                <span *ngIf=\"item == insumoSeleccionado\" class=\"icon is-small\" style=\"color:#00d1b2\"><i class=\"fa fa-check-circle\"></i></span>\n              </td>                      \n              <td class=\"is-hidden-mobile\">{{ item.clave }}</td>\n              <td >\n                <small class=\"is-hidden-tablet\">{{ item.clave }} <br></small>\n                <b>{{ item.generico_nombre }}</b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                \n                <div class=\"is-hidden-tablet\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                  <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                  <small><i>{{ item.informacion.contenido }} </i></small>\n                </div>\n                <div class=\"is-hidden-tablet\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                  <small>{{ item.descripcion }}</small>\n                </div>\n                <div class=\"is-hidden-tablet\" style=\"padding: 0.5em 0 0.5em 0; \">\n                  <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                  <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                  <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                  \n                  <span *ngIf=\"item.tipo == 'ME'\">\n                    <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                    <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                  </span>\n                  \n                </div>\n              </td> \n\n              <td class=\"is-hidden-mobile\">\n                <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                  <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                  <small><i>{{ item.informacion.contenido }} </i></small>\n                </div>\n                <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                  <small>{{ item.descripcion }}</small>\n                </div>\n                <div style=\"padding: 0.5em 0 0.5em 0; \">\n                  <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                  <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                  <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                  <span *ngIf=\"item.tipo == 'ME'\">\n                    <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                    <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                  </span>\n                  \n                </div>\n              </td> \n              <td style=\"text-align:center;\" class=\"is-hidden-mobile\">\n                <span *ngFor=\"let grupo of item.generico.grupos\">{{grupo.nombre}}<br></span>\n              </td>\n              <td style=\"text-align:center;\">\n                <b>\n                  <abbr *ngIf=\"item.tipo == 'ME'\" title=\"Medicamento\">ME</abbr>\n                  <abbr *ngIf=\"item.tipo == 'MC'\" title=\"Material de curación\">MC</abbr>\n                  <abbr *ngIf=\"item.tipo == 'AD'\" title=\"Auxiliar de diagnóstico\">AD</abbr>\n                </b>\n              </td>\n              <td style=\"text-align:center\">\n                <a (click)=\"mostrarFichaInformativa($event,item.clave)\"><span class=\"icon\"><i class=\"fa fa-info-circle\"></i></span></a>\n              </td>\n\n            </tr>  \n            <tr *ngIf=\"insumos.length == 0 && searchBox.value != ''\">\n                <td colspan=\"7\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n            </tr>\n            <tr *ngIf=\"insumos.length == 0 && searchBox.value == '' \">\n                <td colspan=\"7\" style=\"vertical-align: middle; color:#888;\">Por favor escriba en el campo de búsqueda para encontrar insumos.</td>                    \n            </tr>      \n        </tbody>  \n      </table>\n    <br>\n            \n    </section>\n    <footer class=\"\" style=\"position:relative; padding:1em;background: #FFF; border-top:1px solid #EEE; border-radius:0 0 0.8em 0.8em \" >\n      \n      <paginacion \n                [total]=\"total\" \n                [paginasTotales]=\"paginasTotales\" \n                [resultadosPorPagina]=\"resultadosPorPagina\" \n                [paginaActual]=\"paginaActual\" \n                [indicePaginas]=\"indicePaginas\"\n                (onSiguiente)=\"paginaSiguiente(searchBox.value)\" \n                (onAnterior)=\"paginaAnterior(searchBox.value)\" \n                (onListar)=\"listar(searchBox.value,$event)\" \n                *ngIf=\"total > 0 && total > resultadosPorPagina \"></paginacion>\n\n    \n        \n      <div class=\"notification is-dark is-unselectable mensaje-agregar\" [ngClass]=\"{ 'mostrar': mensajeAgregado.mostrar}\"    *ngIf=\"mensajeAgregado.mostrar\" (click)=\"mensajeAgregado.mostrar=false\">\n        <span class=\"icon\"><i class=\"fa fa-check-circle\"></i></span> <span>Agregado</span>\n      </div>\n  \n      <form (submit)=\"enviar($event)\" >\n        <div class=\"control is-grouped is-pulled-right \" >\n        <p class=\"control is-expanded\">\n            <input class=\"input is-medium\" [disabled]=\"insumoSeleccionado == null\" type=\"text\" placeholder=\"Cantidad\" #cantidadBox id=\"cantidad\" (keyup)=\"comprobarCantidad(cantidadBox.value)\" >\n        </p>\n        <p class=\"control\">\n            <button [disabled]=\"!cantidadValida\" class=\"button is-medium is-primary \" >\n            <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Agregar</span>\n            </button>\n        </p>\n      </div>\n      </form>\n      \n\n    </footer>\n      \n    <div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n        <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n        <b>Error:</b> {{ mensajeError.texto }}\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 837:
/***/ (function(module, exports) {

module.exports = "<!-- <panel-control-menu></panel-control-menu> -->\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%\">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n        \n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero is-primary\">\n                <div class=\"hero-body\">\n                    <div class=\"container is-fluid\">\n                        <h1 class=\"title\">\n                            <span  *ngIf=\"!cargando\" class=\"icon is-medium\"><i class=\"fa fa-edit\"></i></span>\n                            <span  *ngIf=\"cargando\" class=\"icon is-medium\"><i class=\"fa fa-refresh fa-spin\"></i></span> \n                            Editar entrada\n                        </h1>\n                        \n                    </div>\n                </div>\n            </section>\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"!datosCargados\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n            </div>\n            <section class=\"section\">\n            <!--\n            <farmacia-entradas-form *ngIf=\"datosCargados\"\n                [mostrarCambiarPassword]=\"true\"\n                [entrada]=\"entrada\"             \n                [roles]=\"roles\" \n                [entradaRepetido]=\"entradaRepetido\"\n                [entradaInvalido]=\"entradaInvalido\"\n                [cargando]=\"cargando\"\n                \n                (onEnviar)=\"enviar()\"\n                (onRegresar)=\"regresar()\"\n                (onToggleCambiarPassword)=\"toggleCambiarPassword()\"\n                \n            ></farmacia-entradas-form> -->\n            </section>\n        </div>\n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <p><b>Error:</b> {{ mensajeError.texto }}<br></p>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeError.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<div class=\"notification is-warning\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeAdvertencia.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeAdvertencia.mostrar = false\"></button>        \n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-warning\"></i></span> <span>{{ mensajeAdvertencia.texto }}</span></p>\n    \n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeAdvertencia.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>"

/***/ }),

/***/ 838:
/***/ (function(module, exports) {

module.exports = "<form name=\"form\" novalidate [formGroup]=\"entrada\"  (ngSubmit)=\"enviar()\">     \n            \n              <div class=\"control is-grouped\">\n                <p class=\"control is-expanded  has-icon has-icon-right\">\n                  <input class=\"input\" autofocus type=\"text\" [ngClass]=\"{'is-danger': entrada.get('nombre').hasError('required') && entrada.get('nombre').touched}\"  placeholder=\"Nombre\" formControlName=\"nombre\">\n                  <span class=\"icon is-small\" *ngIf=\"entrada.get('nombre').hasError('required') && entrada.get('nombre').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"entrada.get('nombre').hasError('required') && entrada.get('nombre').touched\">Este campo es requerido.</span>\n                </p>\n                <p class=\"control is-expanded has-icon has-icon-right\">\n                  <input class=\"input\" type=\"text\" placeholder=\"Apellidos\" [ngClass]=\"{'is-danger': entrada.get('apellidos').hasError('required') && entrada.get('apellidos').touched}\" formControlName=\"apellidos\">\n                  <span class=\"icon is-small\" *ngIf=\"entrada.get('apellidos').hasError('required') && entrada.get('apellidos').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"entrada.get('apellidos').hasError('required') && entrada.get('apellidos').touched\">Este campo es requerido.</span>\n                </p>\n              </div>\n             \n              <h2 class=\"subtitle\">Datos de la cuenta</h2>\n              <p class=\"control has-icon has-icon-right\">\n                <input type=\"text\" class=\"input\" placeholder=\"Usuario\" (ngModelChange)=\"entradaRepetido = false; entradaInvalido = false\" [ngClass]=\"{'is-danger': (entrada.get('id').hasError('required') || entradaRepetido || entradaInvalido) && entrada.get('id').touched}\" formControlName=\"id\">\n                <span class=\"icon is-small\" *ngIf=\"(entrada.get('id').hasError('required') || entradaRepetido || entradaInvalido) && entrada.get('id').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                </span>\n                <span class=\"help is-danger\" *ngIf=\"entrada.get('id').hasError('required') && entrada.get('id').touched\">Este campo es requerido.</span>\n                <span class=\"help is-danger\" *ngIf=\"entradaRepetido && entrada.get('id').touched\">Este entrada ya fue utilizado.</span>\n                <span class=\"help is-danger\" *ngIf=\"entradaInvalido && entrada.get('id').touched\">El entrada debe tener un formato de <b>email</b> válido.</span>\n              </p>\n              <p class=\"control\" *ngIf=\"mostrarCambiarPassword\">\n                  <label class=\"checkbox\">\n                    <input type=\"checkbox\" formControlName=\"cambiarPassword\" (click)=\"toggleCambiarPassword()\">\n                    Cambiar contraseña\n                  </label>\n                </p>\n              <div class=\"control is-grouped\">\n                \n                <p class=\"control is-expanded has-icon has-icon-right\">\n                  <input class=\"input\" type=\"password\" placeholder=\"Contraseña\" [ngClass]=\"{'is-danger': (entrada.get('password').hasError('required') || (entrada.get('password').value != entrada.get('confirmarPassword').value && entrada.get('confirmarPassword').touched)) && entrada.get('password').touched}\" formControlName=\"password\">\n                  <span class=\"icon is-small\" *ngIf=\"(entrada.get('password').hasError('required') || (entrada.get('password').value != entrada.get('confirmarPassword').value && entrada.get('confirmarPassword').touched)) && entrada.get('password').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"entrada.get('password').hasError('required') && entrada.get('password').touched\">Este campo es requerido.</span>\n                  <span class=\"help is-danger\" *ngIf=\"(entrada.get('password').value != entrada.get('confirmarPassword').value && entrada.get('confirmarPassword').touched) && entrada.get('password').touched\">Las contraseñas no coinciden.</span>\n                </p>\n                <p class=\"control is-expanded has-icon has-icon-right\">\n                  <input class=\"input\" type=\"password\" placeholder=\"Confirmar contraseña\" [ngClass]=\"{'is-danger': entrada.get('confirmarPassword').hasError('required') && entrada.get('confirmarPassword').touched}\" formControlName=\"confirmarPassword\">\n                  <span class=\"icon is-small\" *ngIf=\"entrada.get('confirmarPassword').hasError('required') && entrada.get('confirmarPassword').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"entrada.get('confirmarPassword').hasError('required') && entrada.get('confirmarPassword').touched\">Este campo es requerido.</span>\n                </p>\n                \n              </div>\n\n              <h2 class=\"subtitle\">Roles</h2>\n              <div class=\"control\" [ngClass]=\"{'is-loading': cargandoRoles}\">\n \n                  <select  name=\"roles\" formControlName=\"roles\" multiple class=\"bulma-select-multiple\" [ngClass]=\"{'is-warning': roles?.length ==0 }\">\n                    <option *ngFor=\"let item of roles\" value=\"{{item.id}}\">{{ item.nombre }}</option>\n                  </select>\n                  <span class=\"help is-danger\" *ngIf=\"entrada.get('roles').hasError('required') && entrada.get('roles').touched\">Debe elegir por lo menos un rol.</span>\n                  <span class=\"help \" *ngIf=\"roles?.length == 0\"><b>La lista de roles está vacía.</b> <a (click)=\"cargarRoles()\"><span class=\"icon is-small\"><i class=\"fa fa-refresh\"></i></span> <span>Actualizar</span></a></span>\n              </div>\n              <h2 class=\"subtitle\">Avatar</h2>\n              <p class=\"control\">\n                \n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-male\" >\n                  <figure class=\"image is-64x64\" >\n                    <img src=\"assets/avatar-circled-user-male.svg\" alt=\"Avatar hombre\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-female\"  >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-user-female.svg\" alt=\"Avatar mujer\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-male-skin-type-6\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-user-male-skin-type-6.svg\" alt=\"Avatar hombre piel tipo 6\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-female-skin-type-6\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-user-female-skin-type-6.svg\" alt=\"Avatar mujer piel tipo 6\">\n                  </figure>\n                </label>\n\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-collaborator-male\" >\n                  <figure class=\"image is-64x64\" >\n                    <img src=\"assets/avatar-circled-collaborator-male.svg\" alt=\"Avatar hombre\">\n                  </figure>\n                </label>\n                \n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-nurse\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-nurse.svg\" alt=\"Avatar enfermera\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-doctor-male\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-doctor-male.svg\" alt=\"Avatar doctor\">\n                  </figure>\n                </label>\n\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-doctor-female\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-doctor-female.svg\" alt=\"Avatar doctora\">\n                  </figure>\n                </label>\n\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-cat\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-cat.svg\" alt=\"Avatar de gato\">\n                  </figure>\n                </label>\n\n                \n              </p>\n              <br><br>\n              <div class=\"control is-grouped\">\n                <p class=\"control\">\n                  <button class=\"button is-primary\" type=\"submit\" [ngClass]=\"{'is-loading': cargando}\" [disabled]=\"entrada.invalid\" >Guardar</button>\n                </p>\n                <p class=\"control\">\n                  <button class=\"button is-danger\" type=\"button\" [ngClass]=\"{'is-loading': cargando}\" [disabled]=\"entrada.invalid\" >Eliminar entrada</button>\n                </p>\n                <p class=\"control\">\n                  <a class=\"button is-white\" (click)=\"regresar()\" >Regresar</a>\n                </p>\n              </div>\n          </form>"

/***/ }),

/***/ 839:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Entradas'\" [icono]=\"'assets/icono-entradas.svg'\" [url]=\"'/farmacia/entradas'\"></menu-farmacia>\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; \">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n       <!-- <panel-control-menu-aside></panel-control-menu-aside> -->\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero\" [ngClass] = \" {'is-dark': busquedaActivada, 'is-primary': !busquedaActivada } \" >\n                \n                <div class=\"hero-body\" style=\"position:relative;\">\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"busquedaActivada=false;searchBox.value='';resultadosBusqueda=[]\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:3.5em;\" (click)=\"listarBusqueda(searchBox.value,1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <a class=\"button  is-primary\" *ngIf=\"!busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"listar(1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <div class=\"container is-fluid\">\n                        \n                        <h1 class=\"title\" *ngIf=\"!busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-user\"></i></span> Usuarios\n                        </h1>\n                        <h1 class=\"title\" *ngIf=\"busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Búsqueda \n                        </h1>\n                        <div class=\"control is-grouped\">\n                        <p class=\"control is-expanded\">\n                            <input class=\"input is-medium\" type=\"text\" placeholder=\"Buscar\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n                        </p>\n                        <p class=\"control\">\n                            <a class=\"button is-medium is-primary is-inverted \" routerLink=\"/farmacia/entradas/v2/nuevo\">\n                            <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Nuevo</span>\n                            </a>\n                        </p>\n                        </div>\n                    </div>\n                </div>\n            </section>\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n                <br>\n                <br>\n            </div>\n        \n            <table class=\"table\" *ngIf=\"!cargando\">\n                <thead>\n                    <tr>\n                    <th></th>\n                    <th><abbr title=\"Usuario ID\">ID</abbr></th>\n                    <th>Nombre</th>\n                    <th>Servidor</th>\n                    <th style=\"text-align:center;\">Opciones</th>\n                    </tr>\n                </thead>\n                <tbody  *ngIf=\"!busquedaActivada\">\n                    <tr *ngFor=\"let item of entradas; let i=index\">\n                        <th><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\"><img style=\"min-width: 1.5em; width:2em;\" src=\"assets/{{ item.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></a></th>\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\">{{ item.nombre }} {{ item.apellidos }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\">{{ item.servidor_id }}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>\n                        \n                    </tr>\n                    <tr *ngIf=\"entradas.length == 0\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">Esta lista está vacía.</td>                    \n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"busquedaActivada\">\n                    <tr *ngFor=\"let item of resultadosBusqueda; let i=index\">\n                    <th><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\"><img style=\"min-width: 1.5em; width:2em;\" src=\"assets/{{ item.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></a></th>\n                    <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\">{{ item.id }}</a></th>\n                    <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\">{{ item.nombre }} {{ item.apellidos }}</a></td>\n                    <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/v2/editar/{{item.id}}\">{{ item.servidor_id }}</a></td>\n                    <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>\n                    \n                    </tr>\n\n                    <tr *ngIf=\"resultadosBusqueda.length == 0 && busquedaActivada\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n                    </tr>\n                </tbody>\n            </table>\n            <!-- Paginación para la lista  -->\n            <paginacion \n                [total]=\"total\" \n                [paginasTotales]=\"paginasTotales\" \n                [resultadosPorPagina]=\"resultadosPorPagina\" \n                [paginaActual]=\"paginaActual\" \n                [indicePaginas]=\"indicePaginas\"\n                (onSiguiente)=\"paginaSiguiente()\" \n                (onAnterior)=\"paginaAnterior()\" \n                (onListar)=\"listar($event)\" \n                *ngIf=\"total>0 && total > resultadosPorPagina && !busquedaActivada\"></paginacion>\n            <!-- Paginación para la búsqueda  -->\n            <paginacion \n                [total]=\"totalBusqueda\" \n                [paginasTotales]=\"paginasTotalesBusqueda\" \n                [resultadosPorPagina]=\"resultadosPorPaginaBusqueda\" \n                [paginaActual]=\"paginaActualBusqueda\" \n                [indicePaginas]=\"indicePaginasBusqueda\"\n                (onSiguiente)=\"paginaSiguienteBusqueda(searchBox.value)\" \n                (onAnterior)=\"paginaAnteriorBusqueda(searchBox.value)\" \n                (onListar)=\"listarBusqueda(searchBox.value,$event)\" \n                *ngIf=\"totalBusqueda > 0 && totalBusqueda > resultadosPorPaginaBusqueda && busquedaActivada\"></paginacion>\n           \n           \n            \n        </div>\n        \n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>\n"

/***/ }),

/***/ 840:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Entradas'\" [icono]=\"'assets/icono-entradas.svg'\" [url]=\"'/farmacia/entradas'\"></menu-farmacia>\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%\">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n        <!-- <panel-control-menu-aside></panel-control-menu-aside> -->\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero is-primary\">\n                <div class=\"hero-body\">\n                    <div class=\"container is-fluid\">\n                        <h1 class=\"title\">\n                            <span  *ngIf=\"!cargando\" class=\"icon is-medium\"><i class=\"fa fa-plus\"></i></span>\n                            <span  *ngIf=\"cargando\" class=\"icon is-medium\"><i class=\"fa fa-refresh fa-spin\"></i></span> \n                            Nuevo usuario\n                        </h1>\n                        \n                    </div>\n                </div>\n            </section>\n            <section class=\"section\">\n                <!-- \n            <farmacia-entradas-form *ngIf=\"datosCargados\"\n                [entrada]=\"entrada\"  \n                \n                [entradaRepetido]=\"entradaRepetido\"\n                [entradaInvalido]=\"entradaInvalido\"\n                [cargando]=\"cargando\"\n                \n                (onEnviar)=\"enviar()\"\n                (onRegresar)=\"regresar()\"\n                (onToggleCambiarPassword)=\"toggleCambiarPassword()\"\n                \n            ></farmacia-entradas-form> -->\n            </section>\n        </div>\n        \n       \n       \n    </div>\n</div>\n\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <p><b>Error:</b> {{ mensajeError.texto }}<br></p>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeError.cuentaAtras }} segundos.</small></p>      \n</div>\n\n<div class=\"notification is-warning\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeAdvertencia.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeAdvertencia.mostrar = false\"></button>        \n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-warning\"></i></span> <span>{{ mensajeAdvertencia.texto }}</span></p>\n    \n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeAdvertencia.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>\n\n\n\n"

/***/ }),

/***/ 841:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Entradas'\" [icono]=\"'assets/icono-entradas.svg'\" [url]=\"'/farmacia/entradas'\"></menu-farmacia>\n\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; \">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n      <menu-lateral></menu-lateral>\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero\" [ngClass] = \" {'is-dark': busquedaActivada, 'is-primary': !busquedaActivada } \" >\n                \n                <div class=\"hero-body\" style=\"position:relative;\">\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"busquedaActivada=false;searchBox.value='';resultadosBusqueda=[]\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:3.5em;\" (click)=\"listarBusqueda(searchBox.value,1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <a class=\"button  is-primary\" *ngIf=\"!busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"listar(1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <div class=\"container is-fluid\">\n                        \n                        <h1 class=\"title\" *ngIf=\"!busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-minus-circle\"></i></span> Pendientes\n                        </h1>\n                        <h1 class=\"title\" *ngIf=\"busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Búsqueda \n                        </h1>\n                        <div class=\"control is-grouped\">\n                            <p class=\"control is-expanded\">\n                                <input class=\"input is-medium\" type=\"text\" placeholder=\"Buscar\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n                            </p>\n                            <p class=\"control\">\n                                <a class=\"button is-medium is-primary is-inverted \" routerLink=\"/farmacia/entradas/nuevo\">\n                                <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Nuevo</span>\n                                </a>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </section>\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n                <br>\n                <br>\n            </div>\n        \n            <table class=\"table\" *ngIf=\"!cargando\">\n                <thead>\n                    <tr>\n                    <th><abbr title=\"Número del entrada\">Entrada</abbr></th>\n                    <th>Solicitado a</th>\n                    <th>Fecha</th>\n                    <th>Hora</th>\n                    <th style=\"text-align:center;\">Opciones</th>\n                    </tr>\n                </thead>\n                <tbody  *ngIf=\"!busquedaActivada\">\n                    <tr *ngFor=\"let item of entradas; let i=index\">\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.almacen_proveedor.nombre }} {{ item.apellidos }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>\n                        \n                    </tr>\n                    <tr *ngIf=\"entradas.length == 0\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">Esta lista está vacía.</td>                    \n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"busquedaActivada\">\n                    <tr *ngFor=\"let item of resultadosBusqueda; let i=index\">\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.almacen_solicitante.nombre }} {{ item.apellidos }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entradas/ver/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>                    \n                    </tr>\n\n                    <tr *ngIf=\"resultadosBusqueda.length == 0 && busquedaActivada\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n                    </tr>\n                </tbody>\n            </table>\n            <!-- Paginación para la lista  -->\n            <paginacion \n                [total]=\"total\" \n                [paginasTotales]=\"paginasTotales\" \n                [resultadosPorPagina]=\"resultadosPorPagina\" \n                [paginaActual]=\"paginaActual\" \n                [indicePaginas]=\"indicePaginas\"\n                (onSiguiente)=\"paginaSiguiente()\" \n                (onAnterior)=\"paginaAnterior()\" \n                (onListar)=\"listar($event)\" \n                *ngIf=\"total>0 && total > resultadosPorPagina && !busquedaActivada\"></paginacion>\n            <!-- Paginación para la búsqueda  -->\n            <paginacion \n                [total]=\"totalBusqueda\" \n                [paginasTotales]=\"paginasTotalesBusqueda\" \n                [resultadosPorPagina]=\"resultadosPorPaginaBusqueda\" \n                [paginaActual]=\"paginaActualBusqueda\" \n                [indicePaginas]=\"indicePaginasBusqueda\"\n                (onSiguiente)=\"paginaSiguienteBusqueda(searchBox.value)\" \n                (onAnterior)=\"paginaAnteriorBusqueda(searchBox.value)\" \n                (onListar)=\"listarBusqueda(searchBox.value,$event)\" \n                *ngIf=\"totalBusqueda > 0 && totalBusqueda > resultadosPorPaginaBusqueda && busquedaActivada\"></paginacion>\n           \n          \n            \n        </div>\n        \n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>"

/***/ }),

/***/ 842:
/***/ (function(module, exports) {

module.exports = "<aside class=\"menu\" style=\"padding: 1em;\">\n  <!--  <p class=\"menu-label\">\n        Pedidos\n    </p>-->\n    <a routerLink=\"/farmacia/pedidos/nuevo\" routerLinkActive=\"is-active\" class=\"button is-primary is-inverted is-medium is-fullwidth\" ><span class=\"icon\"  ><i class=\"fa fa-plus\"></i></span> <span>Nuevo</span></a>\n    <br>\n    <!--<a routerLink=\"/farmacia/pedidos/abierto\" routerLinkActive=\"is-active\" class=\"button is-info is-medium is-fullwidth\"><span class=\"icon\"  ><i class=\"fa fa-file-text\"></i></span> <span>1 abierto</span></a>\n    <br>-->\n    <ul class=\"menu-list\">\n        <li>\n            <a routerLink=\"/farmacia/pedidos/abiertos\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-pencil-square-o\"></i></span> Abiertos <span class=\"tag is-warning is-pulled-right\">1</span></a>\n        </li>\n        <li>\n            <a routerLink=\"/farmacia/pedidos/pendientes\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-minus-circle\"></i></span> Pendientes</a>\n             <ul>\n                \n                <li><a>En proceso </a></li>\n                <li><a>Liberados <span class=\"tag is-danger\">1</span></a></li>\n            </ul>\n        </li>\n        <li>\n            <a routerLink=\"/farmacia/pedidos/recibidos\" routerLinkActive=\"is-active\"><span class=\"icon\"><i class=\"fa fa-check-circle\"></i></span> <span>Recibidos</span></a>\n            <ul>\n                <li><a>Completos</a></li>\n                <li><a>Incompletos</a></li>\n            </ul>\n        </li>\n       \n    </ul>\n        \n</aside>"

/***/ }),

/***/ 843:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Pedidos'\" [icono]=\"'assets/icono-pedidos.svg'\" [url]=\"'/farmacia/pedidos'\"></menu-farmacia>\n\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; padding:1em;\">\n    <div class=\"column is-one-third\" >\n      <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero is-primary\" >\n              <h1 class=\"title\" style=\"margin:0.5em; \" ><span class=\"icon is-medium\"><i class=\"fa fa-file-text\"></i></span> Nuevo</h1>\n              \n            </section>\n            \n            <div style=\"padding: 1em;\">\n              <label class=\"label\">Solicitar a:</label>\n              <p class=\"control\">\n                <span class=\"select is-fullwidth\">\n                  <select>\n                    <option>Farmacia Exfarma</option>\n                    <option>Almacén general</option>\n                  </select>\n                </span>\n              </p>\n              \n              <div class=\"control\">\n                <textarea class=\"textarea\" placeholder=\"Observaciones\"></textarea>\n              </div>\n              <div class=\"control is-grouped\">\n                <p class=\"control\">\n                  <a class=\"button is-primary \" type=\"submit\" [ngClass]=\"{'is-loading': cargando}\" >Guardar</a>\n                </p>\n              \n                <p class=\"control\">\n                  <a class=\"button is-primary \" [ngClass]=\"{ 'is-loading': cargandoPdf, 'is-inverted': !cargandoPdf }\" (click)=\"imprimir()\" ><span class=\"icon\"><i class=\"fa fa-print\"></i></span></a>\n                </p>\n                <p class=\"control\">\n                  <a class=\"button is-white\" routerLink=\"/farmacia/pedidos/\" >Ir a la lista</a>\n                </p>                \n              </div>\n            </div>\n        </div>\n        <br>\n        \n    </div>\n    <div class=\"column\" >\n        <div class=\"tabs  is-boxed\" style=\"margin-bottom:0px; \" *ngIf=\"pedidos.length > 1\" >\n          <ul>\n            <li *ngFor=\"let pedido of pedidos; let i = index\" [ngClass]=\"{ 'is-active': i == pedidoActivo}\"><a (click)=\"pedidoActivo = i\">{{ pedido.nombre}}</a></li>\n          </ul>\n        </div>\n        <div *ngFor=\"let pedido of pedidos; let indexPedido = index\" class=\"contenedor-pedido\" [ngClass]=\"{ 'con-tabs' : pedidos.length > 1 }\" [hidden]=\"indexPedido != pedidoActivo\">\n          \n          <div class=\"top-bar\" [ngClass]=\"{'is-primary':!pedido.filtro.activo && pedidos.length == 1,'is-dark': pedido.filtro.activo }\">\n            <span *ngIf=\"!pedido.filtro.activo\">Claves: {{ pedido.lista.length }} Insumos: 0</span>\n            <span *ngIf=\"pedido.filtro.activo\"><span class=\"icon\"><i class=\"fa fa-search\"></i></span> Resultados: {{ pedido.filtro.lista.length }}</span>\n            <a class=\"button is-primary  is-pulled-right\" [ngClass]=\"{ 'is-inverted': pedidos.length == 1 || pedido.filtro.activo }\" style=\"margin-top:-0.25em;\" title=\"Ctrl + espacio\" (click)=\"toggleModalInsumos(); \">\n              <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Agregar</span>\n            </a>\n          </div> \n          \n          <table class=\"table is-unselectable\" *ngIf=\"!cargando\" style=\"font-size: 0.8em;\">\n              <thead>\n                  <tr  >\n                    <th style=\"width:41px;vertical-align: middle;\" class=\"has-text-centered\" >Lote</th>\n                    <th class=\"is-hidden-mobile\" style=\"width:118px;\">\n                      <p class=\"control is-expanded\" >\n                        <input type=\"hidden\" #searchBoxClavePrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Clave\" #searchBoxClave id=\"search-box-clave-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxClave, searchBoxClavePrevia,[{ input: searchBoxDescripcion, campos: ['generico','informacion.concentracion','informacion.presentacion']}, { input: searchBoxClave, campos: ['clave']}])\">\n                      </p>\n                    </th>\n                    <th class=\"is-hidden-mobile\">\n                      <p class=\"control is-expanded\">\n                        <input type=\"hidden\" #searchBoxDescripcionPrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Genérico\" #searchBoxDescripcion id=\"search-box-descripcion-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxDescripcion,searchBoxDescripcionPrevia,[{ input: searchBoxDescripcion, campos: ['generico_nombre','informacion.concentracion','informacion.presentacion']}, { input: searchBoxClave, campos: ['clave']}])\">\n                      </p>\n                    </th> \n                    <th class=\"is-hidden-tablet\">\n                      <p class=\"control is-expanded\">\n                        <input type=\"hidden\" #searchBoxDescripcionClavePrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Clave o Genérico\" #searchBoxDescripcionClave id=\"search-box-descripcion-clave-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxDescripcionClave,searchBoxDescripcionClavePrevia,[{ input: searchBoxDescripcionClave, campos: ['clave','generico_nombre','informacion.concentracion','informacion.presentacion']}])\">\n                      </p>\n                    </th>  \n                    <th style=\"vertical-align: middle;\" class=\"is-hidden-mobile is-hidden-tablet-only\" >Descripcion</th>                  \n                    <th style=\"width:78px !important;text-align: center; vertical-align: middle;\"><abbr title=\"Cantidad\">Cant.</abbr></th>\n                    <th  style=\"width:21px !important;\"></th>\n                  </tr>\n              </thead>\n              <tbody *ngIf=\"!pedido.filtro.activo\">\n\n                <tr   *ngFor=\"let item of pedido.paginacion.lista; let i = index;\">\n                  <td class=\"has-text-centered\">{{ item.lote }}</td>\n                  <td class=\"has-text-centered is-hidden-mobile\"><a (click)=\"mostrarFichaInformativa($event, item.clave)\" style=\"cursor:help;\">{{ item.clave }}</a></td>            \n                  \n                  <td >\n                    <small class=\"is-hidden-tablet\">{{ item.clave }} <br></small>\n                    <b>{{ item.generico_nombre }}</b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                    \n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      \n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n\n                  <td class=\"is-hidden-mobile is-hidden-tablet-only\">\n                    <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Cant\" [(ngModel)]=\"item.cantidad\">\n                      </p>\n                  </td>                  \n                  <td style=\"width:21px !important;\"><a (click)=\"eliminarInsumo(item,i)\"><span class=\"icon\"><i class=\"fa fa-trash\"></i></span></a></td>\n                </tr>      \n              </tbody>\n              <tbody *ngIf=\"pedido.filtro.activo\">\n                <tr  *ngFor=\"let item of pedido.filtro.paginacion.lista; let i = index;\">\n                  <td class=\"has-text-centered\">{{ item.lote }}</td>\n                  <td class=\"has-text-centered is-hidden-mobile\"><a (click)=\"mostrarFichaInformativa($event, item.clave)\" style=\"cursor:help;\">{{ item.clave }}</a></td>            \n                  \n                  <td >\n                    <small class=\"is-hidden-tablet\">{{ item.clave }} <br></small>\n                    <b>{{ item.generico_nombre }}</b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                    \n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      \n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n\n                  <td class=\"is-hidden-mobile is-hidden-tablet-only\">\n                    <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Cant\" [(ngModel)]=\"item.cantidad\">\n                      </p>\n                  </td>                  \n                  <td style=\"width:21px !important;\"><a (click)=\"eliminarInsumo(item,i,true)\"><span class=\"icon\"><i class=\"fa fa-trash\"></i></span></a></td>\n                </tr>   \n\n\n               \n              </tbody>              \n          </table>\n         \n          <paginacion \n                [total]=\"pedido.lista.length\" \n                [paginasTotales]=\"pedido.paginacion.totalPaginas\" \n                [resultadosPorPagina]=\"pedido.paginacion.resultadosPorPagina\" \n                [paginaActual]=\"pedido.paginacion.paginaActual\" \n                [indicePaginas]=\"pedido.paginacion.indice\"\n                (onSiguiente)=\"pedido.paginaSiguiente()\" \n                (onAnterior)=\"pedido.paginaAnterior()\" \n                (onListar)=\"pedido.listar($event)\" \n                *ngIf=\"pedido.lista.length > 0 && pedido.lista.length > pedido.paginacion.resultadosPorPagina && !pedido.filtro.activo\"></paginacion>\n          \n          <paginacion \n                [total]=\"pedido.filtro.lista.length\" \n                [paginasTotales]=\"pedido.filtro.paginacion.totalPaginas\" \n                [resultadosPorPagina]=\"pedido.filtro.paginacion.resultadosPorPagina\" \n                [paginaActual]=\"pedido.filtro.paginacion.paginaActual\" \n                [indicePaginas]=\"pedido.filtro.paginacion.indice\"\n                (onSiguiente)=\"pedido.filtro.paginaSiguiente()\" \n                (onAnterior)=\"pedido.filtro.paginaAnterior()\" \n                (onListar)=\"pedido.filtro.listar($event)\" \n                *ngIf=\"pedido.filtro.lista.length > 0 && pedido.filtro.lista.length > pedido.filtro.paginacion.resultadosPorPagina && pedido.filtro.activo\"></paginacion>\n          \n          <br>\n        </div>\n        \n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<buscar-insumos *ngIf=\"mostrarModalInsumos\" (onCerrar)=\"mostrarModalInsumos = false\" (onEnviar)=\"agregarItem($event)\" [listaAgregados]=\"listaClaveAgregadas\"></buscar-insumos>\n\n"

/***/ }),

/***/ 844:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Entregas'\" [icono]=\"'assets/icono-pedidos-alt.svg'\" [url]=\"'/farmacia/entregas'\"></menu-farmacia>\n\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; \">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n      <menu-lateral></menu-lateral>\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero\" [ngClass] = \" {'is-dark': busquedaActivada, 'is-primary': !busquedaActivada } \" >\n                \n                <div class=\"hero-body\" style=\"position:relative;\">\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"busquedaActivada=false;searchBox.value='';resultadosBusqueda=[]\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:3.5em;\" (click)=\"listarBusqueda(searchBox.value,1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <a class=\"button  is-primary\" *ngIf=\"!busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"listar(1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <div class=\"container is-fluid\">\n                        \n                        <h1 class=\"title\" *ngIf=\"!busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-inbox\"></i></span> Bandeja de entrada\n                        </h1>\n                        <h1 class=\"title\" *ngIf=\"busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Búsqueda \n                        </h1>\n                        <p class=\"control is-expanded\">\n                            <input class=\"input is-medium\" type=\"text\" placeholder=\"Buscar\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n                        </p>\n                    </div>\n                </div>\n            </section>\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n                <br>\n                <br>\n            </div>\n        \n            <table class=\"table\" *ngIf=\"!cargando\">\n                <thead>\n                    <tr>\n                    <th><abbr title=\"Número del pedido\">Pedido</abbr></th>\n                    <th>Solicitado por</th>\n                    <th>Fecha</th>\n                    <th>Hora</th>\n                    <th style=\"text-align:center;\"></th>\n                    </tr>\n                </thead>\n                <tbody  *ngIf=\"!busquedaActivada\">\n                    <tr *ngFor=\"let item of pedidos; let i=index\">\n                       \n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.almacen_solicitante.nombre }} {{ item.apellidos }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                        <td></td>\n                        \n                    </tr>\n                    <tr *ngIf=\"pedidos.length == 0\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">Esta lista está vacía.</td>                    \n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"busquedaActivada\">\n                    <tr *ngFor=\"let item of resultadosBusqueda; let i=index\">\n                    <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.id }}</a></th>\n                    <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.almacen_solicitante.nombre }} {{ item.apellidos }}</a></td>\n                    <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                    <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/entregas/surtir/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                     \n                    </tr>\n\n                    <tr *ngIf=\"resultadosBusqueda.length == 0 && busquedaActivada\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n                    </tr>\n                </tbody>\n            </table>\n            <!-- Paginación para la lista  -->\n            <paginacion \n                [total]=\"total\" \n                [paginasTotales]=\"paginasTotales\" \n                [resultadosPorPagina]=\"resultadosPorPagina\" \n                [paginaActual]=\"paginaActual\" \n                [indicePaginas]=\"indicePaginas\"\n                (onSiguiente)=\"paginaSiguiente()\" \n                (onAnterior)=\"paginaAnterior()\" \n                (onListar)=\"listar($event)\" \n                *ngIf=\"total>0 && total > resultadosPorPagina && !busquedaActivada\"></paginacion>\n            <!-- Paginación para la búsqueda  -->\n            <paginacion \n                [total]=\"totalBusqueda\" \n                [paginasTotales]=\"paginasTotalesBusqueda\" \n                [resultadosPorPagina]=\"resultadosPorPaginaBusqueda\" \n                [paginaActual]=\"paginaActualBusqueda\" \n                [indicePaginas]=\"indicePaginasBusqueda\"\n                (onSiguiente)=\"paginaSiguienteBusqueda(searchBox.value)\" \n                (onAnterior)=\"paginaAnteriorBusqueda(searchBox.value)\" \n                (onListar)=\"listarBusqueda(searchBox.value,$event)\" \n                *ngIf=\"totalBusqueda > 0 && totalBusqueda > resultadosPorPaginaBusqueda && busquedaActivada\"></paginacion>\n           \n          \n            \n        </div>\n        \n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>"

/***/ }),

/***/ 845:
/***/ (function(module, exports) {

module.exports = "<aside class=\"menu\" style=\"padding: 1em;\">\n    <ul class=\"menu-list\">        \n        <li>\n            <a routerLink=\"/farmacia/entregas/bandeja\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-inbox\"></i></span> Bandeja de entrada <span class=\"tag is-white is-pulled-right\">1</span></a>            \n        </li>\n        <li>\n            <a routerLink=\"/farmacia/entregas/pendientes\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-minus-circle\"></i></span> Pendientes <span class=\"tag is-danger is-pulled-right\">3</span></a>            \n        </li>\n        <li>\n            <a routerLink=\"/farmacia/entregas/realizadas\" routerLinkActive=\"is-active\"><span class=\"icon\"><i class=\"fa fa-check-circle\"></i></span> <span>Realizadas</span></a>\n            <ul>\n                <li><a routerLink=\"/farmacia/entregas/realizadas/completas\" routerLinkActive=\"is-active\">Completas</a></li>\n                <li><a routerLink=\"/farmacia/entregas/realizadas/incompletas\" routerLinkActive=\"is-active\">Incompletas</a></li>\n            </ul>\n        </li>        \n    </ul>        \n</aside>"

/***/ }),

/***/ 846:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia></menu-farmacia>\n\n<div style=\"height:50px;\"></div>\n<section style=\"padding: 1em;\">\n  <div class=\"control is-grouped\">\n    <p class=\"control is-expanded\">\n        <input class=\"input is-medium\" type=\"text\" placeholder=\"Buscar\" [(ngModel)] = \"busqueda\" id=\"search-box\">\n    </p>\n    <p class=\"control\">\n        <a class=\"button is-medium is-primary is-inverted\" [ngClass]=\"{ 'is-disabled': busqueda==''}\" (click)=\"busqueda=''\">\n        <span class=\"icon\"><i class=\"fa fa-close\"></i></span>\n        </a>\n    </p>\n  </div>\n\n</section>\n<section style=\"padding: 1em;\">\n    <section class=\"contenedor columns is-multiline is-mobile\">\n        <div class=\"column is-1-desktop is-2-tablet is-3-mobile\" *ngFor=\"let item of accesosDirectos | buscarModulo: busqueda\">\n            <a href=\"#\" title=\"{{ item.titulo}}\" class=\"item\" routerLink=\"{{item.url}}\"  routerLinkActive=\"active\">\n                <figure class=\"image \" style=\"height: auto; width: 100%; \">\n                    <img src=\"{{ item.icono }}\" alt=\"{{item.titulo}}\">                            \n                </figure>\n                <span class=\"is-hidden-mobile\">{{ item.titulo}}</span>\n                <span class=\"is-hidden-tablet is-hidden-desktop\"><small>{{ item.titulo}}</small></span>\n            </a>\n        </div>\n    </section>\n    <hr>\n    <section class=\"contenedor columns is-multiline is-mobile\">\n        <div class=\"column is-1-desktop is-2-tablet is-3-mobile\" *ngFor=\"let item of modulos | buscarModulo: busqueda\">\n            <a href=\"#\" title=\"{{ item.titulo}}\" style=\"position: relative;\" class=\"item\" routerLink=\"{{item.url}}\" routerLinkActive=\"active\">\n                \n                <figure class=\"image \" style=\"height: auto; width: 100%; \">\n                    <img src=\"{{ item.icono }}\" alt=\"{{item.titulo}}\">                            \n                </figure>\n                <span class=\"is-hidden-mobile\">{{ item.titulo}}</span>\n                <span class=\"is-hidden-tablet is-hidden-desktop\"><small>{{ item.titulo}}</small></span>\n                <span *ngIf=\"item.badge>0\" class=\"tag is-danger\" style=\"position:absolute; top:0px; right:0px;\">{{ item.badge }}</span>\n            </a>\n        </div>\n    </section>\n</section>\n\n"

/***/ }),

/***/ 847:
/***/ (function(module, exports) {

module.exports = "<section  class=\"top-nav\">\n            \n    <nav class=\"nav\">\n        <a title=\"Farmacia\" class=\"nav-item pull-left nav-hub-active\"  routerLink=\"/farmacia\">\n            \n            <img src=\"assets/hub-farmacia.svg\" alt=\"icono\">\n        \n        </a>\n        <div class=\"nav-left\">\n            \n            <span *ngIf=\"!modulo\" class=\"nav-item\" >\n                <h1 class=\"title\">&nbsp;Farmacia</h1>\n            </span>\n            <a *ngIf=\"modulo\" class=\"nav-item\" routerLink=\"{{ url }}\" >\n            \n            <!-- <img src=\"{{ icono }}\" alt=\"icono\">-->\n                <h1 class=\"title\">&nbsp;{{ modulo }}</h1>                     \n            </a>\n        </div>\n\n        <a class=\"nav-item\"  (click)=\"hub.toggle()\">\n            <span class=\"icon\">\n                <i class=\"fa fa-th\"></i>\n            </span>\n        </a>\n\n        <a class=\"nav-item is-hidden-mobile\" (click)=\"perfil.toggle()\">                    \n            <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n            &nbsp;\n            <span>{{ usuario.nombre }} {{ usuario.apellidos }}</span>\n        </a>\n        <a class=\"nav-item is-hidden-tablet\" (click)=\"perfil.toggle()\">\n            \n            <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n        </a>\n        \n        \n    </nav>\n</section>\n\n<app-hub #hub></app-hub>\n<app-perfil #perfil></app-perfil>"

/***/ }),

/***/ 848:
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"movimiento\" >\n\n          <div class=\"control is-grouped\">\n            <!-- <div *ngFor=\"let dato of datos; let i = index\"> -->\n              <p class=\"control\">\n              <label>Tipo de movimiento</label>\n            </p>\n              <p class=\"control\">\n                <span class=\"select\">\n\n                  <select formControlName=\"tipo_movimiento_id\">\n                    <!-- <li *ngFor=\"let subItem of item['nodes']\"> {{subItem.title}} </li> -->\n                      <option *ngFor=\"let dato of datos; let i = index\">\n                            <h2>{{dato.almacen_tipos_movimientos[0].tipo_movimiento.nombre}}</h2>\n                        \n                      </option>\n                  </select>\n                </span>\n              </p>\n            <!-- </div> -->\n          </div>\n          \n          <div class=\"control is-grouped\">\n            <p class=\"control\">\n              <label>Fecha de movimiento</label>\n            </p>\n            <p class=\"control is-expanded  has-icon has-icon-right\">\n              <input class=\"input\" placeholder=\"Fecha de movimiento\" formControlName=\"fecha_movimiento\" autofocus type=\"date\" [ngClass]=\"{'is-danger': movimiento.get('fecha_movimiento').hasError('required') && movimiento.get('fecha_movimiento').touched}\">\n              <span class=\"icon is-small\" *ngIf=\"movimiento.get('fecha_movimiento').hasError('required') && movimiento.get('fecha_movimiento').touched\">\n                <i class=\"fa fa-warning\"></i>\n              </span>\n              <span class=\"help is-danger\" *ngIf=\"movimiento.get('fecha_movimiento').hasError('required') && movimiento.get('fecha_movimiento').touched\">Este campo es requerido.</span>\n            </p>\n          </div>\n          \n          \n          <div class=\"control\">\n            <p class=\"control is-expanded  has-icon has-icon-right\">\n              <textarea class=\"textarea\" autofocus type=\"text\" [ngClass]=\"{'is-danger': movimiento.get('observaciones').hasError('required') && movimiento.get('observaciones').touched}\"  placeholder=\"Observaciones\" formControlName=\"observaciones\"></textarea>\n              <span class=\"icon is-small\" *ngIf=\"movimiento.get('observaciones').hasError('required') && movimiento.get('observaciones').touched\">\n                <i class=\"fa fa-warning\"></i>\n              </span>\n              <span class=\"help is-danger\" *ngIf=\"movimiento.get('observaciones').hasError('required') && movimiento.get('observaciones').touched\">Este campo es requerido.</span>\n            </p>\n          </div>\n          <div class=\"control\" *ngIf=\"mostrarCancelado\"> <!-- *ngIf -->\n            <p class=\"control\">\n              <label class=\"checkbox\">\n                <input type=\"checkbox\" formControlName=\"cancelado\">\n                Cancelado\n              </label>\n            </p>\n            <p class=\"control is-expanded  has-icon has-icon-right\">\n              <textarea class=\"textarea\" autofocus type=\"text\" [ngClass]=\"{'is-danger': movimiento.get('observaciones_cancelacion').hasError('required') && movimiento.get('observaciones_cancelacion').touched}\"  placeholder=\"Observaciones de cancelacion\" formControlName=\"observaciones_cancelacion\"></textarea>\n              <span class=\"icon is-small\" *ngIf=\"movimiento.get('observaciones_cancelacion').hasError('required') && movimiento.get('observaciones_cancelacion').touched\">\n                <i class=\"fa fa-warning\"></i>\n              </span>\n              <span class=\"help is-danger\" *ngIf=\"movimiento.get('observaciones_cancelacion').hasError('required') && movimiento.get('observaciones_cancelacion').touched\">Este campo es requerido.</span>\n            </p>\n          </div>\n          \n</div>      "

/***/ }),

/***/ 849:
/***/ (function(module, exports) {

module.exports = "       \n        <div class=\"tabs  is-boxed\" style=\"margin-bottom:0px; \" *ngIf=\"pedidos.length > 1\" >\n          <ul>\n            <li *ngFor=\"let pedido of pedidos; let i = index\" [ngClass]=\"{ 'is-active': i == pedidoActivo}\"><a (click)=\"pedidoActivo = i\">{{ pedido.nombre}}</a></li>\n          </ul>\n        </div>\n        <div *ngFor=\"let pedido of pedidos; let indexPedido = index\" class=\"contenedor-pedido\" [ngClass]=\"{ 'con-tabs' : pedidos.length > 1 }\" [hidden]=\"indexPedido != pedidoActivo\">\n          \n          <div class=\"top-bar\" [ngClass]=\"{'is-primary':!pedido.filtro.activo && pedidos.length == 1,'is-dark': pedido.filtro.activo }\">\n            <span *ngIf=\"!pedido.filtro.activo\">Claves: {{ pedido.lista.length }} Insumos: 0</span>\n            <span *ngIf=\"pedido.filtro.activo\"><span class=\"icon\"><i class=\"fa fa-search\"></i></span> Resultados: {{ pedido.filtro.lista.length }}</span>\n            <a class=\"button is-primary  is-pulled-right\" [ngClass]=\"{ 'is-inverted': pedidos.length == 1 || pedido.filtro.activo }\" style=\"margin-top:-0.25em;\" title=\"Ctrl + espacio\" (click)=\"toggleModalInsumos(); \">\n              <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Agregar</span>\n            </a>\n          </div> \n          \n          <table class=\"table is-unselectable\" *ngIf=\"!cargando\" style=\"font-size: 0.8em;\">\n              <thead>\n                  <tr  >\n                    <th style=\"width:41px;vertical-align: middle;\" class=\"has-text-centered\" ><abbr title=\"Numero progresivo\">NP</abbr></th>\n                    <th class=\"is-hidden-mobile\" style=\"width:118px;\">\n                      <p class=\"control is-expanded\" >\n                        <input type=\"hidden\" #searchBoxClavePrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Clave\" #searchBoxClave id=\"search-box-clave-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxClave, searchBoxClavePrevia,[{ input: searchBoxDescripcion, campos: ['generico','informacion.concentracion','informacion.presentacion']}, { input: searchBoxClave, campos: ['clave']}])\">\n                        \n                      </p>\n                    </th>\n                    <th class=\"is-hidden-mobile\">\n                      <p class=\"control is-expanded\">\n                        <input type=\"hidden\" #searchBoxDescripcionPrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Genérico\" #searchBoxDescripcion id=\"search-box-descripcion-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxDescripcion,searchBoxDescripcionPrevia,[{ input: searchBoxDescripcion, campos: ['generico_nombre','informacion.concentracion','informacion.presentacion']}, { input: searchBoxClave, campos: ['clave']}])\">\n                      </p>\n                    </th> \n                    <th class=\"is-hidden-tablet\">\n                      <p class=\"control is-expanded\">\n                        <input type=\"hidden\" #searchBoxDescripcionClavePrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Clave o Genérico\" #searchBoxDescripcionClave id=\"search-box-descripcion-clave-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxDescripcionClave,searchBoxDescripcionClavePrevia,[{ input: searchBoxDescripcionClave, campos: ['clave','generico_nombre','informacion.concentracion','informacion.presentacion']}])\">\n                      </p>\n                    </th>  \n                    <th style=\"vertical-align: middle;\" class=\"is-hidden-mobile is-hidden-tablet-only\" >Descripcion</th>                  \n                    <th style=\"width:78px !important;text-align: center; vertical-align: middle;\"><abbr title=\"Cantidad\">Cant.</abbr></th>\n                    <th style=\"width:78px !important;text-align: center; vertical-align: middle;\"><abbr title=\"Lote\">Lote</abbr></th>\n                    <th style=\"width:78px !important;text-align: center; vertical-align: middle;\"><abbr title=\"Fecha de caducidad\">Cad.</abbr></th>\n                    <th style=\"width:78px !important;text-align: center; vertical-align: middle;\"><abbr title=\"Código de barras\">C&#243;digo de barras</abbr></th>\n                    <th  style=\"width:21px !important;\"></th>\n                  </tr>\n              </thead>\n              <tbody *ngIf=\"!pedido.filtro.activo\">\n\n                <tr   *ngFor=\"let item of insumosAgregados;  let i = index;\">\n\n                  <!-- LOTE -->\n                  <td class=\"has-text-centered\">{{ i+1 }}</td>\n                  <!-- CLAVE -->\n                  <td class=\"has-text-centered is-hidden-mobile\"><a (click)=\"mostrarFichaInformativa($event, item.clave)\" style=\"cursor:help;\">{{ item.clave }}</a></td>            \n                  \n                  <!-- DESCRIPCION  -->\n                  <td >\n                    <small class=\"is-hidden-tablet\">{{ item.clave }}<br></small>\n                    <b>{{ item.generico_nombre }} {{ item.clave }} </b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                    \n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      \n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n\n                  <!-- INFORMACION -->\n                  <td class=\"is-hidden-mobile is-hidden-tablet-only\">\n                    <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n<!-- *************************************************************************** -->\n\n                  <!-- CANTIDAD -->\n                  <td style=\"width:100px !important;\"> \n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Cant\" [(ngModel)]=\"item.cantidad\">\n                      </p>\n                  </td>   \n                  <!-- LOTE -->\n                  <td style=\"width:100px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"lote\" [(ngModel)]=\"item.lote\">\n                      </p>\n                  </td>  \n                  <!-- CADUCIDAD -->   \n                  <td style=\"width:100px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"date\" placeholder=\"Fecha de caducidad\" [(ngModel)]=\"item.fecha_caducidad\">\n                      </p>\n                  </td>  \n                  <!-- BARRAS --> \n                  <td style=\"width:100px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Codigo de barras\" [(ngModel)]=\"item.codigo_barras\">\n                      </p>\n                  </td> \n                 \n<!-- *************************************************************************** -->                           \n                  <td style=\"width:21px !important;\"><a (click)=\"eliminarInsumo(item,i)\"><span class=\"icon\"><i class=\"fa fa-trash\"></i></span></a></td>\n                </tr>      \n              </tbody>\n\n\n              <tbody *ngIf=\"pedido.filtro.activo\">\n                <tr  *ngFor=\"let item of pedido.filtro.paginacion.lista; let i = index;\">\n                  <td class=\"has-text-centered\">{{ i+1 }}</td>\n                  <td class=\"has-text-centered is-hidden-mobile\"><a (click)=\"mostrarFichaInformativa($event, item.clave)\" style=\"cursor:help;\">{{ item.clave }}</a></td>            \n                  \n                  <td >\n                    <small class=\"is-hidden-tablet\">{{ item.clave }} <br></small>\n                    <b>{{ item.generico_nombre }}</b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                    \n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      \n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n\n                  <td class=\"is-hidden-mobile is-hidden-tablet-only\">\n                    <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Cant\" [(ngModel)]=\"item.cantidad\">\n                      </p>\n                  </td>   \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Lote\" [(ngModel)]=\"item.lote\">\n                      </p>\n                  </td> \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Fecha de caducidad\" [(ngModel)]=\"item.fecha_caducidad\">\n                      </p>\n                  </td> \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Codigo de barras\" [(ngModel)]=\"item.codigo_barras\">\n                      </p>\n                  </td>                  \n                  <td style=\"width:21px !important;\"><a (click)=\"eliminarInsumo(item,i,true)\"><span class=\"icon\"><i class=\"fa fa-trash\"></i></span></a></td>\n                </tr>   \n\n\n               \n              </tbody>             \n          </table>\n\n                    \n         \n          <paginacion \n                [total]=\"pedido.lista.length\" \n                [paginasTotales]=\"pedido.paginacion.totalPaginas\" \n                [resultadosPorPagina]=\"pedido.paginacion.resultadosPorPagina\" \n                [paginaActual]=\"pedido.paginacion.paginaActual\" \n                [indicePaginas]=\"pedido.paginacion.indice\"\n                (onSiguiente)=\"pedido.paginaSiguiente()\" \n                (onAnterior)=\"pedido.paginaAnterior()\" \n                (onListar)=\"pedido.listar($event)\" \n                *ngIf=\"pedido.lista.length > 0 && pedido.lista.length > pedido.paginacion.resultadosPorPagina && !pedido.filtro.activo\"></paginacion>\n          \n          <paginacion \n                [total]=\"pedido.filtro.lista.length\" \n                [paginasTotales]=\"pedido.filtro.paginacion.totalPaginas\" \n                [resultadosPorPagina]=\"pedido.filtro.paginacion.resultadosPorPagina\" \n                [paginaActual]=\"pedido.filtro.paginacion.paginaActual\" \n                [indicePaginas]=\"pedido.filtro.paginacion.indice\"\n                (onSiguiente)=\"pedido.filtro.paginaSiguiente()\" \n                (onAnterior)=\"pedido.filtro.paginaAnterior()\" \n                (onListar)=\"pedido.filtro.listar($event)\" \n                *ngIf=\"pedido.filtro.lista.length > 0 && pedido.filtro.lista.length > pedido.filtro.paginacion.resultadosPorPagina && pedido.filtro.activo\"></paginacion>\n          \n          <br>\n          \n        </div>\n\n        <buscar-insumos-movimientos \n          *ngIf=\"mostrarModalInsumos\" \n          (onCerrar)=\"mostrarModalInsumos = false\" \n          (onEnviar)=\"agregarItem($event)\" \n          \n          [listaAgregados]=\"listaClaveAgregadas\" \n          ></buscar-insumos-movimientos>\n\n          "

/***/ }),

/***/ 850:
/***/ (function(module, exports) {

module.exports = "<form name=\"form\" novalidate [formGroup]=\"movimiento\" (ngSubmit)=\"enviar()\">\n  <div class=\"contenedor columns \" style=\"height:100%; padding:1em;\">\n\n    <div class=\"column is-one-third\"><!-- Columna de 1/3 de pantalla -->\n      <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n        <section class=\"hero is-primary\">\n          <h1 class=\"title\" style=\"margin:0.5em; \"><span class=\"icon is-medium\"><i class=\"fa fa-file-text\"></i></span> Nuevo</h1>\n        </section>\n        <div style=\"padding: 1em;\">\n          <entradas-form-datos \n            [movimiento]=\"movimiento\"\n            ></entradas-form-datos>\n          <div class=\"control is-grouped\">\n          </div>\n            \n          <div class=\"control is-grouped\">\n            <p class=\"control\">\n              <a class=\"button is-primary \" type=\"submit\" (click)=\"enviar()\" [ngClass]=\"{'is-loading': cargando}\">Guardar</a>\n            </p>\n\n            <p class=\"control\">\n              <a class=\"button is-primary \" [ngClass]=\"{ 'is-loading': cargandoPdf, 'is-inverted': !cargandoPdf }\"\n                (click)=\"imprimir()\"><span class=\"icon\"><i class=\"fa fa-print\"></i></span></a>\n            </p>\n            <p class=\"control\">\n              <a class=\"button is-white\" routerLink=\"/farmacia/movimientos/entradas/\">Ir a la lista</a>\n            </p>\n          </div>\n        </div>\n      </div>\n    </div><!-- Fin columna de 1/3 de pantalla -->\n\n    <div class=\"column\"><!-- Columna 2/3 -->\n      <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n        <section class=\"hero is-primary\">\n          <h1 class=\"title\" style=\"margin:0.5em; \"><span class=\"icon is-medium\"><i class=\"fa fa-file-text\"></i></span> Insumos</h1>\n        </section>\n\n        <div style=\"padding: 1em;\">\n          <entradas-form-insumos [insumosAgregados]=\"insumosAgregadosEntrada\"></entradas-form-insumos>\n\n        </div>\n      </div>\n    </div><!-- Fin columna 2/3 -->\n\n  </div>\n</form>"

/***/ }),

/***/ 851:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Entradas'\" [icono]=\"'assets/icono-entradas.svg'\" [url]=\"'/farmacia/movimientos/entradas'\"></menu-farmacia>\n\n\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; \">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n     <!--  <menu-lateral></menu-lateral> -->\n    </div>\n    <!-- -->\n    <!-- Columna de la lista de entradas -->\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n\n            <!-- Sección de búsqueda -->\n            <section class=\"hero\" [ngClass] = \" {'is-dark': busquedaActivada, 'is-primary': !busquedaActivada } \" >         \n                <div class=\"hero-body\" style=\"position:relative;\">\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"busquedaActivada=false;searchBox.value='';resultadosBusqueda=[]\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:3.5em;\" (click)=\"listarBusqueda(searchBox.value,1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <a class=\"button  is-primary\" *ngIf=\"!busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"listar(1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <div class=\"container is-fluid\">\n                        \n                        <h1 class=\"title\" *ngIf=\"!busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-minus-circle\"></i></span> Entradas\n                        </h1>\n                        <h1 class=\"title\" *ngIf=\"busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Búsqueda \n                        </h1>\n                        <div class=\"control is-grouped\">\n                            <p class=\"control is-expanded\">\n                                <input class=\"input is-medium\" type=\"text\" placeholder=\"Buscar\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n                            </p>\n                            <p class=\"control\">\n                                <a class=\"button is-medium is-primary is-inverted \" routerLink=\"/farmacia/movimientos/entradas/nuevo\">\n                                <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Nuevo</span>\n                                </a>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </section>\n\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n                <br>\n                <br>\n            </div>\n\n            <!-- TABLA de la lista de elementos -->\n            <table class=\"table\" *ngIf=\"!cargando\">\n                <thead>\n                    <tr>\n                    <th><abbr title=\"Folio de la entrada\">Folio</abbr></th>\n                    <th>Tipo de entrada</th>\n                    <th><abbr title=\"Fecha de movimiento\">Fecha</abbr></th>\n                    <th>Hora</th>\n                    <th style=\"text-align:center;\">Opciones</th>\n                    </tr>\n                </thead>\n                <tbody  *ngIf=\"!busquedaActivada\">\n                    <!-- Cambiar a movimientos -->\n                    <tr *ngFor=\"let item of items; let i=index\">\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.cancelado }} </a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\">\n                            <span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando && item.cancelado == 0\" class=\"is-danger\" (click)=\"toggleModalCancelado(item, i)\"><span class=\"icon\"><i class=\"fa fa-times\"></i></span></a>\n                            <span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a>\n                        </td> \n                    </tr>\n                    <!-- Cambiar a movimientos -->\n                    <tr *ngIf=\"items.length == 0\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">Esta lista está vacía.</td>                    \n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"busquedaActivada\">\n                    <tr *ngFor=\"let item of resultadosBusqueda; let i=index\">\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.cancelado }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/movimientos/entradas/ver/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\">\n                            <span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando && item.cancelado == 0\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-times\"></i></span></a>\n                            <span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a>\n                        </td>                 \n                    </tr>\n\n                    <tr *ngIf=\"resultadosBusqueda.length == 0 && busquedaActivada\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n                    </tr>\n                </tbody>\n            </table>\n            <!-- Paginación para la lista  -->\n            <paginacion \n                [total]=\"total\" \n                [paginasTotales]=\"paginasTotales\" \n                [resultadosPorPagina]=\"resultadosPorPagina\" \n                [paginaActual]=\"paginaActual\" \n                [indicePaginas]=\"indicePaginas\"\n                (onSiguiente)=\"paginaSiguiente()\" \n                (onAnterior)=\"paginaAnterior()\" \n                (onListar)=\"listar($event)\" \n                *ngIf=\"total>0 && total > resultadosPorPagina && !busquedaActivada\"></paginacion>\n            <!-- Paginación para la búsqueda  -->\n            <paginacion \n                [total]=\"totalBusqueda\" \n                [paginasTotales]=\"paginasTotalesBusqueda\" \n                [resultadosPorPagina]=\"resultadosPorPaginaBusqueda\" \n                [paginaActual]=\"paginaActualBusqueda\" \n                [indicePaginas]=\"indicePaginasBusqueda\"\n                (onSiguiente)=\"paginaSiguienteBusqueda(searchBox.value)\" \n                (onAnterior)=\"paginaAnteriorBusqueda(searchBox.value)\" \n                (onListar)=\"listarBusqueda(searchBox.value,$event)\" \n                *ngIf=\"totalBusqueda > 0 && totalBusqueda > resultadosPorPaginaBusqueda && busquedaActivada\"></paginacion>\n           \n          \n            \n        </div>\n        \n    </div>\n</div>\n\n\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<div class=\"modal is-active\" *ngIf=\"mostrarModalCancelado\">\n  <div class=\"modal-background\" (click)=\"toggleModalCancelado(dato, index)\"></div>\n  <div class=\"modal-content\">\n      <div class=\"box\">\n    <!-- Any other Bulma elements you want -->\n         <p class=\"control is-expanded  has-icon has-icon-right\">\n            <textarea class=\"textarea\" autofocus type=\"text\" placeholder=\"Observaciones de cancelacion\" [(ngModel)]=dato.observaciones_cancelacion></textarea>\n        </p>\n        <div class=\"control is-grouped\">\n            <p class=\"control\">\n                <button class=\"button is-primary\" (click)=\"guardar(dato); mostrarModalCancelado=false\">Aceptar</button>\n            </p>\n            <p class=\"control\">\n                <button class=\"button is-link\" (click)=\"toggleModalCancelado(dato, index)\">Cancelar</button>\n            </p>\n        </div>\n       </div>\n  </div>\n  <button class=\"modal-close\" (click)=\"toggleModalCancelado(dato, index)\"></button>\n</div>"

/***/ }),

/***/ 852:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Entradas'\" [icono]=\"'assets/icono-entradas.svg'\" [url]=\"'/farmacia/movimientos/entradas'\"></menu-farmacia>\n\n<div style=\"height:50px;\"></div>\n<entradas-form\n    [movimiento]=\"movimiento\"\n    [insumosForm]=\"insumosNuevo\"\n    [cargando]=\"cargando\"\n    (onEnviar)=\"enviar($event)\"\n></entradas-form>\n\n"

/***/ }),

/***/ 853:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Pedidos'\" [icono]=\"'assets/icono-pedidos.svg'\" [url]=\"'/farmacia/pedidos'\"></menu-farmacia>\n\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; \">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n      <menu-lateral></menu-lateral>\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero\" [ngClass] = \" {'is-dark': busquedaActivada, 'is-primary': !busquedaActivada } \" >\n                \n                <div class=\"hero-body\" style=\"position:relative;\">\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"busquedaActivada=false;searchBox.value='';resultadosBusqueda=[]\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:3.5em;\" (click)=\"listarBusqueda(searchBox.value,1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <a class=\"button  is-primary\" *ngIf=\"!busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"listar(1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <div class=\"container is-fluid\">\n                        \n                        <h1 class=\"title\" *ngIf=\"!busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-minus-circle\"></i></span> Pendientes\n                        </h1>\n                        <h1 class=\"title\" *ngIf=\"busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Búsqueda \n                        </h1>\n                        <div class=\"control is-grouped\">\n                            <p class=\"control is-expanded\">\n                                <input class=\"input is-medium\" type=\"text\" placeholder=\"Buscar\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n                            </p>\n                            <p class=\"control\">\n                                <a class=\"button is-medium is-primary is-inverted \" routerLink=\"/farmacia/pedidos/nuevo\">\n                                <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Nuevo</span>\n                                </a>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </section>\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n                <br>\n                <br>\n            </div>\n        \n            <table class=\"table\" *ngIf=\"!cargando\">\n                <thead>\n                    <tr>\n                    <th><abbr title=\"Número del pedido\">Pedido</abbr></th>\n                    <th>Solicitado a</th>\n                    <th>Fecha</th>\n                    <th>Hora</th>\n                    <th style=\"text-align:center;\">Opciones</th>\n                    </tr>\n                </thead>\n                <tbody  *ngIf=\"!busquedaActivada\">\n                    <tr *ngFor=\"let item of pedidos; let i=index\">\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.almacen_proveedor.nombre }} {{ item.apellidos }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>\n                        \n                    </tr>\n                    <tr *ngIf=\"pedidos.length == 0\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">Esta lista está vacía.</td>                    \n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"busquedaActivada\">\n                    <tr *ngFor=\"let item of resultadosBusqueda; let i=index\">\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.almacen_solicitante.nombre }} {{ item.apellidos }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.created_at | date:'dd/MM/y' }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/farmacia/pedidos/ver/{{item.id}}\">{{ item.created_at | date: 'HH:mm'}}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>                    \n                    </tr>\n\n                    <tr *ngIf=\"resultadosBusqueda.length == 0 && busquedaActivada\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n                    </tr>\n                </tbody>\n            </table>\n            <!-- Paginación para la lista  -->\n            <paginacion \n                [total]=\"total\" \n                [paginasTotales]=\"paginasTotales\" \n                [resultadosPorPagina]=\"resultadosPorPagina\" \n                [paginaActual]=\"paginaActual\" \n                [indicePaginas]=\"indicePaginas\"\n                (onSiguiente)=\"paginaSiguiente()\" \n                (onAnterior)=\"paginaAnterior()\" \n                (onListar)=\"listar($event)\" \n                *ngIf=\"total>0 && total > resultadosPorPagina && !busquedaActivada\"></paginacion>\n            <!-- Paginación para la búsqueda  -->\n            <paginacion \n                [total]=\"totalBusqueda\" \n                [paginasTotales]=\"paginasTotalesBusqueda\" \n                [resultadosPorPagina]=\"resultadosPorPaginaBusqueda\" \n                [paginaActual]=\"paginaActualBusqueda\" \n                [indicePaginas]=\"indicePaginasBusqueda\"\n                (onSiguiente)=\"paginaSiguienteBusqueda(searchBox.value)\" \n                (onAnterior)=\"paginaAnteriorBusqueda(searchBox.value)\" \n                (onListar)=\"listarBusqueda(searchBox.value,$event)\" \n                *ngIf=\"totalBusqueda > 0 && totalBusqueda > resultadosPorPaginaBusqueda && busquedaActivada\"></paginacion>\n           \n          \n            \n        </div>\n        \n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>"

/***/ }),

/***/ 854:
/***/ (function(module, exports) {

module.exports = "<aside class=\"menu\" style=\"padding: 1em;\">\n  <!--  <p class=\"menu-label\">\n        Pedidos\n    </p>-->\n    <a routerLink=\"/farmacia/pedidos/nuevo\" routerLinkActive=\"is-active\" class=\"button is-primary is-inverted is-medium is-fullwidth\" ><span class=\"icon\"  ><i class=\"fa fa-plus\"></i></span> <span>Nuevo</span></a>\n    <br>\n    <!--<a routerLink=\"/farmacia/pedidos/abierto\" routerLinkActive=\"is-active\" class=\"button is-info is-medium is-fullwidth\"><span class=\"icon\"  ><i class=\"fa fa-file-text\"></i></span> <span>1 abierto</span></a>\n    <br>-->\n    <ul class=\"menu-list\">\n        <li>\n            <a routerLink=\"/farmacia/pedidos/abiertos\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-pencil-square-o\"></i></span> Abiertos <span class=\"tag is-warning is-pulled-right\">1</span></a>\n        </li>\n        <li>\n            <a routerLink=\"/farmacia/pedidos/pendientes\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-minus-circle\"></i></span> Pendientes</a>\n             <ul>\n                \n                <li><a>En proceso </a></li>\n                <li><a>Liberados <span class=\"tag is-danger\">1</span></a></li>\n            </ul>\n        </li>\n        <li>\n            <a routerLink=\"/farmacia/pedidos/recibidos\" routerLinkActive=\"is-active\"><span class=\"icon\"><i class=\"fa fa-check-circle\"></i></span> <span>Recibidos</span></a>\n            <ul>\n                <li><a>Completos</a></li>\n                <li><a>Incompletos</a></li>\n            </ul>\n        </li>\n       \n    </ul>\n        \n</aside>"

/***/ }),

/***/ 855:
/***/ (function(module, exports) {

module.exports = "<menu-farmacia [modulo]=\"'Pedidos'\" [icono]=\"'assets/icono-pedidos.svg'\" [url]=\"'/farmacia/pedidos'\"></menu-farmacia>\n\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; padding:1em;\">\n    <div class=\"column is-one-third\" >\n      <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero is-primary\" >\n              <h1 class=\"title\" style=\"margin:0.5em; \" ><span class=\"icon is-medium\"><i class=\"fa fa-file-text\"></i></span> Nuevo</h1>\n              \n            </section>\n            \n            <div style=\"padding: 1em;\">\n              <label class=\"label\">Solicitar a:</label>\n              <p class=\"control\">\n                <span class=\"select is-fullwidth\">\n                  <select>\n                    <option>Farmacia Exfarma</option>\n                    <option>Almacén general</option>\n                  </select>\n                </span>\n              </p>\n              \n              <div class=\"control\">\n                <textarea class=\"textarea\" placeholder=\"Observaciones\"></textarea>\n              </div>\n              <div class=\"control is-grouped\">\n                <p class=\"control\">\n                  <a class=\"button is-primary \" type=\"submit\" [ngClass]=\"{'is-loading': cargando}\" >Guardar</a>\n                </p>\n              \n                <p class=\"control\">\n                  <a class=\"button is-primary \" [ngClass]=\"{ 'is-loading': cargandoPdf, 'is-inverted': !cargandoPdf }\" (click)=\"imprimir()\" ><span class=\"icon\"><i class=\"fa fa-print\"></i></span></a>\n                </p>\n                <p class=\"control\">\n                  <a class=\"button is-white\" routerLink=\"/farmacia/pedidos/\" >Ir a la lista</a>\n                </p>                \n              </div>\n            </div>\n        </div>\n        <br>\n        \n    </div>\n    <div class=\"column\" >\n        <div class=\"tabs  is-boxed\" style=\"margin-bottom:0px; \" *ngIf=\"pedidos.length > 1\" >\n          <ul>\n            <li *ngFor=\"let pedido of pedidos; let i = index\" [ngClass]=\"{ 'is-active': i == pedidoActivo}\"><a (click)=\"pedidoActivo = i\">{{ pedido.nombre}}</a></li>\n          </ul>\n        </div>\n        <div *ngFor=\"let pedido of pedidos; let indexPedido = index\" class=\"contenedor-pedido\" [ngClass]=\"{ 'con-tabs' : pedidos.length > 1 }\" [hidden]=\"indexPedido != pedidoActivo\">\n          \n          <div class=\"top-bar\" [ngClass]=\"{'is-primary':!pedido.filtro.activo && pedidos.length == 1,'is-dark': pedido.filtro.activo }\">\n            <span *ngIf=\"!pedido.filtro.activo\">Claves: {{ pedido.lista.length }} Insumos: 0</span>\n            <span *ngIf=\"pedido.filtro.activo\"><span class=\"icon\"><i class=\"fa fa-search\"></i></span> Resultados: {{ pedido.filtro.lista.length }}</span>\n            <a class=\"button is-primary  is-pulled-right\" [ngClass]=\"{ 'is-inverted': pedidos.length == 1 || pedido.filtro.activo }\" style=\"margin-top:-0.25em;\" title=\"Ctrl + espacio\" (click)=\"toggleModalInsumos(); \">\n              <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Agregar</span>\n            </a>\n          </div> \n          \n          <table class=\"table is-unselectable\" *ngIf=\"!cargando\" style=\"font-size: 0.8em;\">\n              <thead>\n                  <tr  >\n                    <th style=\"width:41px;vertical-align: middle;\" class=\"has-text-centered\" >Lote</th>\n                    <th class=\"is-hidden-mobile\" style=\"width:118px;\">\n                      <p class=\"control is-expanded\" >\n                        <input type=\"hidden\" #searchBoxClavePrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Clave\" #searchBoxClave id=\"search-box-clave-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxClave, searchBoxClavePrevia,[{ input: searchBoxDescripcion, campos: ['generico','informacion.concentracion','informacion.presentacion']}, { input: searchBoxClave, campos: ['clave']}])\">\n                      </p>\n                    </th>\n                    <th class=\"is-hidden-mobile\">\n                      <p class=\"control is-expanded\">\n                        <input type=\"hidden\" #searchBoxDescripcionPrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Genérico\" #searchBoxDescripcion id=\"search-box-descripcion-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxDescripcion,searchBoxDescripcionPrevia,[{ input: searchBoxDescripcion, campos: ['generico_nombre','informacion.concentracion','informacion.presentacion']}, { input: searchBoxClave, campos: ['clave']}])\">\n                      </p>\n                    </th> \n                    <th class=\"is-hidden-tablet\">\n                      <p class=\"control is-expanded\">\n                        <input type=\"hidden\" #searchBoxDescripcionClavePrevia >\n                        <input class=\"input is-small\" type=\"text\" placeholder=\"Clave o Genérico\" #searchBoxDescripcionClave id=\"search-box-descripcion-clave-{{indexPedido}}\" (keyup)=\"buscar($event,searchBoxDescripcionClave,searchBoxDescripcionClavePrevia,[{ input: searchBoxDescripcionClave, campos: ['clave','generico_nombre','informacion.concentracion','informacion.presentacion']}])\">\n                      </p>\n                    </th>  \n                    <th style=\"vertical-align: middle;\" class=\"is-hidden-mobile is-hidden-tablet-only\" >Descripcion</th>                  \n                    <th style=\"width:78px !important;text-align: center; vertical-align: middle;\"><abbr title=\"Cantidad\">Cant.</abbr></th>\n                    <th  style=\"width:21px !important;\"></th>\n                  </tr>\n              </thead>\n              <tbody *ngIf=\"!pedido.filtro.activo\">\n\n                <tr   *ngFor=\"let item of pedido.paginacion.lista; let i = index;\">\n                  <td class=\"has-text-centered\">{{ item.lote }}</td>\n                  <td class=\"has-text-centered is-hidden-mobile\"><a (click)=\"mostrarFichaInformativa($event, item.clave)\" style=\"cursor:help;\">{{ item.clave }}</a></td>            \n                  \n                  <td >\n                    <small class=\"is-hidden-tablet\">{{ item.clave }} <br></small>\n                    <b>{{ item.generico_nombre }}</b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                    \n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      \n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n\n                  <td class=\"is-hidden-mobile is-hidden-tablet-only\">\n                    <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Cant\" [(ngModel)]=\"item.cantidad\">\n                      </p>\n                  </td>                  \n                  <td style=\"width:21px !important;\"><a (click)=\"eliminarInsumo(item,i)\"><span class=\"icon\"><i class=\"fa fa-trash\"></i></span></a></td>\n                </tr>      \n              </tbody>\n              <tbody *ngIf=\"pedido.filtro.activo\">\n                <tr  *ngFor=\"let item of pedido.filtro.paginacion.lista; let i = index;\">\n                  <td class=\"has-text-centered\">{{ item.lote }}</td>\n                  <td class=\"has-text-centered is-hidden-mobile\"><a (click)=\"mostrarFichaInformativa($event, item.clave)\" style=\"cursor:help;\">{{ item.clave }}</a></td>            \n                  \n                  <td >\n                    <small class=\"is-hidden-tablet\">{{ item.clave }} <br></small>\n                    <b>{{ item.generico_nombre }}</b> <br  class=\"is-hidden-mobile\"><small *ngIf=\"item.tipo == 'ME'\"><b>{{ item.informacion.concentracion }}</b></small><br>\n                    \n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div class=\"is-hidden-desktop\" style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      \n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n\n                  <td class=\"is-hidden-mobile is-hidden-tablet-only\">\n                    <div *ngIf=\"item.tipo == 'ME'\" style=\"line-height:1em;\">\n                      <small><i>{{ item.informacion.presentacion_nombre }}</i></small><br>\n                      <small><i>{{ item.informacion.contenido }} </i></small>\n                    </div>\n                    <div  *ngIf=\"item.tipo != 'ME'\" style=\"line-height:1em;\">\n                      <small>{{ item.descripcion }}</small>\n                    </div>\n                    <div style=\"padding: 0.5em 0 0.5em 0; \">\n                      <span *ngIf=\"item.es_causes\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">CAUSES</span>\n                      <span *ngIf=\"!item.es_causes\" class=\"tag is-danger\" style=\"font-size: 0.7em !important;\">NO CAUSES</span>\n                      <span *ngIf=\"item.es_cuadro_basico\" class=\"tag is-light\" [ngClass]=\"{'is-dark': item == insumoSeleccionado}\" style=\"font-size: 0.7em !important;\">Cuadro básico</span>\n                      <span *ngIf=\"item.tipo == 'ME'\">\n                        <span *ngIf=\"item.informacion.es_controlado\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Controlado</span>\n                        <span *ngIf=\"item.informacion.es_surfactante\" class=\"tag is-warning\" style=\"font-size: 0.7em\">Surfactante</span>  \n                      </span>\n                      \n                    </div>\n                  </td> \n                  <td style=\"width:78px !important;\">\n                      <p class=\"control is-expanded\">\n                      <input class=\"input is-small has-text-centered\"  type=\"text\" placeholder=\"Cant\" [(ngModel)]=\"item.cantidad\">\n                      </p>\n                  </td>                  \n                  <td style=\"width:21px !important;\"><a (click)=\"eliminarInsumo(item,i,true)\"><span class=\"icon\"><i class=\"fa fa-trash\"></i></span></a></td>\n                </tr>   \n\n\n               \n              </tbody>              \n          </table>\n         \n          <paginacion \n                [total]=\"pedido.lista.length\" \n                [paginasTotales]=\"pedido.paginacion.totalPaginas\" \n                [resultadosPorPagina]=\"pedido.paginacion.resultadosPorPagina\" \n                [paginaActual]=\"pedido.paginacion.paginaActual\" \n                [indicePaginas]=\"pedido.paginacion.indice\"\n                (onSiguiente)=\"pedido.paginaSiguiente()\" \n                (onAnterior)=\"pedido.paginaAnterior()\" \n                (onListar)=\"pedido.listar($event)\" \n                *ngIf=\"pedido.lista.length > 0 && pedido.lista.length > pedido.paginacion.resultadosPorPagina && !pedido.filtro.activo\"></paginacion>\n          \n          <paginacion \n                [total]=\"pedido.filtro.lista.length\" \n                [paginasTotales]=\"pedido.filtro.paginacion.totalPaginas\" \n                [resultadosPorPagina]=\"pedido.filtro.paginacion.resultadosPorPagina\" \n                [paginaActual]=\"pedido.filtro.paginacion.paginaActual\" \n                [indicePaginas]=\"pedido.filtro.paginacion.indice\"\n                (onSiguiente)=\"pedido.filtro.paginaSiguiente()\" \n                (onAnterior)=\"pedido.filtro.paginaAnterior()\" \n                (onListar)=\"pedido.filtro.listar($event)\" \n                *ngIf=\"pedido.filtro.lista.length > 0 && pedido.filtro.lista.length > pedido.filtro.paginacion.resultadosPorPagina && pedido.filtro.activo\"></paginacion>\n          \n          <br>\n        </div>\n        \n    </div> <!-- Termina columna insumos -->\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<buscar-insumos *ngIf=\"mostrarModalInsumos\" (onCerrar)=\"mostrarModalInsumos = false\" (onEnviar)=\"agregarItem($event)\" [listaAgregados]=\"listaClaveAgregadas\"></buscar-insumos>\n\n"

/***/ }),

/***/ 856:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 857:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal\" [ngClass]=\"{'is-active': mostrar}\" >\n  <div class=\"modal-background\" (click)=\"toggle()\"></div>\n  <div class=\"modal-content\">\n    <!-- Any other Bulma elements you want -->\n    <div class=\"card\" style=\"width: 100%; border-radius: 1em; background: #222;\">\n        <div class=\"card-content\">\n            <div class=\"columns is-multiline is-mobile\">\n\n                <div class=\"column is-one-quarter\" >\n                    <a href=\"#\" title=\"Dashboard\" class=\"hub-item\" routerLink=\"/dashboard\" routerLinkActive=\"active\">\n                        <figure class=\"image \" style=\"height: auto; width: 100%; \">\n                           <img src=\"assets/hub-dashboard.svg\" alt=\"Dashboard\">                            \n                        </figure>\n                        <span class=\"is-hidden-mobile\">Dashboard</span>\n                    </a>\n                </div>\n                <div class=\"column is-one-quarter\">\n                    <a href=\"#\" title=\"Farmacia\" class=\"hub-item\" routerLink=\"/farmacia\" routerLinkActive=\"active\">\n                        <figure class=\"image\" style=\"height: 100%; width: 100%;\">\n                           <img src=\"assets/hub-farmacia.svg\" alt=\"Farmacia\">\n                        </figure>\n                        <span class=\"is-hidden-mobile\">Farmacia / Unidosis</span>\n                    </a>\n                </div>\n                <div class=\"column is-one-quarter\">\n                    <a href=\"#\" title=\"Almacén\" class=\"hub-item\" routerLink=\"/almacen\" routerLinkActive=\"active\">\n                        <figure class=\"image\" style=\"height: 100%; width: 100%;\">\n                           <img src=\"assets/hub-almacen.svg\" alt=\"Almacén\">\n                        </figure>\n                        <span class=\"is-hidden-mobile\">Almacén</span>\n                    </a>\n                </div>\n                <div class=\"column is-one-quarter\">\n                    <a href=\"#\" title=\"Panel de control\" class=\"hub-item\" routerLink=\"/panel-control\" routerLinkActive=\"active\">\n                        <figure class=\"image\" style=\"height: 100%; width: 100%;\">\n                           <img src=\"assets/hub-panel-control.svg\" alt=\"Panel de control\">\n                        </figure>\n                        <span class=\"is-hidden-mobile\">Panel de control</span>\n                    </a>\n                </div>\n            </div>\n            \n        </div>\n    </div>\n  </div>\n  <button class=\"modal-close\" (click)=\"toggle()\"></button>\n</div>"

/***/ }),

/***/ 858:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal is-active\">\n    <div class=\"modal-background login-background\"></div>\n    <div class=\"modal-content\">\n        <div class=\"card\" style=\" border-radius:1em; overflow: hidden\">\n            <div class=\"card-image\" >\n                <figure class=\"image \" style=\"border-radius: 1em 1em 0em 0em; overflow: hidden;\">\n                    <img src=\"assets/bg-login.svg\" alt=\"Image\">\n                </figure>\n            </div>\n            <div class=\"card-content\">\n                <form name=\"form\" (ngSubmit)=\"!loading && login()\">\n                    <h1 class=\"title has-text-centered\">Bienvenido</h1>\n                    <h2 class=\"subtitle has-text-centered\">Esta app esta diseñada especialmente para ti.</h2>\n                    <div class=\"notification is-danger\" *ngIf=\"mostrarMensaje\">\n                        <a class=\"delete\" (click)=\"mostrarMensaje = false\"></a>\n                        <b>Error:</b> {{ mensaje }}\n                    </div>\n                    <p class=\"control has-icon\">\n                        <input class=\"input is-medium\" [ngClass]=\"{'is-danger': mensaje}\" type=\"text\" name=\"id\" id=\"id\" placeholder=\"Usuario\" [(ngModel)]=\"credenciales.id\"  autofocus>\n                        <span class=\"icon is-small\">\n                        <i class=\"fa fa-user\"></i>\n                        </span>\n                    </p>\n                    <p class=\"control has-icon\">\n                        <input class=\"input is-medium\" [ngClass]=\"{'is-danger': mensaje}\" type=\"password\" name=\"password\" id=\"password\" placeholder=\"Contraseña\" [(ngModel)]=\"credenciales.password\">\n                        <span class=\"icon is-small\">\n                        <i class=\"fa fa-lock\"></i>\n                        </span>\n                    </p>\n                    <p class=\"control\" >\n                        <button class=\"button is-primary is-large is-fullwidth\" [ngClass]=\"{'is-loading': loading}\" >Iniciar sesión</button>\n                    </p>\n                    <p class=\"control\" *ngIf=\"saludIdDisponible\">\n                        <button class=\"button is-info is-large is-fullwidth\">Conectar con Salud ID</button>\n                    </p>\n                    <p class=\"control\">\n                        <a class=\"button is-white is-fullwidth\" >Olvidé mi contraseña</a>\n                    </p>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 859:
/***/ (function(module, exports) {

module.exports = "<section class=\"hero is-warning\" style=\"position: fixed; width: 100%;top:0px; z-index:99\">\n    <div class=\"hero-head\">\n        <div class=\"container is-fluid\">\n            <nav class=\"nav is-primary\">\n                <div class=\"nav-left\">\n                    <a class=\"nav-item is-brand\" routerLink=\"/\" routerLinkActive=\"active\">\n                    <!--<img src=\"http://bulma.io/images/bulma-type.png\" alt=\"Bulma logo\">-->\n                    <span class=\"icon\">\n                        <i class=\"fa fa-safari\"></i>\n                    </span> \n                     <h1 class=\"title\">&nbsp;404</h1>\n                    </a>\n                </div>\n\n                <a class=\"nav-item\"  (click)=\"hub.toggle()\">\n                    <span class=\"icon\">\n                        <i class=\"fa fa-th\"></i>\n                    </span>\n                </a>\n\n                <a class=\"nav-item is-hidden-mobile\" (click)=\"perfil.toggle()\">\n                    \n                    <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n                    &nbsp;\n                    <span>{{ usuario.nombre }} {{ usuario.apellidos }}</span>\n                </a>\n                <a class=\"nav-item is-hidden-tablet\" (click)=\"perfil.toggle()\">\n                    \n                    <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n                </a>\n               \n                \n            </nav>\n        </div>\n    </div>\n</section>\n<app-hub #hub></app-hub>\n<app-perfil #perfil></app-perfil>\n<section class=\"hero is-dark is-fullheight has-text-centered\">\n  <div class=\"hero-body\">\n    <div class=\"container\">\n      <figure class=\"image\" style=\"height: auto; width: 25%; display: inline-block;\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\" style=\"fill:#FFF;\">\n        <path d=\"M42.128,22.257c0.01-0.192,0.015-0.378,0.015-0.561c0-7.251-5.899-13.149-13.15-13.149c-5.009,0-9.583,2.896-11.78,7.331\tc-1.134-0.751-2.464-1.154-3.857-1.154c-3.703,0-6.745,2.887-6.993,6.528C2.581,22.628,0,26.258,0,30.331C0,35.662,4.338,40,9.67,40\th31.428C46.006,40,50,36.007,50,31.099C50,26.539,46.553,22.769,42.128,22.257z M31,22c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2\ts-2-0.895-2-2C29,22.895,29.895,22,31,22z M19,22c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2s-2-0.895-2-2C17,22.895,17.895,22,19,22z M34.654,34.756C34.465,34.92,34.232,35,34,35c-0.279,0-0.559-0.117-0.756-0.346C33.214,34.62,29.99,31,25,31\tc-5.022,0-8.212,3.618-8.244,3.654c-0.361,0.418-0.993,0.462-1.41,0.102c-0.418-0.362-0.463-0.993-0.102-1.411\tC15.397,33.168,19.073,29,25,29s9.603,4.168,9.756,4.346C35.117,33.763,35.072,34.395,34.654,34.756z\"></path>\n        </svg>\n      </figure>\n      <h1 class=\"title\">¡Lo sentimos!</h1>\n      <h2 class=\"subtitle\">El contenido que intentas buscar <strong>no existe</strong>.</h2>\n    </div>\n  </div>\n</section>\n\n"

/***/ }),

/***/ 860:
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:1em;\" *ngIf=\"total>0 && total > resultadosPorPagina\">\n    <nav class=\"pagination\" >\n        <a class=\"pagination-previous\" [ngClass]=\"{'is-disabled': 1 == paginaActual }\" (click)=\"anterior()\">Anterior</a>\n        <a class=\"pagination-next\"  [ngClass]=\"{'is-disabled': paginasTotales <= paginaActual }\" (click)=\"siguiente()\">Siguiente</a>\n        <ul class=\"pagination-list\" *ngIf=\"paginasTotales<=7\">\n            <li *ngFor=\"let i of indicePaginas\">\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': i == paginaActual }\" (click)=\"listar(i)\">{{ i }}</a>\n            </li>\n        </ul>\n\n        <ul class=\"pagination-list\" *ngIf=\"paginaActual < 4 && paginasTotales > 7\">\n            <li>\n                <a class=\"pagination-link\" [ngClass]=\"{'is-current': 1 == paginaActual }\" (click)=\"listar(1)\">1</a>\n            </li>\n            <li><a class=\"pagination-link\" [ngClass]=\"{'is-current': 2== paginaActual }\" (click)=\"listar(2)\">2</a></li>\n            <li><a class=\"pagination-link\" [ngClass]=\"{'is-current': 3== paginaActual }\" (click)=\"listar(3)\">3</a></li>\n            <li><a class=\"pagination-link\" [ngClass]=\"{'is-current': 4== paginaActual }\" (click)=\"listar(4)\">4</a></li>\n            <li><span class=\"pagination-ellipsis\">&hellip;</span></li>\n            <li >\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': paginasTotales == paginaActual }\" (click)=\"listar(paginasTotales)\">{{ paginasTotales }}</a>\n            </li>\n        </ul>\n\n        <ul class=\"pagination-list\" *ngIf=\"paginaActual > paginasTotales - 4 && paginasTotales > 7\">\n            <li>\n                <a class=\"pagination-link\" [ngClass]=\"{'is-current': 1 == paginaActual }\" (click)=\"listar(1)\">1</a>\n            </li>\n            <li><span class=\"pagination-ellipsis\">&hellip;</span></li>\n            <li><a class=\"pagination-link\" [ngClass]=\"{'is-current': paginasTotales - 3 == paginaActual }\" (click)=\"listar(paginasTotales - 3)\">{{ paginasTotales - 3 }}</a></li>\n            <li><a class=\"pagination-link\" [ngClass]=\"{'is-current': paginasTotales - 2 == paginaActual }\" (click)=\"listar(paginasTotales - 2)\">{{ paginasTotales - 2 }}</a></li>\n            <li><a class=\"pagination-link\" [ngClass]=\"{'is-current': paginasTotales - 1 == paginaActual }\" (click)=\"listar(paginasTotales - 1)\">{{ paginasTotales - 1 }}</a></li>\n        \n            <li >\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': paginasTotales == paginaActual }\" (click)=\"listar(paginasTotales)\">{{ paginasTotales }}</a>\n            </li>\n        </ul>\n\n        <ul class=\"pagination-list\" *ngIf=\"paginaActual >= 4 && paginaActual <= paginasTotales - 4 && paginasTotales > 7\">\n            <li>\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': 1 == paginaActual }\" (click)=\"listar(1)\">1</a>\n            </li>\n            <li><span class=\"pagination-ellipsis\">&hellip;</span>\n            </li>\n            <li>\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': paginaActual-1 == paginaActual }\" (click)=\"listar(paginaActual-1)\">{{ paginaActual-1 }}</a>\n            </li>\n            <li>\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': paginaActual == paginaActual }\" (click)=\"listar(paginaActual)\">{{ paginaActual }}</a>\n            </li>\n            <li >\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': paginaActual+1 == paginaActual }\" (click)=\"listar(paginaActual+1)\">{{ paginaActual+1 }}</a>\n            </li>\n            <li><span class=\"pagination-ellipsis\">&hellip;</span></li>\n            <li >\n            <a class=\"pagination-link\" [ngClass]=\"{'is-current': paginasTotales == paginaActual }\" (click)=\"listar(paginasTotales)\">{{ paginasTotales }}</a>\n            </li>\n        </ul>\n    </nav>\n</div>\n"

/***/ }),

/***/ 861:
/***/ (function(module, exports) {

module.exports = "<aside class=\"menu\" style=\"padding: 1em;\">\n    <p class=\"menu-label\">\n        Usuarios y privilegios\n    </p>\n    <ul class=\"menu-list\">\n        <li><a routerLink=\"/panel-control/usuarios\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-user\"></i></span> Usuarios</a></li>\n        <li><a routerLink=\"/panel-control/roles\" routerLinkActive=\"is-active\"><span class=\"icon\"><i class=\"fa fa-users\"></i></span> Roles</a></li>\n        <li><a routerLink=\"/panel-control/permisos\" routerLinkActive=\"is-active\"><span class=\"icon\"><i class=\"fa fa-shield\"></i></span> Permisos</a></li>\n    </ul>\n    <p class=\"menu-label\">\n        Sincronización con servidor principal\n    </p>\n    <ul class=\"menu-list\">\n        <li><a routerLink=\"/panel-control/sync/estatus\" routerLinkActive=\"is-active\"><span class=\"icon\"><i class=\"fa fa-server\"></i></span> Estatus de sincronización</a></li>\n        <li><a routerLink=\"/panel-control/sync/manual\" routerLinkActive=\"is-active\"><span class=\"icon\"  ><i class=\"fa fa-cloud-upload\"></i></span> Sincronización manual</a></li>\n        \n    </ul>\n    \n        \n</aside>"

/***/ }),

/***/ 862:
/***/ (function(module, exports) {

module.exports = "<section class=\"hero is-dark\" style=\"position: fixed; width: 100%;top:0px; z-index:99\">\n    <div class=\"hero-head\">\n        <div class=\"container is-fluid\">\n            <nav class=\"nav is-primary\">\n                <div class=\"nav-left\">\n                    <a class=\"nav-item is-brand\" routerLink=\"/panel-control\" routerLinkActive=\"active\">\n                    <!--<img src=\"http://bulma.io/images/bulma-type.png\" alt=\"Bulma logo\">-->\n                     <span class=\"icon\">\n                        <i class=\"fa fa-cog\"></i>\n                    </span> \n                     <h1 class=\"title\">&nbsp;Panel de control</h1>\n                    </a>\n                </div>\n                <a class=\"nav-item is-hidden-tablet\" (click)=\"toggleMenuAside()\">\n                    <span class=\"icon\">\n                        <i class=\"fa fa-navicon\"></i>\n                    </span>\n                </a>\n                <a class=\"nav-item\"  (click)=\"hub.toggle()\">\n                    <span class=\"icon\">\n                        <i class=\"fa fa-th\"></i>\n                    </span>\n                </a>\n\n                <a class=\"nav-item is-hidden-mobile\" (click)=\"perfil.toggle()\">\n                    \n                    <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n                    &nbsp;\n                    <span>{{ usuario.nombre }} {{ usuario.apellidos }}</span>\n                </a>\n                <a class=\"nav-item is-hidden-tablet\" (click)=\"perfil.toggle()\">\n                    \n                    <figure class=\"image\" style=\"width:26px;\"><img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></figure>\n                </a>\n               \n                \n            </nav>\n        </div>\n    </div>\n</section>\n\n<app-hub #hub></app-hub>\n<app-perfil #perfil></app-perfil>\n\n<div class=\"modal\" [ngClass]=\"{'is-active': mostrarMenuAside}\">\n  <div class=\"modal-background\" (click)=\"toggleMenuAside()\"></div>\n  <div class=\"modal-content\">\n    <div class=\"card\" style=\"width: 100%\">\n        <div class=\"card-content\">\n            <panel-control-menu-aside></panel-control-menu-aside>\n        </div>\n    </div>\n  </div>\n  <button class=\"modal-close\" (click)=\"toggleMenuAside()\"></button>\n</div>"

/***/ }),

/***/ 863:
/***/ (function(module, exports) {

module.exports = "<panel-control-menu></panel-control-menu>\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%\">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n        <panel-control-menu-aside></panel-control-menu-aside>\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero is-primary\">\n                <div class=\"hero-body\">\n                    <div class=\"container is-fluid\">\n                        <h1 class=\"title\">\n                            <span  *ngIf=\"!cargando\" class=\"icon is-medium\"><i class=\"fa fa-edit\"></i></span>\n                            <span  *ngIf=\"cargando\" class=\"icon is-medium\"><i class=\"fa fa-refresh fa-spin\"></i></span> \n                            Editar usuario\n                        </h1>\n                        \n                    </div>\n                </div>\n            </section>\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"!datosCargados\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n            </div>\n            <section class=\"section\">\n            <panel-control-usuarios-form *ngIf=\"datosCargados\"\n                [mostrarCambiarPassword]=\"true\"\n                [usuario]=\"usuario\"             \n                [roles]=\"roles\" \n                [usuarioRepetido]=\"usuarioRepetido\"\n                [usuarioInvalido]=\"usuarioInvalido\"\n                [cargando]=\"cargando\"\n                [cargandoRoles]=\"cargandoRoles\"\n                (onEnviar)=\"enviar()\"\n                (onRegresar)=\"regresar()\"\n                (onToggleCambiarPassword)=\"toggleCambiarPassword()\"\n                (onCargarRoles)=\"cargarRoles()\"\n            ></panel-control-usuarios-form>\n            </section>\n        </div>\n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <p><b>Error:</b> {{ mensajeError.texto }}<br></p>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeError.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<div class=\"notification is-warning\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeAdvertencia.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeAdvertencia.mostrar = false\"></button>        \n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-warning\"></i></span> <span>{{ mensajeAdvertencia.texto }}</span></p>\n    \n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeAdvertencia.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>"

/***/ }),

/***/ 864:
/***/ (function(module, exports) {

module.exports = "<form name=\"form\" novalidate [formGroup]=\"usuario\"  (ngSubmit)=\"enviar()\">     \n            \n              <div class=\"control is-grouped\">\n                <p class=\"control is-expanded  has-icon has-icon-right\">\n                  <input class=\"input\" autofocus type=\"text\" [ngClass]=\"{'is-danger': usuario.get('nombre').hasError('required') && usuario.get('nombre').touched}\"  placeholder=\"Nombre\" formControlName=\"nombre\">\n                  <span class=\"icon is-small\" *ngIf=\"usuario.get('nombre').hasError('required') && usuario.get('nombre').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"usuario.get('nombre').hasError('required') && usuario.get('nombre').touched\">Este campo es requerido.</span>\n                </p>\n                <p class=\"control is-expanded has-icon has-icon-right\">\n                  <input class=\"input\" type=\"text\" placeholder=\"Apellidos\" [ngClass]=\"{'is-danger': usuario.get('apellidos').hasError('required') && usuario.get('apellidos').touched}\" formControlName=\"apellidos\">\n                  <span class=\"icon is-small\" *ngIf=\"usuario.get('apellidos').hasError('required') && usuario.get('apellidos').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"usuario.get('apellidos').hasError('required') && usuario.get('apellidos').touched\">Este campo es requerido.</span>\n                </p>\n              </div>\n             \n              <h2 class=\"subtitle\">Datos de la cuenta</h2>\n              <p class=\"control has-icon has-icon-right\">\n                <input type=\"text\" class=\"input\" placeholder=\"Usuario\" (ngModelChange)=\"usuarioRepetido = false; usuarioInvalido = false\" [ngClass]=\"{'is-danger': (usuario.get('id').hasError('required') || usuarioRepetido || usuarioInvalido) && usuario.get('id').touched}\" formControlName=\"id\">\n                <span class=\"icon is-small\" *ngIf=\"(usuario.get('id').hasError('required') || usuarioRepetido || usuarioInvalido) && usuario.get('id').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                </span>\n                <span class=\"help is-danger\" *ngIf=\"usuario.get('id').hasError('required') && usuario.get('id').touched\">Este campo es requerido.</span>\n                <span class=\"help is-danger\" *ngIf=\"usuarioRepetido && usuario.get('id').touched\">Este usuario ya fue utilizado.</span>\n                <span class=\"help is-danger\" *ngIf=\"usuarioInvalido && usuario.get('id').touched\">El usuario debe tener un formato de <b>email</b> válido.</span>\n              </p>\n              <p class=\"control\" *ngIf=\"mostrarCambiarPassword\">\n                  <label class=\"checkbox\">\n                    <input type=\"checkbox\" formControlName=\"cambiarPassword\" (click)=\"toggleCambiarPassword()\">\n                    Cambiar contraseña\n                  </label>\n                </p>\n              <div class=\"control is-grouped\">\n                \n                <p class=\"control is-expanded has-icon has-icon-right\">\n                  <input class=\"input\" type=\"password\" placeholder=\"Contraseña\" [ngClass]=\"{'is-danger': (usuario.get('password').hasError('required') || (usuario.get('password').value != usuario.get('confirmarPassword').value && usuario.get('confirmarPassword').touched)) && usuario.get('password').touched}\" formControlName=\"password\">\n                  <span class=\"icon is-small\" *ngIf=\"(usuario.get('password').hasError('required') || (usuario.get('password').value != usuario.get('confirmarPassword').value && usuario.get('confirmarPassword').touched)) && usuario.get('password').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"usuario.get('password').hasError('required') && usuario.get('password').touched\">Este campo es requerido.</span>\n                  <span class=\"help is-danger\" *ngIf=\"(usuario.get('password').value != usuario.get('confirmarPassword').value && usuario.get('confirmarPassword').touched) && usuario.get('password').touched\">Las contraseñas no coinciden.</span>\n                </p>\n                <p class=\"control is-expanded has-icon has-icon-right\">\n                  <input class=\"input\" type=\"password\" placeholder=\"Confirmar contraseña\" [ngClass]=\"{'is-danger': usuario.get('confirmarPassword').hasError('required') && usuario.get('confirmarPassword').touched}\" formControlName=\"confirmarPassword\">\n                  <span class=\"icon is-small\" *ngIf=\"usuario.get('confirmarPassword').hasError('required') && usuario.get('confirmarPassword').touched\">\n                    <i class=\"fa fa-warning\"></i>\n                  </span>\n                  <span class=\"help is-danger\" *ngIf=\"usuario.get('confirmarPassword').hasError('required') && usuario.get('confirmarPassword').touched\">Este campo es requerido.</span>\n                </p>\n                \n              </div>\n\n              <h2 class=\"subtitle\">Roles</h2>\n              <div class=\"control\" [ngClass]=\"{'is-loading': cargandoRoles}\">\n \n                  <select  name=\"roles\" formControlName=\"roles\" multiple class=\"bulma-select-multiple\" [ngClass]=\"{'is-warning': roles?.length ==0 }\">\n                    <option *ngFor=\"let item of roles\" value=\"{{item.id}}\">{{ item.nombre }}</option>\n                  </select>\n                  <span class=\"help is-danger\" *ngIf=\"usuario.get('roles').hasError('required') && usuario.get('roles').touched\">Debe elegir por lo menos un rol.</span>\n                  <span class=\"help \" *ngIf=\"roles?.length == 0\"><b>La lista de roles está vacía.</b> <a (click)=\"cargarRoles()\"><span class=\"icon is-small\"><i class=\"fa fa-refresh\"></i></span> <span>Actualizar</span></a></span>\n              </div>\n              <h2 class=\"subtitle\">Avatar</h2>\n              <p class=\"control\">\n                \n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-male\" >\n                  <figure class=\"image is-64x64\" >\n                    <img src=\"assets/avatar-circled-user-male.svg\" alt=\"Avatar hombre\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-female\"  >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-user-female.svg\" alt=\"Avatar mujer\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-male-skin-type-6\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-user-male-skin-type-6.svg\" alt=\"Avatar hombre piel tipo 6\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-user-female-skin-type-6\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-user-female-skin-type-6.svg\" alt=\"Avatar mujer piel tipo 6\">\n                  </figure>\n                </label>\n\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-collaborator-male\" >\n                  <figure class=\"image is-64x64\" >\n                    <img src=\"assets/avatar-circled-collaborator-male.svg\" alt=\"Avatar hombre\">\n                  </figure>\n                </label>\n                \n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-nurse\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-nurse.svg\" alt=\"Avatar enfermera\">\n                  </figure>\n                </label>\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-doctor-male\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-doctor-male.svg\" alt=\"Avatar doctor\">\n                  </figure>\n                </label>\n\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-circled-doctor-female\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-circled-doctor-female.svg\" alt=\"Avatar doctora\">\n                  </figure>\n                </label>\n\n                <label class=\"radio\" [ngClass]=\"{'is-disabled': cargando}\">\n                  <input type=\"radio\" name=\"avatar\" formControlName=\"avatar\" value=\"avatar-cat\" >\n                  <figure class=\"image is-64x64\">\n                    <img src=\"assets/avatar-cat.svg\" alt=\"Avatar de gato\">\n                  </figure>\n                </label>\n\n                \n              </p>\n              <br><br>\n              <div class=\"control is-grouped\">\n                <p class=\"control\">\n                  <button class=\"button is-primary\" type=\"submit\" [ngClass]=\"{'is-loading': cargando}\" [disabled]=\"usuario.invalid\" >Guardar</button>\n                </p>\n                <p class=\"control\">\n                  <button class=\"button is-danger\" type=\"button\" [ngClass]=\"{'is-loading': cargando}\" [disabled]=\"usuario.invalid\" >Eliminar usuario</button>\n                </p>\n                <p class=\"control\">\n                  <a class=\"button is-white\" (click)=\"regresar()\" >Regresar</a>\n                </p>\n              </div>\n          </form>"

/***/ }),

/***/ 865:
/***/ (function(module, exports) {

module.exports = "<panel-control-menu></panel-control-menu>\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%; \">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n        <panel-control-menu-aside></panel-control-menu-aside>\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero\" [ngClass] = \" {'is-dark': busquedaActivada, 'is-primary': !busquedaActivada } \" >\n                \n                <div class=\"hero-body\" style=\"position:relative;\">\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"busquedaActivada=false;searchBox.value='';resultadosBusqueda=[]\"><span class=\"icon \"><i class=\"fa fa-close\"></i></span></a>\n                    <a class=\"button  is-dark\" *ngIf=\"busquedaActivada\" style=\"position:absolute; top:1em; right:3.5em;\" (click)=\"listarBusqueda(searchBox.value,1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <a class=\"button  is-primary\" *ngIf=\"!busquedaActivada\" style=\"position:absolute; top:1em; right:1em;\" (click)=\"listar(1)\"><span class=\"icon \"><i class=\"fa fa-refresh\"></i></span></a>\n                    <div class=\"container is-fluid\">\n                        \n                        <h1 class=\"title\" *ngIf=\"!busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-user\"></i></span> Usuarios\n                        </h1>\n                        <h1 class=\"title\" *ngIf=\"busquedaActivada\">\n                            <span class=\"icon is-medium\"><i class=\"fa fa-search\"></i></span> Búsqueda \n                        </h1>\n                        <div class=\"control is-grouped\">\n                        <p class=\"control is-expanded\">\n                            <input class=\"input is-medium\" type=\"text\" placeholder=\"Buscar\" #searchBox id=\"search-box\" (keyup)=\"buscar(searchBox.value)\">\n                        </p>\n                        <p class=\"control\">\n                            <a class=\"button is-medium is-primary is-inverted \" routerLink=\"/panel-control/usuarios/nuevo\">\n                            <span class=\"icon\"><i class=\"fa fa-plus\"></i></span><span>Nuevo</span>\n                            </a>\n                        </p>\n                        </div>\n                    </div>\n                </div>\n            </section>\n            <div class=\"is-fullwidth has-text-centered\" *ngIf=\"cargando\">\n                <br>\n                <span class=\"tag is-primary is-large \"><span class=\"icon\"><i class=\"fa fa-refresh fa-spin\"></i></span> &nbsp;<span>Cargando...</span></span>\n                <br>\n                <br>\n            </div>\n        \n            <table class=\"table\" *ngIf=\"!cargando\">\n                <thead>\n                    <tr>\n                    <th></th>\n                    <th><abbr title=\"Usuario ID\">ID</abbr></th>\n                    <th>Nombre</th>\n                    <th>Servidor</th>\n                    <th style=\"text-align:center;\">Opciones</th>\n                    </tr>\n                </thead>\n                <tbody  *ngIf=\"!busquedaActivada\">\n                    <tr *ngFor=\"let item of usuarios; let i=index\">\n                        <th><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\"><img style=\"min-width: 1.5em; width:2em;\" src=\"assets/{{ item.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></a></th>\n                        <th style=\"vertical-align: middle;\"><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\">{{ item.id }}</a></th>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\">{{ item.nombre }} {{ item.apellidos }}</a></td>\n                        <td style=\"vertical-align: middle;\"><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\">{{ item.servidor_id }}</a></td>\n                        <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>\n                        \n                    </tr>\n                    <tr *ngIf=\"usuarios.length == 0\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">Esta lista está vacía.</td>                    \n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"busquedaActivada\">\n                    <tr *ngFor=\"let item of resultadosBusqueda; let i=index\">\n                    <th><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\"><img style=\"min-width: 1.5em; width:2em;\" src=\"assets/{{ item.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\"></a></th>\n                    <th style=\"vertical-align: middle;\"><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\">{{ item.id }}</a></th>\n                    <td style=\"vertical-align: middle;\"><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\">{{ item.nombre }} {{ item.apellidos }}</a></td>\n                    <td style=\"vertical-align: middle;\"><a routerLink=\"/panel-control/usuarios/editar/{{item.id}}\">{{ item.servidor_id }}</a></td>\n                    <td style=\"vertical-align: middle;\" class=\"has-text-centered\"><span class=\"icon \" *ngIf=\"item.cargando\"><i class=\"fa fa-circle-o-notch fa-spin\"></i></span><a *ngIf=\"!item.cargando\" class=\"is-danger\" (click)=\"eliminar(item, i)\"><span class=\"icon\"><i class=\"fa fa-trash-o\"></i></span></a></td>\n                    \n                    </tr>\n\n                    <tr *ngIf=\"resultadosBusqueda.length == 0 && busquedaActivada\">\n                        <td colspan=\"5\" style=\"vertical-align: middle; color:#888;\">No se encontraron resultados.</td>                    \n                    </tr>\n                </tbody>\n            </table>\n            <!-- Paginación para la lista  -->\n            <paginacion \n                [total]=\"total\" \n                [paginasTotales]=\"paginasTotales\" \n                [resultadosPorPagina]=\"resultadosPorPagina\" \n                [paginaActual]=\"paginaActual\" \n                [indicePaginas]=\"indicePaginas\"\n                (onSiguiente)=\"paginaSiguiente()\" \n                (onAnterior)=\"paginaAnterior()\" \n                (onListar)=\"listar($event)\" \n                *ngIf=\"total>0 && total > resultadosPorPagina && !busquedaActivada\"></paginacion>\n            <!-- Paginación para la búsqueda  -->\n            <paginacion \n                [total]=\"totalBusqueda\" \n                [paginasTotales]=\"paginasTotalesBusqueda\" \n                [resultadosPorPagina]=\"resultadosPorPaginaBusqueda\" \n                [paginaActual]=\"paginaActualBusqueda\" \n                [indicePaginas]=\"indicePaginasBusqueda\"\n                (onSiguiente)=\"paginaSiguienteBusqueda(searchBox.value)\" \n                (onAnterior)=\"paginaAnteriorBusqueda(searchBox.value)\" \n                (onListar)=\"listarBusqueda(searchBox.value,$event)\" \n                *ngIf=\"totalBusqueda > 0 && totalBusqueda > resultadosPorPaginaBusqueda && busquedaActivada\"></paginacion>\n           \n           \n            \n        </div>\n        \n    </div>\n</div>\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <b>Error:</b> {{ mensajeError.texto }}<br><br>\n    <p style=\"text-align:center\" ><a  class=\"button is-danger is-inverted\" (click)=\"ultimaPeticion(); mensajeError.mostrar = false\"> <span class=\"icon\"><i class=\"fa fa-refresh\"></i></span> <span>Volver a intentar</span></a></p>        \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>\n"

/***/ }),

/***/ 866:
/***/ (function(module, exports) {

module.exports = "<panel-control-menu></panel-control-menu>\n<div style=\"height:50px;\"></div>\n<div class=\"contenedor columns \" style=\"height:100%\">\n    <div class=\"column is-one-quarter is-hidden-mobile\">\n        <panel-control-menu-aside></panel-control-menu-aside>\n    </div>\n    <div class=\"column\" style=\"padding:2em;\">\n        <div style=\"background: #FFF; border-radius: 1em; overflow: hidden;\">\n            <section class=\"hero is-primary\">\n                <div class=\"hero-body\">\n                    <div class=\"container is-fluid\">\n                        <h1 class=\"title\">\n                            <span  *ngIf=\"!cargando\" class=\"icon is-medium\"><i class=\"fa fa-plus\"></i></span>\n                            <span  *ngIf=\"cargando\" class=\"icon is-medium\"><i class=\"fa fa-refresh fa-spin\"></i></span> \n                            Nuevo usuario\n                        </h1>\n                        \n                    </div>\n                </div>\n            </section>\n            <section class=\"section\">\n            <panel-control-usuarios-form \n                [usuario]=\"usuario\" \n                [roles]=\"roles\" \n                [usuarioRepetido]=\"usuarioRepetido\"\n                [usuarioInvalido]=\"usuarioInvalido\"\n                [cargando]=\"cargando\"\n                [cargandoRoles]=\"cargandoRoles\"\n                (onEnviar)=\"enviar()\"\n                (onRegresar)=\"regresar()\"\n                (onCargarRoles)=\"cargarRoles()\"\n            ></panel-control-usuarios-form>\n            </section>\n        </div>\n        \n       \n       \n    </div>\n</div>\n\n\n<div class=\"notification is-danger\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeError.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeError.mostrar = false\"></button>        \n    <p><b>Error:</b> {{ mensajeError.texto }}<br></p>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeError.cuentaAtras }} segundos.</small></p>      \n</div>\n\n<div class=\"notification is-warning\" style=\"position:fixed; left:1em;  bottom:1em;\" *ngIf=\"mensajeAdvertencia.mostrar\">\n    <button class=\"delete\" (click)=\"mensajeAdvertencia.mostrar = false\"></button>        \n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-warning\"></i></span> <span>{{ mensajeAdvertencia.texto }}</span></p>\n    \n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeAdvertencia.cuentaAtras }} segundos.</small></p>       \n</div>\n\n<div class=\"notification is-success\" style=\"position:fixed; left:1em;  bottom:1em; width: auto\" *ngIf=\"mensajeExito.mostrar\">       \n    <button class=\"delete\" (click)=\"mensajeExito.mostrar = false\"></button>\n    <p><span class=\"icon\" style=\"margin-right: 0.5em;\"><i class=\"fa fa-check-circle\"></i></span> <span>{{ mensajeExito.texto }}</span></p>\n    <br>\n    <p style=\"text-align: center;\"><small >Este mensaje desaparecerá en {{ mensajeExito.cuentaAtras }} segundos.</small></p>       \n</div>\n\n\n\n"

/***/ }),

/***/ 867:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal\" [ngClass]=\"{'is-active': mostrar}\">\n  <div class=\"modal-background\" (click)=\"toggle()\"></div>\n  <div class=\"modal-content\">\n    \n    <header class=\"modal-card-head\" style=\"background: white !important;\">\n      <p class=\"modal-card-title\"><span class=\"icon\"><i class=\"fa fa-user-circle\"></i></span> Mi cuenta</p>\n      <button class=\"delete\" (click)=\"toggle()\"></button>\n    </header>\n    <section class=\"modal-card-body has-text-centered\">\n      <nav class=\"level\">\n        <div class=\"level-item has-text-centered\" >\n          <figure class=\"image is-128x128\" style=\"position:relative;\">\n            <img src=\"assets/{{ usuario.avatar || 'avatar-unknow' }}.svg\" alt=\"avatar\">\n            <a class=\"button is-primary is-inverted\" style=\"position: absolute; top: 0px; right:-2em;\"><span class=\"icon\"><i class=\"fa fa-edit\"></i></span></a>\n          </figure>\n          \n        </div>\n        \n      </nav>\n      <h1 class=\"title\">{{ usuario.nombre }} {{ usuario.apellidos }}</h1>\n      <h2 class=\"subtitle\"><span class=\"icon\"><i class=\"fa fa-user-circle\"></i></span> {{usuario.id}}</h2>\n      \n     \n      \n    </section>\n    <footer class=\"modal-card-foot\">\n      <a class=\"button  is-medium is-fullwidth \" (click)=\"bloquear()\"><span class=\"icon\"><i class=\"fa fa-lock\"></i></span><span>Bloquear aplicación</span></a>\n      <a class=\"button is-danger is-medium is-fullwidth is-outlined\"  (click)=\"logout()\"><span class=\"icon\"><i class=\"fa fa-sign-out\"></i></span><span>Cerrar sesión</span></a><br>\n      \n    </footer>\n  </div>\n</div>"

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_component__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bloquear_pantalla_service__ = __webpack_require__(190);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BloquearPantallaModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BloquearPantallaModule = (function () {
    function BloquearPantallaModule() {
    }
    BloquearPantallaModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_component__["a" /* BloquearPantallaComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__bloquear_pantalla_service__["a" /* BloquearPantallaService */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__bloquear_pantalla_component__["a" /* BloquearPantallaComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], BloquearPantallaModule);
    return BloquearPantallaModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/bloquear-pantalla.module.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hub_component__ = __webpack_require__(630);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HubModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HubModule = (function () {
    function HubModule() {
    }
    HubModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__hub_component__["a" /* HubComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__hub_component__["a" /* HubComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], HubModule);
    return HubModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/hub.module.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__perfil_component__ = __webpack_require__(637);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PerfilModule = (function () {
    function PerfilModule() {
    }
    PerfilModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__perfil_component__["a" /* PerfilComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__perfil_component__["a" /* PerfilComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], PerfilModule);
    return PerfilModule;
}());
//# sourceMappingURL=/var/www/html/Pruebas-Angular-2/XXAI/VersionMarzo2017/src/perfil.module.js.map

/***/ })

},[1129]);
//# sourceMappingURL=main.bundle.js.map