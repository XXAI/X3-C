import { Rol }       from '../roles/rol';

export class Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    password: string;
    servidor_id: string;
    avatar:string;
    roles: string[];
    su: boolean;
    cargando:boolean = false;
}

export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    password: string;
    confirmarPassword: string;
    avatar:string;
    roles: string[];
}
