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

  increment(session: Session) {
    //Añado el id del evento a la sesión clickada
    session.eventId = this.eventId;

    console.log(session);
  }

}
