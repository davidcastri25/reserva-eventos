import { Component, Input, OnInit } from '@angular/core';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

import { Cart, Session } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';

import { DataService } from '../../services/data.service';

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

  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    
  }


  //Incrementa totalAmount en 1
  increment(session: Session) {

    //Añado el id del evento a la sesión clickada
    session.eventId = this.eventId;    

    //Compruebo que no se salga de los límites (availability)
    if (session.totalAmount! < parseInt(session.availability)) {
      //Genero objeto Cart y comunico con el servicio
      this.generateCartObject(session, 'increment');      
    }

    // console.log();    
  }

  //Decrementa totalAmount en 1
  decrement(session: Session) {
    //Añado el id del evento a la sesión clickada
    session.eventId = this.eventId;

    //Compruebo que no se salga de los límites (0)
    if (session.totalAmount! > 0) {
      //Genero objeto Cart
      this.generateCartObject(session, 'decrement');
    }

    // console.log();
  }

  //Genera objeto cart para suscribir al behavior subject
  generateCartObject(session: Session, action: string) {
    let cartObject: Cart;
    let titleReturned: string = '';

    //Obtengo title del evento al que pertenece la session
    this.dataService.getEventInfo(session.eventId!).pipe(
      map( eventReturned => {
        titleReturned = eventReturned.event.title;

        //Genero el objeto Cart
        cartObject = {
          eventId: session.eventId!,
          title: titleReturned,
          sessions: [session]
        }

        return cartObject
      })
    ).subscribe( cartReturned => {   
        //Llamo cart service
        this.cartService.updateCart(cartReturned, action);
      }); 
  }
}
