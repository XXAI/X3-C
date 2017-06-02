export class Entrada {
                  id: any;
				  almacen_id: string;
				  tipo_movimiento_id: number;
				  fecha_movimiento: Date;
                  status: string;
				  observaciones: string;
				  cancelado: number;
				  observaciones_cancelacion: string;
                  usuario_id: string;
                  insumos: Insumo[];
                  almacen: any[];
}

export class Insumo {
			         id: string;
                     movimiento_id:string;
                     stock_id:string;
			         cantidad: number;
                     clave: string;
                     descripcion: string;
                     informacion: any[];
                     tipo: string;
                     es_causes: boolean;
			         cantidad_x_envase: number;
                     lotes: Lote[];
                     stock: {
                        id: string;
                        almacen_id: string;
                        clave_insumo_medico: string;
                        marca_id: string;
                        lote: string;
                        fecha_caducidad: Date;
                        codigo_barras: string;
                        existencia: number
                        existencia_unidosis: number;
                        usuario_id: string;
                        created_at: Date;
                        updated_at: Date;
                        deleted_at: Date;
                     };
			         //lote_entrada: string;
			         fecha_caducidad: Date;
			         codigo_barras: string;
                     filtro: any[];
                     paginacion: any[];
                    }
export class Lote {
    id: string;
    cantidad: number;
}

export class Stock {
    id: string;
    almacen_id: string;
    clave_insumo_medico: string;
    marca_id: string;
    lote: string;
    fecha_caducidad: Date;
    codigo_barras: string;
    existencia: number
    existencia_unidosis: number;
    usuario_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
