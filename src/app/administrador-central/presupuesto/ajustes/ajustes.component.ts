import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { PresupuestoService } from "../presupuesto.service";
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css'],
  providers:[PresupuestoService]
})
export class AjustesComponent implements OnInit {
  errores:any = {};

  ajuste:any = {
    tipo: 'I',
    causes: null,
    causes_sumado: 0,
    no_causes:null,
    no_causes_sumado: 0,
    unidades_medicas:[]

  };

  presupuesto:any = { }
  cluesAgregadas:any[] = [];

  id:Number;
  guardando:boolean = false;
  cargando:boolean = false;
  cargandoSaldosUnidadesMedicas:boolean = false;
  mostrarModalUnidadesMedicas:boolean = false;

    // # SECCION: Esta sección es para mostrar mensajes
    mensajeError: Mensaje = new Mensaje();
    mensajeExito: Mensaje = new Mensaje();
    ultimaPeticion: any;
    // # FIN SECCION
  
  constructor(private title: Title,
    private router: Router,
    private route: ActivatedRoute,private apiService: PresupuestoService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.cargarPresupuesto();
      } else {
        this.router.navigate(['/administrador-central/presupuesto/']);
      }
    });
    this.title.setTitle('Ajuste de presupuesto');    
  }

  guardar(){
    this.guardando = true;

    //if(this.errores.presupuesto_unidades_medicas !=  null){
      for(var i in this.ajuste.unidades_medicas){
        
        if(this.ajuste.unidades_medicas[i].error_validacion != null){
          this.ajuste.unidades_medicas[i].error_validacion = null;
        }
      } 
   // }

    this.errores = {};

    this.apiService.ajuste(this.id, this.ajuste).subscribe(
      respuesta => {
        this.guardando = false;
        console.log(respuesta);
        this.router.navigate(['/administrador-central/presupuesto/']);
      }, error => {
        this.guardando = false;
        try {
          let e = error.json();
          this.mensajeError = new Mensaje(true)
          switch (error.status) {
            case 401:
              this.mensajeError.texto = "No tiee permiso para realizar esta acción.";
              break;
            case 409:
              this.mensajeError.texto = "Verifique la información marcada de color rojo";
              for (var input in e.error) {
                // Iteramos todos los errores
                for (var i in e.error[input]) {
                  var object = input.split(".");
                
                  if(object.length > 1){
                    if(object[0] == "unidades_medicas"){
                      if(this.errores[object[0]] == null){
                        this.errores[object[0]] = [];
                      }

                      var index = parseInt(object[1]);

                      if(object[2] == 'causes'){
                        this.ajuste.unidades_medicas[index].error_validacion = {};
                        this.ajuste.unidades_medicas[index].error_validacion.causes = e.error[input][i];
                      }

                      if(object[2] == 'no_causes'){
                        if(this.ajuste.unidades_medicas[index].error_validacion == null){
                          this.ajuste.unidades_medicas[index].error_validacion = {};
                        }
                        this.ajuste.unidades_medicas[index].error_validacion.no_causes = e.error[input][i];
                      }
                      
                      //this.errores[object[0]][object[1]][object[2]] = e.error[input][i];
                    } else {
                      if(this.errores[object[0]] == null){
                        this.errores[object[0]] = {};
                      }                     
  
                      this.errores[object[0]][object[1]] = e.error[input][i];
                    }
                    
                   
                  } else {
                    this.errores[input] = e.error[input][i];
                  }
                }
              }
              break;
            case 500:
              this.mensajeError.texto = "500 (Error interno del servidor)";
              break;
            default:
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }
        } catch (e) {
          this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
        }
        this.mensajeError.mostrar = true;
        console.log(error);
      }
    )
  }

  cargarPresupuesto(){
    this.cargando = true;
    this.apiService.ver(this.id).subscribe(
      respuesta => {
        this.cargando = false;
        this.presupuesto.causes = respuesta.causes;
        this.presupuesto.no_causes = respuesta.no_causes;
        this.presupuesto.causes_disponible = respuesta.causes_disponible;
        this.presupuesto.no_causes_disponible = respuesta.no_causes_disponible;
      }, error => {
        this.cargando = false;
      }
    );
  }

  cargarSaldosUnidadesMedicas(items:any[]){
    this.cargandoSaldosUnidadesMedicas = true;
    this.apiService.cargarSaldosUnidadesMedicas(this.id, {clues: items}).subscribe(
      respuesta =>{
        this.cargandoSaldosUnidadesMedicas = false;

        for(var j in respuesta){
          var bandera = false;
          for(var i in this.ajuste.unidades_medicas){
            if(this.ajuste.unidades_medicas[i].clues == respuesta[j].clues){
              bandera = true;
              this.ajuste.unidades_medicas[i].presupuesto_id = respuesta[j].presupuesto_id;
              this.ajuste.unidades_medicas[i].causes_modificado = respuesta[j].causes_modificado;
              this.ajuste.unidades_medicas[i].causes_disponible = respuesta[j].causes_disponible;
              this.ajuste.unidades_medicas[i].no_causes_modificado = respuesta[j].no_causes_modificado;
              this.ajuste.unidades_medicas[i].no_causes_disponible = respuesta[j].no_causes_disponible;
              break;
            }            
          }
        }
        
      }, error => {
        this.cargandoSaldosUnidadesMedicas = false;
      }
    )
  }

  agregarUnidadMedica(items:any[]){
    this.mostrarModalUnidadesMedicas = false;
    var cluesSaldos = [];
    for(var i in items){
      var object = {
        presupuesto_id: null,
        clues: items[i].clues,
        unidad_medica: items[i],
        causes_modificado: 0,
        causes_disponible:0,
        causes: 0,
        no_causes_modificado: 0,
        no_causes_disponible:0,
        no_causes: 0       
      }

      cluesSaldos.push(object.clues);

      this.cluesAgregadas.push(object.clues);
      this.ajuste.unidades_medicas.push(object);
    }
    this.cargarSaldosUnidadesMedicas(cluesSaldos);
  }

  eliminarUnidadMedica(item:any, index){
    
    for(var i = 0; i < this.cluesAgregadas.length; i++){
      if(item.clues == this.cluesAgregadas[i]){
        this.cluesAgregadas.splice(i,1);
        break;
      }
    }
    this.ajuste.unidades_medicas.splice(index, 1);  
    this.calcularTotales();
  }

  calcularTotales(item:any = null){
    if(item){
      if(item.causes < 0){
        item.causes = 0;
      }
      if(item.no_causes < 0){
        item.no_causes = 0;
      }
      if(this.ajuste.tipo == "D"){
        this.validarDecrementoPresupuestoUnidad(item);
      } 
    }

    this.ajuste.causes_sumado = 0;
    this.ajuste.no_causes_sumado = 0;

    for(var i in this.ajuste.unidades_medicas){
      if(!this.ajuste.unidades_medicas[i].error_validacion  || (this.ajuste.unidades_medicas[i].error_validacion && !this.ajuste.unidades_medicas[i].error_validacion.causes )){
        this.ajuste.causes_sumado += this.ajuste.unidades_medicas[i].causes;
      }
      
      if(!this.ajuste.unidades_medicas[i].error_validacion  || (this.ajuste.unidades_medicas[i].error_validacion && !this.ajuste.unidades_medicas[i].error_validacion.no_causes )){
        this.ajuste.no_causes_sumado += this.ajuste.unidades_medicas[i].no_causes;
      }
    }
  }

  cambioTipo(tipo:any){
    this.ajuste.tipo = tipo;

    for(var i in this.ajuste.unidades_medicas){
      if(this.ajuste.tipo == "D"){
        this.validarDecrementoPresupuestoUnidad(this.ajuste.unidades_medicas[i] );
      } else {
        if(this.ajuste.unidades_medicas[i].error_validacion){
          this.ajuste.unidades_medicas[i].error_validacion.causes = null;
          this.ajuste.unidades_medicas[i].error_validacion.no_causes = null;
        }        
      }


    }
    this.calcularTotales();
  }

  validarDecrementoPresupuestoUnidad(item: any){
    var  resultado_causes = item.causes_disponible -  item.causes;
    if(resultado_causes < 0){
      if(!item.error_validacion){
        item.error_validacion = {};
      }
      item.error_validacion.causes = 'exceed';
    } else if(item.error_validacion){
        item.error_validacion.causes = null;          
    }

    var  resultado_no_causes = item.no_causes_disponible -  item.no_causes;
    if(resultado_no_causes < 0){
      if(!item.error_validacion){
        item.error_validacion = {};
      }
      item.error_validacion.no_causes = 'exceed';
    } else if(item.error_validacion){
        item.error_validacion.no_causes = null;          
    }
  }

}
