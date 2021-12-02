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
    console.log('desde servicio', cartReceived, action);

    if (action === 'increment') {
      cartReceived.sessions[0].totalAmount!++;
    }
    else {
      cartReceived.sessions[0].totalAmount!--;
    }
    
    this.arrayCart.push(cartReceived)
    this.cart.next(this.arrayCart);
    console.log('desde servicio array', this.arrayCart)
  }
}
