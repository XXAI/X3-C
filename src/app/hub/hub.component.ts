import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  mostrar = false;

  // Se debe indicar los permisos para que el usuario tenga al menos uno para mostrar el item

  private itemsProtegidos = [
    {
      title: 'Almacén de insumos medicos', routerLink: '/almacen', icono: 'assets/hub-farmacia.svg',
      permisos: [
        'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', // Ver pedidos
        //'r6REUnVWlsQ00zVYXakLUxdKtGArcenY', // Ver pedidos jurisdiccionales
        'iSxK0TpoYpnzf8KIQTWOq9Web7WnSKhz', // Ver entregas
        'GPSDLmXckXcdfdj7lD4rdacwMivsTp9g', // Ver salidas recetas
        'qQvNeb1UFPOfVMKQnNkvxyqjCIUgFuEG', // Ver salidas de almacen
        'a1OMZVn7dveOf5aUK8V0VsvvSCxz8EMw' // Ver entradas de almacen

      ]
    },
    {
      title: 'Inventario', routerLink: '/inventario', icono: 'assets/icono-stock.svg',
      permisos: [
        'H5IV7Z6CAj8V2CRIQ2wnbXrYhvjLsSBk', // Existencia de insumos médicos
        'cE81erieaVjvmhcb9GCYI4doqYGtTcj1', // Ajuste menos
        '0oADIo1ltfAl4VMDVbyWgLR3rAhYGjlY', // Ajuste mas
        '7KbTARF2kpnO4Lfqv8hmYP8QGMcgJBwU', // Inicialización Inventario
        '--z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', // Ver pedidos
      ]
    },
    {
      title: 'Receta Electrónica', routerLink: '/receta-electronica', icono: 'assets/icono-recetas.svg',
      permisos: [
        'rEAgr2wrYx2AKLhIS7uLh7QIPJkmv4Jo', // Crear Recetas electronicas
        'qbmHSezvoY8IROFk3CJ7XBuLzp9rRoo6', // Ver Recetas Electronicas
        '7pFIrhuM3trSzo9nnIgeU7cMUArsukS8', // Dispensar Recetas Electronicas
      ]
    },

    {
      title: 'Almacén general', routerLink: '/almacen-articulos', icono: 'assets/hub-almacen-articulos.svg',
      permisos: [
        'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', // Permiso de prueba
        'cuSmlV9lvABXzfjtLbzEe0VbI47Dh6Cv', // Ver catálogos
/*
        'l9PXPHg1MMJYMKTlzXeEHNIsgw9d5oty', // Grupos de insumos
        'KbzwkJtDcLGcaNhbuYd24bhdDMGaKXod', // "Marcas"
        'JDAc3VaD3TbCIu0cUIYxZ6gG6QG32I3y', // "Material de curación"
        'xSSmZGx6xgw4Qd4MQKlcDwxE1iD4QvxZ', // "Medicamentos"
        'ygwsEwz3cUw4yVMCeaQ9hVMCFXUHri5q', // "Programas"
        'PtTJ9g7WGYcyuPjTxe5iaJILVzQedccG', // "Presentaciones de medicamentos"
        'EBQdToSqWCpu1TJTDWBibcuGOpO97ucT', // "Vias de administración"
        'ouIq0jdKpmTNYG1f2MRjMmlKvXmSviPd', // "Unidades de medida"
        'OhAoehuuORlLObNSrzy4qpRYE89VfUdt', // "Servicios"
        'Npmc6C155PMjnkPKWUFXcIF3NcegAzIE', // "Forma Farmaceutica"
        '2CGoJAwDzH2JGpaPVUz3Vakcge5ReO9F', // "Tipos de pedidos"
        'S1Yv83vAhv2o7xzq5ur37bmbfHvsomJf', // Tipos de movimientos
        'd1V2FX6TNxO6cCSXaAZQfLiAnDoL6rnO', // Tipos de insumos
        'JHUfLL82Cp1pUI7tTKaWuCfVIaeKZk5z', // Tipos de personal*/
      ]
    },
    {
      title: 'Laboratorio clínico', routerLink: '/laboratorio', icono: 'assets/hub-laboratorio.svg',
      permisos: [
         'PzmTtCd1MbMWVBPwVmttQQWdNfqwzp7p', // Entradas laboratorio
         '7GkcqRllVy4Z371KMLPsX0d04dqv3vBE', // Salidas laboratorio
      ]
    },
    {
      title: 'Equipamiento', routerLink: '/equipamiento', icono: 'assets/hub-equipamiento.svg',
      permisos: [
        // 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', // Ver pedidos
      ]
    },
    {
      title: 'Farmacia Subrogada', routerLink: '/farmacia-subrrogada', icono: 'assets/hub-farmacia-sub.svg',
      permisos: [
        '--z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', // Ver pedidos
        '6sTjs3q8rhHslelQgTUI4hdkNSbiwyhf', // Ver sincronizar recetas
      ]
    },
    {
      title: 'Administrador central', routerLink: '/administrador-central', icono: 'assets/hub-administrador-central.svg',
      permisos: [
        'bsIbPL3qv6XevcAyrRm1GxJufDbzLOax', // Ver pedidos
        'bwWWUufmEBRFpw9HbUJQUP8EFnagynQv', // Ver abasto
        's8kSv2Gj9DZwRvClVRmZohp92Rtvi26i', // Transferencia de recursos
        'fWA5oDswZ2Ra4O8YaCy6nEY8OeCOxg9C', // Entregas por mes
        'BBg7HSOEmjjOsVl48s8wSz8AxXhmBXA1' // Cumplimiento
      ]
    },
    {
      title: 'Administrador proveedores', routerLink: '/administrador-proveedores', icono: 'assets/hub-administrador-proveedores.svg',
      permisos: [
        'MrL06vIO12iNhchP14h57Puvg71eUmYb' // Ver pedidos
      ]
    },
    {
      title: 'Panel de control', routerLink: '/panel-control', icono: 'assets/hub-panel-control.svg',
      permisos: [
        'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', // Ver usuarios
        'ICmOKw3HxhgRna4a78OP0QmKrIX0bNsp', // Ver roles
        'DYwQAxJbpHWw07zT09scEogUeFKFdGSu' // Ver permisos
      ]
    },
    {
      title: 'Configuración de Unidad Médica', routerLink: '/configuracion', icono:'assets/hub-configuracion.svg',
      permisos: [
        // 'bsIbPL3qv6XevcAyrRm1GxJufDbzLOax', // Ver pedidos pruebas
        'zRTSAl0H8YNFMWcn00yeeJPigztCbSdC', // Ver mis almacenes
        '9dKCEyujSdLQF2CbpjXiWKeap0NlJCzw', // Ver mis turnos
        'Ki9kBghgqYsY17kqL620GWYl0bpeU6TB', // Ver mis servicios
        'BnB3LhrDbKNBrbQaeB2BPXKGrLEYrEw7' // Ver mis claves
      ]
    },
    {
      title: 'Pacientes', routerLink: '/paciente', icono: 'assets/avatar-enfermero.svg',
      permisos: [
        'PpXKhxdG8dGheNKm1rRSCT4EXZYyhRMm', // Ver admision
      ]
    }
    ,
    {
      title: 'Avances', routerLink: '/temas', icono: 'assets/hub-avance.svg',
      permisos: [
        'WbBYhMFZkGsAYeN13hY1hylZkNPJbHOE', // Ver Avances
      ]
    },
    {
      title: 'Catálogos y parámetros del sistema', routerLink: '/catalogos-parametros', icono: 'assets/hub-catalogos-params.svg',
      permisos: [
        'Npmc6C155PMjnkPKWUFXcIF3NcegAzIE', // "Forma Farmaceutica"
        'l9PXPHg1MMJYMKTlzXeEHNIsgw9d5oty', // Grupos de insumos
        'KbzwkJtDcLGcaNhbuYd24bhdDMGaKXod', // "Marcas"
        'JDAc3VaD3TbCIu0cUIYxZ6gG6QG32I3y', // "Material de curación"
        'xSSmZGx6xgw4Qd4MQKlcDwxE1iD4QvxZ', // "Medicamentos"
        'PtTJ9g7WGYcyuPjTxe5iaJILVzQedccG', // "Presentaciones de medicamentos"
        'ygwsEwz3cUw4yVMCeaQ9hVMCFXUHri5q', // "Programas"
        'OhAoehuuORlLObNSrzy4qpRYE89VfUdt', // "Servicios"
        '2CGoJAwDzH2JGpaPVUz3Vakcge5ReO9F', // "Tipos de pedidos"
        'JHUfLL82Cp1pUI7tTKaWuCfVIaeKZk5z', // Tipos de personal
        'd1V2FX6TNxO6cCSXaAZQfLiAnDoL6rnO', // Tipos de insumos
        'S1Yv83vAhv2o7xzq5ur37bmbfHvsomJf', // Tipos de movimientos
        'ouIq0jdKpmTNYG1f2MRjMmlKvXmSviPd', // "Unidades de medida"
        'EBQdToSqWCpu1TJTDWBibcuGOpO97ucT', // "Vias de administración"
        'GVnLtL6maGUSPmaiLlCgAT4FzlzHKkN0', // Almacenes
        'h9IhilMjvBtC7X64A0poFV26EL5xWAyM', // Proveedores
        'DbpT0VqR0DcNcqmCnwRbK7XvgWqDY2yc', // Servidores
        '56R2ES2GDbpovdiLAwFEjj75Rl975MsR', // Unidades médicas
      ]
    }
  ];
  hubAutorizado = [ { title: 'Dashboard', routerLink: '/dashboard', icono: 'assets/hub-dashboard.svg' } ]

  constructor() { }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    var permisos =  usuario.permisos.split('|')

    if(permisos.length > 0) {
      for(var i in this.itemsProtegidos){
        siguienteItemProtegido:     
        for(var j in this.itemsProtegidos[i].permisos){
          for(var k in permisos){
            if(permisos[k] == this.itemsProtegidos[i].permisos[j]){
              this.hubAutorizado.push(this.itemsProtegidos[i]);              
              break siguienteItemProtegido;
            }           
          }
        }
      }
      
    }
  }

  toggle() {
    this.mostrar = !this.mostrar;
  }

}
