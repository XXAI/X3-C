export class Movimiento {
                  id: any;
				  almacen_id: string;
				  tipo_movimiento_id: number;
				  fecha_movimiento: Date;
				  observaciones: string;
				  cancelado: number;
				  observaciones_cancelacion: string;
                  insumos: Insumo[];
}

export class Insumo {
			         clave: string;
                     descripcion: string;
                     informacion: any[];
                     tipo: string;
                     es_causes: boolean;
			         cantidad: number;
			         cantidad_x_envase: number;
			         lote: number;
			         fecha_caducidad: Date;
			         codigo_barras: string;
                     filtro: any[];
                     paginacion: any[];
                    }
export class Informacion {
                    id: string;
                    insumo_medico_clave: string;
                    presentacion_id: string;
                    es_controlado: string;
                    es_surfactante: string;
                    concentracion: string;
                    contenido: string;
                    cantidad_x_envase: string;
                    unidad_medida_id: string;
                    indicaciones: string;
                    via_administracion_id:string;
                    dosis: string;
                    presentacion_nombre: string;
                    unidad_medida_nombre: string;
                    unidad_medida_clave: string;
                    via_administracion_nombre:string;
                    }


export interface Mov {
    id: string;
    servidor_id: string;
    almacenes_id: string;
    folio: string;
    tipo_movimiento_id: number;
    almacen_origen:string;
    almacen_destino:string;
    programas_id: string;
    folio_pedido: string;
    factura: string;
    proveedores_id: string;
    fecha_factura: Date;
    referencia: string;
    fecha_referencia: Date;
    fecha_movimiento: Date;
    observaciones: string;
    cancelado: number;
    observaciones_cancelacion: string;
}
