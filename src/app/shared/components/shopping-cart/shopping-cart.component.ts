import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Cart, Session } from 'src/app/events/interfaces/interfaces';
import { CartService } from 'src/app/events/services/cart.service';
import { DataService } from 'src/app/events/services/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartArray!: Cart[]; //Recibirá el array desde el cartService

  constructor(
    private cartService: CartService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$
      .subscribe(cartArrayReturned => {
        this.cartArray = cartArrayReturned;
        // console.log('shoppingCart', this.cartArray);
      });
  }

  //Decrementa totalAmount en 1
  decrement(session: Session, eventId: string) {
    //Añado el id del evento a la sesión clickada
    session.eventId = eventId;

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
