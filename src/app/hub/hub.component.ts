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
      title:'Almacén de insumos medicos', routerLink:'/almacen', icono:'assets/hub-farmacia.svg',
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
      title:'Almacén general', routerLink:'/almacen-articulos', icono:'assets/hub-almacen-articulos.svg',
      permisos: [
        '--z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', // Ver pedidos
        'cuSmlV9lvABXzfjtLbzEe0VbI47Dh6Cv', // Ver catálogos
      ]
    },
    {
      title: 'Laboratorio', routerLink: '/laboratorio', icono: 'assets/hub-laboratorio.svg',
      permisos: [
         'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk--', // Ver pedidos
      ]
    },
    {
      title: 'Equipamiento', routerLink: '/equipamiento', icono: 'assets/hub-equipamiento.svg',
      permisos: [
        // 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', // Ver pedidos
      ]
    },
    {
      title: 'Farmacia Subrrogada', routerLink: '/farmacia-subrrogada', icono: 'assets/hub-farmacia-sub.svg',
      permisos: [
        '--MrL06vIO12iNhchP14h57Puvg71eUmYb', // Ver FS proveedor pruebas
        'RZsvMjtPtpLWC8afsAFZsNnD9iXtiZC3', // Ver sincronizar recetas
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
      title: 'Administrador proveedores', routerLink: '/administrador-proveedores', icono:'assets/hub-administrador-proveedores.svg',
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
      title: 'Configuración', routerLink: '/configuracion', icono:'assets/hub-configuracion.svg',
      permisos: [
        // 'bsIbPL3qv6XevcAyrRm1GxJufDbzLOax', // Ver pedidos pruebas
        'zRTSAl0H8YNFMWcn00yeeJPigztCbSdC', // Ver mis almacenes
        '9dKCEyujSdLQF2CbpjXiWKeap0NlJCzw', // Ver mis turnos
        'Ki9kBghgqYsY17kqL620GWYl0bpeU6TB', // Ver mis servicios
        'BnB3LhrDbKNBrbQaeB2BPXKGrLEYrEw7' // Ver mis claves
      ] 
    },
    { 
      title:'Pacientes', routerLink:'/paciente', icono:'assets/avatar-enfermero.svg',
      permisos: [
        'PpXKhxdG8dGheNKm1rRSCT4EXZYyhRMm', // Ver admision
      ] 
    }
    ,
    { 
      title:'Avances', routerLink:'/temas', icono:'assets/hub-avance.svg',
      permisos: [
        'WbBYhMFZkGsAYeN13hY1hylZkNPJbHOE', // Ver Avances
      ] 
    }
  ]
  
  hubAutorizado = [ { title:'Dashboard', routerLink:'/dashboard', icono:'assets/hub-dashboard.svg' } ]

  constructor() { }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    var permisos =  usuario.permisos.split("|")

    if(permisos.length > 0){      
        
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
