export class Medicamento {
    id: number;
    insumo_medico_clave: string;
    presentacion_id: number;
    presentacion_nombre: string;
    es_controlado: number;
    es_surfactante: number;
    descripcion: string;
    concentracion: string;
    cantidad_x_envase: number;
    unidad_medida_id: number;
    unidad_medida_nombre: string;
    indicaciones: string;
    via_administracion_id: number;
    via_administracion_nombre: string;
    dosis: string;
}

export class InsumoMedico {
    clave: string;
    tipo: string;
    generico_id: number;
    generico_nombre: string;
    es_cuadro_basico: number;
    grupo_insumo_nombre: string;
    es_causes: number;
    descripcion: string;
    medicamento?: {};
    cantidad: number;
    cargando:boolean = false;
}

export interface InsumoMedico {
    clave: string;
    tipo: string;
    generico_id: number;
    generico_nombre: string;
    es_cuadro_basico: number;
    grupo_insumo_nombre: string;
    es_causes: number;
    descripcion: string;
    medicamento?: {};
    cantidad: number;
}