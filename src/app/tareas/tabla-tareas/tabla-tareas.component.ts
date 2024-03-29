import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Tareas } from 'src/app/interfaces/listaTareas.interface';
import { TareasService } from 'src/app/services/tareas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabla-tareas',
  templateUrl: './tabla-tareas.component.html',
  styleUrls: ['./tabla-tareas.component.css'],
})
export class TablaTareasComponent implements OnInit {
  @Input() tareas: Tareas[] = [];
  @Input() descripcionBuscada: string = '';
  @Output() tareaEliminada: EventEmitter<Tareas> = new EventEmitter<Tareas>();
  tareaSeleccionada: Tareas | null = null;
  tareaSeleccionadaIndex: number | null = null;
  edicionExitosa: boolean = false;
  errorEdicion: string | null = null;
  constructor(
    private tareasService: TareasService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  eliminarTarea(tarea: Tareas) {
    this.tareasService.eliminarTarea(tarea).then(() => {
      this.tareaEliminada.emit(tarea);
    });
  }
  cambiarestadotarea(posicion: number) {
    this.tareas[posicion].realizada = !this.tareas[posicion].realizada;
    this.actualizarTarea(this.tareas[posicion]);
  }
  cambiarestadotareaProgreso(posicion: number) {
    this.tareas[posicion].en_progreso = !this.tareas[posicion].en_progreso;
    this.actualizarTarea(this.tareas[posicion]);
  }
  editarTarea(tarea: Tareas) {
    this.tareaSeleccionada = { ...tarea };
  }
  /*Esta funcion actualiza la tarea seleccionada con los datos que se ingresan en el formulario */
  actualizarTarea(tarea: Tareas) {
    this.tareasService
      .actualizarTarea(tarea)
      .then(() => {
        this.tareaSeleccionada = null;
        this.edicionExitosa = true;
      })
      .catch((error) => {
        console.error(error);
        this.errorEdicion =
          'Se ha producido un error al actualizar la tarea  intentelo mas tarde';
      });
  }
}
