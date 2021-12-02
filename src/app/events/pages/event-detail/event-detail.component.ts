import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DataService } from '../../services/data.service';
import { EventDetail, Session } from '../../interfaces/interfaces';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  /* PROPERTIES */
  eventToShow!: EventDetail;
  sessionsToShow!: Session[];
  id!: string;
  displayError: boolean = false; //Controlo si aparece el error block

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Reinicio propiedad displayError
    this.displayError = false;
    //Obtengo el id
    this.getId();
    //Obtengo el array de sesiones correspondiente
    this.getSessions(this.id);
  }

  /* Methods */
  //Obtiene la id
  getId() {
    this.activatedRoute.params
      .subscribe( params => this.id = params['id'] )
  }

  //Obtiene el array de sesiones desde el servicio
  getSessions(id: string) {
    this.dataService.getEventInfo(id).pipe(
        //Compruebo si hay error
        catchError(err => {
          this.displayError = true; //Cambio propiedad a true para hacer el display del error block
          return of() as Observable<EventDetail>
        }),
        //Order by end date, ASC
        map( (event => {
          //Asigno el evento que me devuelve
          this.eventToShow = event;
          //Devuelvo las sesiones
          return event.sessions.sort( (a, b) => parseInt(a.date) - parseInt(b.date) )
        } ) )
      )
      .subscribe( sessions => this.sessionsToShow = sessions);
  }

}
