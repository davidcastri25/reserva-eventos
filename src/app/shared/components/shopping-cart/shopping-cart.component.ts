import { Component, OnInit } from '@angular/core';

import { Cart } from 'src/app/events/interfaces/interfaces';
import { CartService } from 'src/app/events/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartArray!: Cart[]; //Recibirá el array desde el cartService

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$
      .subscribe(cartArrayReturned => {
        this.cartArray = cartArrayReturned;
        console.log('shoppingCart', this.cartArray);
      });
  }
}
