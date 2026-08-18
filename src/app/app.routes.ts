import { Routes } from '@angular/router';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { EmpleadosRegistroComponent } from './pages/empleados-registro/empleados-registro.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'empleados',
        pathMatch: 'full',
    },
    {
        path: 'empleados',
        component:EmpleadosComponent,
    },
    {
        path: 'empleados/registro',
        component:EmpleadosRegistroComponent,
    },

    //aqui aumento lo de actualizar
    {
        path: 'empleados/editar/:id',
        component: EmpleadosRegistroComponent,
    },
    //hasta aqui
    {
        path: '**',
        redirectTo: 'empleados',
    }
];
