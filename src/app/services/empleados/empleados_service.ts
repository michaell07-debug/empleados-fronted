import { HttpClient } from "@angular/common/http";
import {inject, Injectable} from"@angular/core";
import { Observable } from "rxjs";
import { RespuestaApi } from "../../models/respuesta-api_model";
import { EmpleadosModelLista } from "../../models/empleados/empleados-lista_model";
import { EmpleadoNuevoModelo } from "../../models/empleados/empleados-nuevo.model";


@Injectable({
    providedIn: 'root'
})

export class EmpleadosService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:4000/api/empleados';

    public getEmpleados():Observable<RespuestaApi<EmpleadosModelLista[]>>{
        return this.http.
        get<RespuestaApi<EmpleadosModelLista[]>>(this.apiUrl);

    }

    public getEmpleadoById(id: String)
        :Observable<RespuestaApi<EmpleadosModelLista>>{
        return this.http.
        get<RespuestaApi<EmpleadosModelLista>>
        (`${this.apiUrl}/${id}`);
    }

    public createEmpleado(empleado: EmpleadoNuevoModelo){
        return this.http.post<RespuestaApi<EmpleadoNuevoModelo>>
        (this.apiUrl, empleado);
    }

    public deleteEmpleado(id: string): Observable<RespuestaApi<any>> {
        return this.http.delete<RespuestaApi<any>>(
        `${this.apiUrl}/${id}`
        );
    }

    public updateEmpleado(id: string, empleado: EmpleadoNuevoModelo): Observable<RespuestaApi<EmpleadoNuevoModelo>> {
        return this.http.put<RespuestaApi<EmpleadoNuevoModelo>>(
            `${this.apiUrl}/${id}`,
            empleado
        );
    }
}