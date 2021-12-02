import { Component, Input, OnInit } from '@angular/core';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Session } from '../../interfaces/interfaces';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {

  /* Icons */
  faPlus = faPlus;
  faMinus = faMinus;

  /* Properties */
  @Input() sessionsToShow!: Session[];
  @Input() eventId!: string; //Recibe del padre el ID

  constructor() { }

  ngOnInit(): void {
    
  }


  //Incrementa totalAmount en 1
  increment(session: Session) {
    //Añado el id del evento a la sesión clickada
    session.eventId = this.eventId;    

    //Compruebo que no se salga de los límites (availability)
    if (session.totalAmount! < parseInt(session.availability)) {
      session.totalAmount!++;
    }

    console.log(session);    
  }

  //Decrementa totalAmount en 1
  decrement(session: Session) {
    //Añado el id del evento a la sesión clickada
    session.eventId = this.eventId;

    //Compruebo que no se salga de los límites (0)
    if (session.totalAmount! > 0) {
      session.totalAmount!--;
    }

    console.log(session);
  }


}
