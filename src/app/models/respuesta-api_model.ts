export interface RespuestaApi <T>{
    message(message: any): unknown;
    codigo: number;
    mensaje: String;
    data: T;
}