import { Paginacion } from '../../paginacion/paginacion';

class PedidoFiltro {
    public lista:any[];
    public paginacion:Paginacion;
}
export class Pedido {
  public nombre:String;
  public observaciones:string;
  public lista:any[] = [];
  public paginacion:Paginacion = new Paginacion();
  public filtro: Pedido;
  public activo:boolean = false;
  constructor(conFiltro:boolean = false){
    if (conFiltro){
        this.filtro = new Pedido();
    }
    
  }
  public indexar = function(conLote: boolean = true ){
    if(conLote){
        var contador = 1;
        for(let i in this.lista){
            this.lista[i].lote = contador++;
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
        if(this.paginacion.lista.length == 0){
          this.listar(this.paginacion.paginaActual);
        }
        
        return;
      }
      
      contador++;
    }
    
  }
}