import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Cart } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  arrayCart: Cart[]= [];

  private cart = new BehaviorSubject<Cart[]>([]);
  public cart$ = this.cart.asObservable();

  constructor() { }

  //Hacer update del array
  updateCart(cartReceived: Cart, action: string) {
    let indexEvent: number = 0; //Index donde se ubica el evento
    let indexSession: number = 0; //Index donde se ubica una sesión dentro de un evento

    console.log('desde servicio', cartReceived, action);

    if (action === 'increment') {
      //Compruebo si ya hay en el array un Cart con el id
      indexEvent = this.cartAlreadyAdded(cartReceived.eventId);

      //Si no encontramos el evento, hacemos push
      if (indexEvent === -1) {

        //Incremento sesión
        cartReceived.sessions[0].totalAmount!++;

        //Push de nuevo evento
        this.arrayCart.push(cartReceived);

      } else {

        //Compruebo si en las sesiones del evento con el index devuelto ya existe una igual
        indexSession = this.sessionAlreadyAdded(cartReceived.sessions[0].date, indexEvent);
        console.log('sesión igual',indexSession);
        console.log('cartReceived cuando ya hay un evento', cartReceived)

        //Si no hemos encontrado la sesión, hacemos push
        if (indexSession === -1) {
          
          //Incremento sesión
          cartReceived.sessions[0].totalAmount!++;

          //Push de la sesión
          this.arrayCart[indexEvent].sessions.push(cartReceived.sessions[0]);
        } else {

          //Aumentar la sesión encontrada
          this.arrayCart[indexEvent].sessions[indexSession].totalAmount!++;

        }
        /*
        //Incremento sesión
        cartReceived.sessions[0].totalAmount!++;

        //Push de nuevo evento
        this.arrayCart.push(cartReceived);  */
      }     

      
    } else {
      cartReceived.sessions[0].totalAmount!--;
    }
    
    
    this.cart.next(this.arrayCart);
    console.log('desde servicio array', this.arrayCart)
  }


  //Compruebo si ya hay en el array un Cart con el id
  cartAlreadyAdded(id: string): number {
    let indexToReturn: number = -1;

    //Si encuentra el evento por el id, nos devolverá el index, si no -1
    this.arrayCart.forEach((element, index) => {
      if (element.eventId === id) {
        indexToReturn = index;
      }
    });

    return indexToReturn;
  }

  //Compruebo si en las sesiones del evento con el index devuelto ya existe una igual
  sessionAlreadyAdded(date: string, indexEvent: number) {
    let indexToReturn: number = -1;

    //Si encuentra la sesión por la date, nos devolverá el index, si no -1
    this.arrayCart[indexEvent].sessions.forEach((element, index) => {
      if (element.date == date) {
        indexToReturn = index;
      } 
    });

    return indexToReturn;
  }

}
