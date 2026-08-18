import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmpleadosService } from '../../services/empleados/empleados_service';
import { EmpleadosModelLista } from '../../models/empleados/empleados-lista_model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empleados.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadosComponent {
  private empleadosService = inject(EmpleadosService);
  private router = inject(Router);
  public empleados = signal<EmpleadosModelLista[]>([]);

  public constructor() {
    this.obtenerEmpleado();
  }

  public obtenerEmpleado(): void {
    this.empleadosService.getEmpleados().subscribe({
      next: (response) => {
        console.log('Se obtuvieron correctamente los empleados', response.data);
        this.empleados.set(response.data);
      },
      error: (error) => {
        console.error('Error al obtener los empleados: ', error);
      }
    });
  }

  public editarEmpleado(id: string | undefined): void {
    if (!id) {
      console.warn('El empleado no tiene un _id definido');
      return;
    }
    this.router.navigate(['/empleados/editar', id]);
  }

  public eliminarEmpleado(id: string | undefined): void {
    if (!id) {
      console.warn('No se puede eliminar: el empleado no tiene un _id válido');
      return;
    }

    const confirmar = confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (confirmar) {
      this.empleadosService.deleteEmpleado(id).subscribe({
        next: (response: any) => {
          alert(response.message || 'Empleado eliminado correctamente');
          this.obtenerEmpleado(); 
        },
        error: (error) => {
          console.error('Error al eliminar empleado: ', error);
        }
      });
    }
  }
}