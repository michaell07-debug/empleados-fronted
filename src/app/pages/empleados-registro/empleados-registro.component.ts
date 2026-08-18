import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados/empleados_service';
import { EmpleadoNuevoModelo } from '../../models/empleados/empleados-nuevo.model';

@Component({
  selector: 'app-empleados-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empleados-registro.component.html'
})
export class EmpleadosRegistroComponent implements OnInit {

  private formulario = inject(FormBuilder);
  private router = inject(Router);
  private empleadosService = inject(EmpleadosService);
  private route = inject(ActivatedRoute);

  public id: string | null = null;
  public titulo: string = 'REGISTRO DE EMPLEADOS';

  empleadoFormulario = this.formulario.group({
    nombre : ['', Validators.required],
    apellido : ['', Validators.required],
    profesion : ['', Validators.required],
    salario : [0, [Validators.required, Validators.min(1)]]
  });
  
  ngOnInit(): void {
    // 1. Obtenemos el parámetro 'id' de la URL si existe
    this.id = this.route.snapshot.paramMap.get('id');
    
    // 2. Si viene un ID, cambiamos el título y cargamos los datos del backend
    if (this.id) {
      this.titulo = 'EDITAR EMPLEADO';
      this.obtenerEmpleado(this.id);
    }
  }
    
  obtenerEmpleado(id: string): void {
    this.empleadosService.getEmpleadoById(id).subscribe({
      next: (response: any) => {
        // Asignamos la respuesta del backend al formulario
        const datos = response.data || response.datos || response;
        
        this.empleadoFormulario.patchValue({
          nombre: datos.nombre,
          apellido: datos.apellido,
          profesion: datos.profesion,
          salario: datos.salario
        });
      },
      error: (error) => {
        console.error('Error al obtener el empleado:', error);
      }
    });
  }

  public guardar(): void {
    if (this.empleadoFormulario.invalid) {
      this.empleadoFormulario.markAllAsTouched();
      return;
    } 

    const payload = this.empleadoFormulario.getRawValue() as EmpleadoNuevoModelo;

    if (this.id) {
      // MODO EDICIÓN: PUT
      this.empleadosService.updateEmpleado(this.id, payload).subscribe({
        next: (response: any) => {
          alert(response.message || 'Empleado actualizado correctamente');
          this.router.navigate(['empleados']);
        },
        error: (error) => {
          console.error(error);
        }      
      });
    } else {
      // MODO REGISTRO: POST
      this.empleadosService.createEmpleado(payload).subscribe({
        next: (response: any) => {
          alert(response.message || 'Empleado creado correctamente');
          this.router.navigate(['empleados']);
        },
        error: (error) => {
          console.error(error);
        }      
      });
    }
  }
}