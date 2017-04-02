import { Paginacion } from '../../paginacion/paginacion';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

class PedidoFiltro {
    public lista:any[];
    public paginacion:Paginacion;
}
export class Pedido {
  public id:String;
  public datos: FormGroup; //Harima: Agregamos los datos para el formulario y la validación
  //public nombre:String;
  //public observaciones:string;
  public lista:any[] = [];
  public totalInsumos:number = 0;
  public paginacion:Paginacion = new Paginacion();
  public filtro: Pedido;
  //Harima: Para tener acceso al objeto que contiene la lista principal sin filtro
  private padre: Pedido;
  public activo:boolean = false;
  public cargando:boolean = false;
  private fb:FormBuilder;

  

  constructor(conFiltro:boolean = false){
    if (conFiltro){
        this.filtro = new Pedido();
        //Harima: se asigna el pedido actual como padre del filtro
        this.filtro.padre = this;
        //Harima: se crea el formulario para las validaciones
        this.fb  = new FormBuilder();
        this.datos = this.fb.group({
          descripcion: ['', [Validators.required]],
          almacen_proveedor: ['',[Validators.required]],
          observaciones: ''
        });
    }
  }

  public tieneError = function(atributo:string, error:string){
    return (this.datos.get(atributo).hasError(error) && this.datos.get(atributo).touched);
  }

  //Harima: es necesario para evitar un error al enviar los datos al servidor
  public obtenerDatosGuardar = function(){
    var datos = {
      datos: this.datos.value,
      insumos: this.lista
    };
    return datos;
  }

  public indexar = function(conLote: boolean = true ){
    if(conLote){
      this.totalInsumos = 0;
      var contador = 1;
      for(let i in this.lista){
          this.lista[i].lote = contador++;
          this.totalInsumos += +this.lista[i].cantidad;
      }
    }
    
    this.paginacion.totalPaginas = Math.ceil(this.lista.length / this.paginacion.resultadosPorPagina);

    this.paginacion.indice = [];
    for(let i=0; i< this.paginacion.totalPaginas; i++){
      this.paginacion.indice.push(i+1);
    }
  }

  public listar = function(pagina: number = 1){
    this.paginacion.paginaActual = pagina; 
    let inicio = (this.paginacion.paginaActual - 1) * this.paginacion.resultadosPorPagina;
    let fin = inicio + this.paginacion.resultadosPorPagina;
    try {
      this.paginacion.lista = this.lista.slice(inicio,fin);
    } catch(e){
      this.paginacion.lista = [];
    }    
  }
  public paginaSiguiente():void {
    if (this.paginacion.paginaActual == this.paginacion.totalPaginas){
        return;
    }
    this.listar(this.paginacion.paginaActual+1);
  }
  public paginaAnterior():void {
    if (this.paginacion.paginaActual == 1){
        return;
    }
    this.listar(this.paginacion.paginaActual-1);
  }
  
  public  eliminarItem = function (item:any, index:number){
    var contador: number = 0;
    for(let i in this.lista){
      if(this.lista[i] === item){
        this.paginacion.lista.splice(index, 1);  
        this.lista.splice(contador, 1);  
        this.indexar();
        
        //Harima: con esto calculamos el siguiente indice, de la lista total de elementos, a agregar al final de la página
        let proximoIndice = (contador + (this.paginacion.resultadosPorPagina - index)) - 1;
        //Harima:  si ese indice existe, lo agregamos al final de la pagina
        if(this.lista[proximoIndice]){
          this.paginacion.lista.push(this.lista[proximoIndice]);
        }

        //Harima: Si la pagina quedo vacía, listamos la pagina anterior, en caso de que la página actual sea mayor a 1
        if(this.paginacion.lista.length == 0){
          if(this.paginacion.paginaActual > 1){
            this.listar(this.paginacion.paginaActual-1);
          }else{
            this.listar(1);
          }
        }

        //Harima: si el objeto padre esta inicializado, significa que se esta eliminando desde una busqueda, por tanto hay que eliminar también en el objeto padre
        if(this.padre){
          //Harima: se obtiene el indice y la pagina del item eliminado
          var indice = this.padre.lista.indexOf(item);
          var pagina = Math.ceil(indice/this.padre.paginacion.resultadosPorPagina);
          //Harima: se calcula el indice que tiene el item en la pagina en la que se encuentra
          var ajusteIndices = (pagina-1) * this.padre.paginacion.resultadosPorPagina;
          var indiceEnPagina = indice - ajusteIndices;

          //Harima: eliminamos el elemento del padre, de ser necesario cambiamos de pagina
          if(this.padre.paginacion.paginaActual == pagina){
            this.padre.eliminarItem(item,indiceEnPagina);
          }else{
            var respaldoPagina = this.padre.paginacion.paginaActual;
            this.padre.listar(pagina);
            this.padre.eliminarItem(item,indiceEnPagina);
            this.padre.listar(respaldoPagina);

            //Harima: tenemos que checar si en la pagina actual del padre aun hay elementos, de lo contrario listamos la pagina anterior, cuando sea posible
            if(this.padre.paginacion.lista.length == 0){
              if(this.padre.paginacion.paginaActual > 1){
                this.padre.listar(this.padre.paginacion.paginaActual-1);
              }else{
                this.padre.listar(1);
              }
            }
          }
        }
        return;
      }
      contador++;
    }
  }
}